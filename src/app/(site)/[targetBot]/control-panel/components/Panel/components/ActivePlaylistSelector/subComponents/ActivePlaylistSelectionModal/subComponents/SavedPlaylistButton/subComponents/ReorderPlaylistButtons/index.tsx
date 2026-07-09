import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import {
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction } from "react";
import { userSavedPlaylistsCache } from "@/lib/cache/userSavedPlaylistsCache";

const ReorderPlaylistButtonsContainer = newStyledElement.div(
	styles.reorderPlaylistButtonsContainer,
);
const ReorderPlaylistGenericButton = newStyledElement.div(
	styles.reorderPlaylistGenericButton,
);

interface ReorderPlaylistButtonsProps {
	savedPlaylist: SavedPlaylist;
	userSavedPlaylistsState: [
		UserSavedPlaylists | null,
		Dispatch<SetStateAction<UserSavedPlaylists | null>>,
	];
	position: number;
	maxPosition: number;
	discordId: string;
}
export function ReorderPlaylistButtons({
	savedPlaylist,
	userSavedPlaylistsState,
	maxPosition,
	position,
	discordId,
}: ReorderPlaylistButtonsProps) {
	async function postReorder(newPosition: number): Promise<boolean> {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/lists/${userSavedPlaylistsState[0]?.id}/${savedPlaylist.id}/reorder?discordUserId=${discordId}`,
			{
				method: "PATCH",
				body: JSON.stringify({
					newPosition: newPosition,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (response.ok)
			userSavedPlaylistsCache.invalidate(
				`/gjallar/lists/user-root?discordUserId=${discordId}`,
			);
		return response.ok;
	}

	async function updatePosition(
		event: React.MouseEvent<HTMLDivElement>,
		newPosition: number,
	) {
		event.preventDefault();
		if ((await postReorder(newPosition)) == false) return;
		userSavedPlaylistsState[1]((state) => {
			if (!state) return null;
			const playlists = [...state.playlists];
			const [playlist] = playlists.splice(position - 1, 1);
			playlists.splice(newPosition - 1, 0, playlist);
			return { ...state, playlists };
		});
	}

	return (
		<ReorderPlaylistButtonsContainer>
			<ReorderPlaylistGenericButton
				className={styles.toUp}
				onClick={(event) =>
					updatePosition(event, position == 1 ? maxPosition : position - 1)
				}
			/>
			<ReorderPlaylistGenericButton
				className={styles.toDown}
				onClick={(event) =>
					updatePosition(event, position == maxPosition ? 1 : position + 1)
				}
			/>
		</ReorderPlaylistButtonsContainer>
	);
}
