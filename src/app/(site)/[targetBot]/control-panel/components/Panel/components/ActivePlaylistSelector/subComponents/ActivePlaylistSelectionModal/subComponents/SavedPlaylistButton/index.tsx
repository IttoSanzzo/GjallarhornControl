import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import {
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction } from "react";
import { DeletePlaylistButton } from "./subComponents/DeletePlaylistButton";

const SavedPlaylistButtonContainer = newStyledElement.div(
	styles.savedPlaylistButtonContainer,
);
const SavedPlaylistButtonButton = newStyledElement.button(
	styles.savedPlaylistButtonButton,
);

interface SavedPlaylistButtonProps {
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
	isDefault?: boolean;
}
export function SavedPlaylistButton({
	savedPlaylist,
	activeSavedPlaylistState,
	discordUserId,
	userSavedPlaylistsState,
	isDefault = false,
}: SavedPlaylistButtonProps) {
	return (
		<SavedPlaylistButtonContainer>
			<SavedPlaylistButtonButton
				style={
					isDefault
						? {
								border: "1px solid var(--cl-gray-300)",
								borderTopLeftRadius: "var(--rd-md)",
								borderTopRightRadius: "var(--rd-md)",
							}
						: undefined
				}
				disabled={activeSavedPlaylistState[0].id == savedPlaylist.id}
				onClick={() => {
					activeSavedPlaylistState[1](savedPlaylist);
				}}>
				{savedPlaylist.nickname}
			</SavedPlaylistButtonButton>{" "}
			{!isDefault && (
				<DeletePlaylistButton
					activeSavedPlaylistState={activeSavedPlaylistState}
					discordUserId={discordUserId}
					savedPlaylist={savedPlaylist}
					userSavedPlaylistsState={userSavedPlaylistsState}
				/>
			)}
		</SavedPlaylistButtonContainer>
	);
}
