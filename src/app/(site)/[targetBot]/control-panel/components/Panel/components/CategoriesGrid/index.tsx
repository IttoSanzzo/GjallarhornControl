import { TrackCategory } from "@/lib/TrackData";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { EntryButton } from "./subComponents/EntryButton";
import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";
import { plataformIcons } from "@/lib/PlataformIcons";
import {
	PlaylistPlataformType,
	SavedPlaylist,
} from "@/lib/types/UserSavedPlaylist";
import { PlayPlaylistButton } from "../ActivePlaylistSelector/subComponents/ActivePlaylistSelectionModal/subComponents/SavedPlaylistButton/subComponents/PlayPlaylistButton";
import { DeletePlaylistFromGjallarList } from "./subComponents/DeletePlaylistFromGjallarList";

const CategoriesGridContainer = newStyledElement.div(
	styles.categoriesGridContainer,
);
const CategoryContainer = newStyledElement.main(styles.categoryContainer);
const EntriesContainer = newStyledElement.div(styles.entriesContainer);
const CategoryUtilitiesContainer = newStyledElement.div(
	styles.categoryUtilitiesContainer,
);
const PlaylistCategoryLinkandIcon = newStyledElement.a(
	styles.playlistCategoryLinkandIcon,
);

interface CategoriesGridProps {
	categoriesData: TrackCategory[];
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	type: keyof typeof PlaylistPlataformType;
	discordUserId: string;
}
export const CategoriesGrid = React.memo(
	({
		categoriesData,
		type,
		discordUserId,
		activeSavedPlaylistState,
	}: CategoriesGridProps) => {
		const isEditable = type == "Gjallar";
		return (
			<CategoriesGridContainer id="categoriesGridContainer">
				{categoriesData.map((category, index) => (
					<CategoryContainer
						key={`${category.title}${index}${activeSavedPlaylistState[0]?.id ?? ""}`}>
						<h2>{category.title}</h2>
						<EntriesContainer>
							{category.tracks.map((track, index) => (
								<EntryButton
									key={`${track.link}${index}`}
									discordUserId={discordUserId}
									trackInfo={track}
								/>
							))}
						</EntriesContainer>
						{category.targetLink && category.targetLink && (
							<CategoryUtilitiesContainer>
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
												target="_blank">
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
						)}
					</CategoryContainer>
				))}
			</CategoriesGridContainer>
		);
	},
);
