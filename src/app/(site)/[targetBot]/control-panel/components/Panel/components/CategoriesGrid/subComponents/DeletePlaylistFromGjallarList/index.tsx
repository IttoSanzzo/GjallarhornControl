import styles from "./styles.module.css";
import { SavedPlaylist } from "@/lib/types/UserSavedPlaylist";
import { newStyledElement } from "@setsu-tp/styled-components";
import { Dispatch, SetStateAction } from "react";
import { userSavedPlaylistsCache } from "@/lib/cache/userSavedPlaylistsCache";
import { TrackCategory } from "@/lib/TrackData";

const DeletePlaylistFromGjallarListButton = newStyledElement.button(
	styles.deletePlaylistFromGjallarListButton,
);

interface DeletePlaylistFromGjallarListProps {
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	category: TrackCategory;
	discordUserId: string;
}
export function DeletePlaylistFromGjallarList({
	activeSavedPlaylistState,
	category,
	discordUserId,
}: DeletePlaylistFromGjallarListProps) {
	async function deletePlaylist() {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/lists/${activeSavedPlaylistState[0]?.targetLink}/${category.id}?discordUserId=${discordUserId}`,
			{
				method: "DELETE",
			},
		);
		if (!response.ok) return;
		userSavedPlaylistsCache.invalidate(activeSavedPlaylistState[0].targetLink);
		activeSavedPlaylistState[1]((state) => ({
			...state,
			timestamp: Date.now(),
		}));
	}

	return (
		<DeletePlaylistFromGjallarListButton
			onClick={async (event) => {
				event.preventDefault();
				await deletePlaylist();
			}}>
			X
		</DeletePlaylistFromGjallarListButton>
	);
}
