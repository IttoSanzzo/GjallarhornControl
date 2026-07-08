import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { Dispatch, SetStateAction, useContext } from "react";
import { ApiCommandsHandlerContext } from "@/app/(site)/[targetBot]/control-panel/components/ControlPanelContextProvider";
import { SavedPlaylist } from "@/lib/types/UserSavedPlaylist";

const PlayPlaylistButtonButton = newStyledElement.button(
	styles.playPlaylistButtonButton,
);

interface PlayPlaylistButtonProps {
	savedPlaylist: SavedPlaylist;
	setModalOpenState: Dispatch<SetStateAction<boolean>>;
}
export function PlayPlaylistButton({
	savedPlaylist,
	setModalOpenState,
}: PlayPlaylistButtonProps) {
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);

	return (
		<PlayPlaylistButtonButton
			onClick={async () => {
				await postPlayCommand(savedPlaylist.targetLink);
				setModalOpenState(false);
			}}
		/>
	);
}
