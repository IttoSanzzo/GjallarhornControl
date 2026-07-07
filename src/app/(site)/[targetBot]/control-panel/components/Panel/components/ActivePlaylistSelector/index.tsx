import styles from "./styles.module.css";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { newStyledElement } from "@setsu-tp/styled-components";
import {
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
import { ActivePlaylistSelectionModal } from "./subComponents/ActivePlaylistSelectionModal";

const ActivePlaylistSelectorContainer = newStyledElement.div(
	styles.activePlaylistSelectorContainer,
);
const ActivePlaylistSelectorModalButton = newStyledElement.button(
	styles.activePlaylistSelectorModalButton,
);

interface ActivePlaylistSelectorProps {
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	discordId: string;
}
export function ActivePlaylistSelector({
	activeSavedPlaylistState,
	discordId,
}: ActivePlaylistSelectorProps) {
	const modalOpenState = useState<boolean>(false);
	const userSavedPlaylistsState = useState<UserSavedPlaylists | null>(null);

	async function loadSavedUserPlayslists() {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/playlists?discordUserId=${discordId}`,
			{
				method: "GET",
			},
		);
		if (!response.ok) return;
		userSavedPlaylistsState[1](await response.json());
	}
	useEffect(() => {
		loadSavedUserPlayslists();
	}, [discordId]);

	return (
		<ActivePlaylistSelectorContainer>
			<ActivePlaylistSelectorModalButton
				onClick={() => modalOpenState[1](true)}
				style={
					userSavedPlaylistsState[0] == null
						? { display: "none", opacity: 0 }
						: undefined
				}>
				<p>{userSavedPlaylistsState[0]?.playlists.length ?? 0}</p>
			</ActivePlaylistSelectorModalButton>
			<ActivePlaylistSelectionModal
				activeSavedPlaylistState={activeSavedPlaylistState}
				discordId={discordId}
				modalOpenState={modalOpenState}
				userSavedPlaylistsState={userSavedPlaylistsState}
			/>
		</ActivePlaylistSelectorContainer>
	);
}
