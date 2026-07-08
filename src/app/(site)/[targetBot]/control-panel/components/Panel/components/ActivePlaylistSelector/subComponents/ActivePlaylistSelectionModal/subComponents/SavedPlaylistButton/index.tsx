import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import {
	PlaylistPlataformType,
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction } from "react";
import { DeletePlaylistButton } from "./subComponents/DeletePlaylistButton";
import clsx from "clsx";
import { ReorderPlaylistButtons } from "./subComponents/ReorderPlaylistButtons";
import { PlayPlaylistButton } from "./subComponents/PlayPlaylistButton";
import Image from "next/image";
import { plataformIcons } from "@/lib/PlataformIcons";

const SavedPlaylistButtonContainer = newStyledElement.div(
	styles.savedPlaylistButtonContainer,
);
const SavedPlaylistButtonButton = newStyledElement.button(
	styles.savedPlaylistButtonButton,
);
const PlaylistListPlataformLinkAndIcon = newStyledElement.a(
	styles.playlistListPlataformLinkAndIcon,
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
	modalOpenState: [boolean, Dispatch<SetStateAction<boolean>>];
	discordUserId: string;
	position: number;
	maxPosition: number;
	isDefault?: boolean;
}
export function SavedPlaylistButton({
	savedPlaylist,
	activeSavedPlaylistState,
	discordUserId,
	userSavedPlaylistsState,
	modalOpenState,
	maxPosition,
	position,
	isDefault = false,
}: SavedPlaylistButtonProps) {
	function moveFocusToPreviousPlaylist() {
		const previousPosition = position == 0 ? maxPosition : position - 1;
		const previousElement = document.getElementById(
			`SavedPlaylistButton-|${previousPosition}|`,
		);
		if (previousElement) previousElement.focus();
	}
	function moveFocusToNextPlaylist() {
		const nextPosition = position == maxPosition ? 0 : position + 1;
		const nextElement = document.getElementById(
			`SavedPlaylistButton-|${nextPosition}|`,
		);
		if (nextElement) nextElement.focus();
	}
	function handleKeyDown(event: React.KeyboardEvent) {
		switch (event.key) {
			case "ArrowUp":
				event.preventDefault();
				moveFocusToPreviousPlaylist();
				break;
			case "ArrowDown":
				event.preventDefault();
				moveFocusToNextPlaylist();
				break;
		}
	}

	const isActive = activeSavedPlaylistState[0].id == savedPlaylist.id;
	return (
		<SavedPlaylistButtonContainer>
			<SavedPlaylistButtonButton
				id={`SavedPlaylistButton-|${position}|`}
				autoFocus={isActive}
				className={clsx(
					isActive ? styles.isActive : undefined,
					isDefault ? styles.defaultButton : undefined,
				)}
				onClick={
					isActive
						? undefined
						: () => {
								activeSavedPlaylistState[1](savedPlaylist);
								modalOpenState[1](false);
							}
				}
				onKeyDown={handleKeyDown}>
				{savedPlaylist.nickname}
			</SavedPlaylistButtonButton>{" "}
			{!isDefault && (
				<>
					<PlaylistListPlataformLinkAndIcon
						href={savedPlaylist.targetLink}
						target="_blank">
						<Image
							src={
								plataformIcons[PlaylistPlataformType[savedPlaylist.targetType]]
							}
							alt={"Current track plataform icon"}
							fill
						/>
					</PlaylistListPlataformLinkAndIcon>
					<PlayPlaylistButton
						savedPlaylist={savedPlaylist}
						setModalOpenState={modalOpenState[1]}
					/>
					<DeletePlaylistButton
						activeSavedPlaylistState={activeSavedPlaylistState}
						discordUserId={discordUserId}
						savedPlaylist={savedPlaylist}
						userSavedPlaylistsState={userSavedPlaylistsState}
					/>
					<ReorderPlaylistButtons
						savedPlaylist={savedPlaylist}
						userSavedPlaylistsState={userSavedPlaylistsState}
						position={position}
						maxPosition={maxPosition}
						discordId={discordUserId}
					/>
				</>
			)}
		</SavedPlaylistButtonContainer>
	);
}
