import styles from "./styles.module.css";
import Image from "next/image";
import { plataformIcons } from "@/lib/PlataformIcons";
import { newStyledElement } from "@setsu-tp/styled-components";
import { TrackCategory } from "@/lib/TrackData";
import {
	PlaylistPlataformType,
	SavedPlaylist,
} from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction, useRef } from "react";
import { EntryButton } from "../EntryButton";
import { PatchPlaylistFromGjallarList } from "../PatchPlaylistFromGjallarList";
import { PlayPlaylistButton } from "../../../ActivePlaylistSelector/subComponents/ActivePlaylistSelectionModal/subComponents/SavedPlaylistButton/subComponents/PlayPlaylistButton";
import { DeletePlaylistFromGjallarList } from "../DeletePlaylistFromGjallarList";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { savedPlaylistCategoriesCache } from "@/lib/cache/savedPlaylistCategoriesCache";

const CategoryContainer = newStyledElement.div(styles.categoryContainer);
const EntriesContainer = newStyledElement.div(styles.entriesContainer);
const CategoryUtilitiesContainer = newStyledElement.div(
	styles.categoryUtilitiesContainer,
);
const PlaylistCategoryLinkandIcon = newStyledElement.a(
	styles.playlistCategoryLinkandIcon,
);
const InvalidateCategoryButton = newStyledElement.button(
	styles.invalidateCategoryButton,
);

interface CategoryDisplayProps {
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	discordUserId: string;
	category: TrackCategory;
	isEditable: boolean;
	setTrackCategories: Dispatch<SetStateAction<TrackCategory[]>>;
}
export function CategoryDisplay({
	activeSavedPlaylistState,
	discordUserId,
	category,
	isEditable,
	setTrackCategories,
}: CategoryDisplayProps) {
	const stableIdRef = useRef(
		category.id ?? category.targetLink ?? category.title ?? crypto.randomUUID(),
	);
	const id = stableIdRef.current;

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({
			id,
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<CategoryContainer
			ref={setNodeRef}
			style={style}
			{...attributes}
			tabIndex={-1}>
			{category.targetLink && (
				<InvalidateCategoryButton
					onClick={() => {
						savedPlaylistCategoriesCache.invalidate(category.targetLink!);
						window.location.reload();
					}}
					tabIndex={-1}>
					R
				</InvalidateCategoryButton>
			)}
			<h2 {...listeners}>{category.title}</h2>
			<EntriesContainer>
				{category.tracks.map((track, index) => (
					<EntryButton
						key={`${track.link}${index}`}
						discordUserId={discordUserId}
						trackInfo={track}
						setTrackCategories={setTrackCategories}
					/>
				))}
			</EntriesContainer>
			{category.targetLink && (
				<>
					<CategoryUtilitiesContainer>
						{isEditable && category.id && (
							<PatchPlaylistFromGjallarList
								discordId={discordUserId}
								activeSavedPlaylistState={activeSavedPlaylistState}
								category={category}
							/>
						)}
						{category.targetType != "Unknown" &&
							category.targetType != "Gjallar" &&
							category.targetType != "Default" &&
							category.targetLink && (
								<>
									<PlayPlaylistButton
										type="normal"
										playlistLink={category.targetLink}
									/>
									<PlaylistCategoryLinkandIcon
										href={category.targetLink}
										target="_blank"
										tabIndex={-1}>
										<Image
											src={
												plataformIcons[
													PlaylistPlataformType[
														category.targetType as keyof typeof PlaylistPlataformType
													]
												]
											}
											alt={"Current track plataform icon"}
											fill
										/>
									</PlaylistCategoryLinkandIcon>
									{isEditable && category.id && (
										<DeletePlaylistFromGjallarList
											activeSavedPlaylistState={activeSavedPlaylistState}
											discordUserId={discordUserId}
											category={category}
										/>
									)}
								</>
							)}
					</CategoryUtilitiesContainer>
				</>
			)}
		</CategoryContainer>
	);
}
