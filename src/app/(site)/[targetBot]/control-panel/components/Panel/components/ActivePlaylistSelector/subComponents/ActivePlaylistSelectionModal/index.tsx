import { Dispatch, SetStateAction } from "react";
import styles from "./styles.module.css";
import {
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
import { newStyledElement } from "@setsu-tp/styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import { AddUserPlaylist } from "./subComponents/AddUserPlaylist";
import { SavedPlaylistButton } from "./subComponents/SavedPlaylistButton";

const PlaylistListContainer = newStyledElement.div(
	styles.playlistListContainer,
);

interface ActivePlaylistSelectionModalProps {
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	discordId: string;
	modalOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
	userSavedPlaylistsState: [
		UserSavedPlaylists | null,
		Dispatch<SetStateAction<UserSavedPlaylists | null>>,
	];
}
export function ActivePlaylistSelectionModal({
	discordId,
	activeSavedPlaylistState,
	modalOpenState,
	userSavedPlaylistsState,
}: ActivePlaylistSelectionModalProps) {
	return (
		<Dialog.Root
			defaultOpen={false}
			open={modalOpenState[0]}>
			<Dialog.Portal>
				<Dialog.Overlay
					className={styles.modalOverlay}
					onClick={() => modalOpenState[1](false)}
				/>
				<Dialog.Content className={styles.modalContent}>
					<h1>User's Playlists</h1>
					<PlaylistListContainer>
						<SavedPlaylistButton
							isDefault
							savedPlaylist={{
								id: "",
								targetLink: "",
								nickname: "Default",
								targetType: "Default",
							}}
							position={0}
							maxPosition={userSavedPlaylistsState[0]?.playlists.length ?? 0}
							modalOpenState={modalOpenState}
							activeSavedPlaylistState={activeSavedPlaylistState}
							userSavedPlaylistsState={userSavedPlaylistsState}
							discordUserId={discordId}
						/>
						{userSavedPlaylistsState[0]?.playlists.map((entry, index) => (
							<SavedPlaylistButton
								key={entry.id}
								savedPlaylist={entry}
								activeSavedPlaylistState={activeSavedPlaylistState}
								userSavedPlaylistsState={userSavedPlaylistsState}
								modalOpenState={modalOpenState}
								position={index + 1}
								maxPosition={userSavedPlaylistsState[0]?.playlists.length ?? 0}
								discordUserId={discordId}
							/>
						))}
					</PlaylistListContainer>
					<AddUserPlaylist
						discordId={discordId}
						userSavedPlaylistsState={userSavedPlaylistsState}
					/>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
