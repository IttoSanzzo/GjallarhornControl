import { TrackCategory } from "@/lib/TrackData";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import React, { Dispatch, ReactNode, SetStateAction } from "react";
import {
	PlaylistPlataformType,
	SavedPlaylist,
} from "@/lib/types/UserSavedPlaylist";

import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
	arrayMove,
	rectSortingStrategy,
	SortableContext,
} from "@dnd-kit/sortable";
import { CategoryDisplay } from "./subComponents/CategoryDisplay";
import { userSavedPlaylistsCache } from "@/lib/cache/userSavedPlaylistsCache";

const CategoriesGridContainer = newStyledElement.div(
	styles.categoriesGridContainer,
);

function CoreContext({
	isEditable,
	discordUserId,
	activeSavedPlaylistState,
	setTrackCategories,
	categoriesData,
	children,
}: {
	isEditable: boolean;
	discordUserId: string;
	setTrackCategories: Dispatch<SetStateAction<TrackCategory[]>>;
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	categoriesData: TrackCategory[];
	children: ReactNode;
}) {
	if (!isEditable) return children;
	async function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over || active.id === over.id) return;

		const oldIndex = categoriesData.findIndex(
			(category) => category.id === active.id,
		);
		const newIndex = categoriesData.findIndex(
			(category) => category.id === over.id,
		);
		const newTrackCategories = arrayMove(categoriesData, oldIndex, newIndex);
		setTrackCategories(newTrackCategories);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/lists/${activeSavedPlaylistState[0].targetLink}/${active.id}/reorder?discordUserId=${discordUserId}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					newPosition: newIndex + 1,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (response.ok)
			userSavedPlaylistsCache.invalidate(
				activeSavedPlaylistState[0].targetLink,
			);
	}

	return (
		<DndContext
			collisionDetection={closestCenter}
			onDragEnd={handleDragEnd}
			children={children}
		/>
	);
}

function InnerContext({
	isEditable,
	categoriesData,
	children,
}: {
	isEditable: boolean;
	categoriesData: TrackCategory[];
	children: ReactNode;
}) {
	return isEditable ? (
		<SortableContext
			items={categoriesData.map(
				(category) => category.id ?? category.targetLink ?? category.title,
			)}
			strategy={rectSortingStrategy}
			children={children}
		/>
	) : (
		children
	);
}

interface CategoriesGridProps {
	categoriesData: TrackCategory[];
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	setTrackCategories: Dispatch<SetStateAction<TrackCategory[]>>;
	type: keyof typeof PlaylistPlataformType;
	discordUserId: string;
}
export const CategoriesGrid = React.memo(
	({
		categoriesData,
		type,
		discordUserId,
		activeSavedPlaylistState,
		setTrackCategories,
	}: CategoriesGridProps) => {
		const isEditable = type == "Gjallar";

		return (
			<CoreContext
				isEditable={isEditable}
				activeSavedPlaylistState={activeSavedPlaylistState}
				setTrackCategories={setTrackCategories}
				categoriesData={categoriesData}
				discordUserId={discordUserId}>
				<CategoriesGridContainer id="categoriesGridContainer">
					<InnerContext
						isEditable={isEditable}
						categoriesData={categoriesData}>
						{categoriesData.map((category, index) => (
							<CategoryDisplay
								key={`${category.title}${index}${activeSavedPlaylistState[0]?.id ?? ""}`}
								activeSavedPlaylistState={activeSavedPlaylistState}
								category={category}
								discordUserId={discordUserId}
								isEditable={isEditable}
							/>
						))}
					</InnerContext>
				</CategoriesGridContainer>
			</CoreContext>
		);
	},
);
