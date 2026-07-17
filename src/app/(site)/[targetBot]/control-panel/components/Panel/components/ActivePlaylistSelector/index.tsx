import styles from "./styles.module.css";
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useLayoutEffect,
	useState,
} from "react";
import { newStyledElement } from "@setsu-tp/styled-components";
import {
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
import { ActivePlaylistSelectionModal } from "./subComponents/ActivePlaylistSelectionModal";
import { userSavedPlaylistsCache } from "@/lib/cache/userSavedPlaylistsCache";
import { AddPlaylistToGjallarList } from "./subComponents/AddPlaylistToGjallarList";

const ActivePlaylistSelectorMainContainer = newStyledElement.div(
	styles.activePlaylistSelectorMainContainer,
);
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
	targetBot: string;
	discordId: string;
}
export function ActivePlaylistSelector({
	activeSavedPlaylistState,
	discordId,
	targetBot,
}: ActivePlaylistSelectorProps) {
	const modalOpenState = useState<boolean>(false);
	const userSavedPlaylistsState = useState<UserSavedPlaylists | null>(null);

	useEffect(() => {
		async function loadSavedUserPlayslists() {
			let userSavedPlaylists: UserSavedPlaylists | null = null;

			while (userSavedPlaylists == null) {
				try {
					userSavedPlaylists = await userSavedPlaylistsCache.getOrLoad(
						`/gjallar/lists/user-root?discordUserId=${discordId}`,
						async () => {
							const response = await fetch(
								`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/lists/user-root?discordUserId=${discordId}`,
								{
									method: "GET",
								},
							);
							if (!response.ok) return null;
							return await response.json();
						},
					);
				} catch (ex) {
					void ex;
				}
				if (userSavedPlaylists != null) break;
				else {
					userSavedPlaylistsCache.invalidate(
						`/gjallar/lists/user-root?discordUserId=${discordId}`,
					);
					await new Promise((resolve) => setTimeout(resolve, 4000));
				}
			}
			userSavedPlaylistsState[1](userSavedPlaylists);
		}
		loadSavedUserPlayslists();
	}, [discordId]);

	useEffect(() => {
		function switchOpenState(event: KeyboardEvent) {
			if (event.ctrlKey && event.shiftKey && event.key == "F")
				modalOpenState[1](!modalOpenState[0]);
		}
		document.body.addEventListener("keydown", switchOpenState);
		return () => document.body.removeEventListener("keydown", switchOpenState);
	}, [modalOpenState[0], modalOpenState[1]]);

	useLayoutEffect(() => {
		function setActiveToDefault() {
			activeSavedPlaylistState[1]((state) => ({
				...state,
				targetType: "Default",
			}));
		}

		if (
			activeSavedPlaylistState[0] != null &&
			activeSavedPlaylistState[0].id != ""
		)
			return;
		const memorySavedId = localStorage.getItem(
			`LastActivePlaylistId-|${targetBot}|`,
		);
		if (!memorySavedId) return setActiveToDefault();
		const playlistIndexToActivate =
			userSavedPlaylistsState[0]?.playlists.findIndex(
				(playlist) => playlist.id == memorySavedId,
			);
		if (playlistIndexToActivate == -1) return setActiveToDefault();
		activeSavedPlaylistState[1](
			(userSavedPlaylistsState[0]?.playlists ?? [])[
				playlistIndexToActivate ?? 0
			],
		);
	}, [
		userSavedPlaylistsState[0],
		userSavedPlaylistsState[1],
		activeSavedPlaylistState[1],
		targetBot,
	]);

	return (
		<ActivePlaylistSelectorMainContainer>
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
					targetBot={targetBot}
				/>
			</ActivePlaylistSelectorContainer>
			<AddPlaylistToGjallarList
				discordId={discordId}
				activePlaylist={activeSavedPlaylistState[0]}
				activeSavedPlaylistState={activeSavedPlaylistState}
			/>
		</ActivePlaylistSelectorMainContainer>
	);
}
