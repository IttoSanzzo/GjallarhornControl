import { savedPlaylistCategoriesCache } from "@/lib/cache/savedPlaylistCategoriesCache";
import styles from "./styles.module.css";
import {
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
import { newStyledElement } from "@setsu-tp/styled-components";
import { Dispatch, SetStateAction } from "react";

const DeletePlaylistButtonButton = newStyledElement.button(
	styles.deletePlaylistButtonButton,
);

interface DeletePlaylistButtonProps {
	savedPlaylist: SavedPlaylist;
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	userSavedPlaylistsState: [
		UserSavedPlaylists | null,
		Dispatch<SetStateAction<UserSavedPlaylists | null>>,
	];
	discordUserId: string;
}
export function DeletePlaylistButton({
	activeSavedPlaylistState,
	discordUserId,
	savedPlaylist,
	userSavedPlaylistsState,
}: DeletePlaylistButtonProps) {
	async function deletePlaylist() {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/playlists/${savedPlaylist.id}?discordUserId=${discordUserId}`,
			{
				method: "DELETE",
			},
		);
		if (!response.ok) return;
		userSavedPlaylistsState[1]((state) =>
			state
				? {
						...state,
						playlists: state.playlists.filter(
							(playlist) => playlist.id != savedPlaylist.id,
						),
					}
				: null,
		);
		if (activeSavedPlaylistState[0].id == savedPlaylist.id)
			activeSavedPlaylistState[1]({
				targetType: "Default",
				id: "",
				nickname: "",
				targetLink: "",
			});
		switch (savedPlaylist.targetType) {
			case "Unknown":
			case "Default":
			case "Gjallar":
				return;
			case "Soundcloud":
			case "Spotify":
			case "Youtube":
				savedPlaylistCategoriesCache.invalidate(savedPlaylist.targetLink);
				return;
		}
	}

	return (
		<DeletePlaylistButtonButton
			onClick={async (event) => {
				event.preventDefault();
				await deletePlaylist();
			}}>
			X
		</DeletePlaylistButtonButton>
	);
}
