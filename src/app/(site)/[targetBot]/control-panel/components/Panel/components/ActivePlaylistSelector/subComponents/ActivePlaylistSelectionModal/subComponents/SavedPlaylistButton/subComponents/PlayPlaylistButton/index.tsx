import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { CSSProperties, Dispatch, SetStateAction, useContext } from "react";
import { ApiCommandsHandlerContext } from "@/app/(site)/[targetBot]/control-panel/components/ControlPanelContextProvider";

const PlayPlaylistButtonButton = newStyledElement.button(
	styles.playPlaylistButtonButton,
);

interface PlayPlaylistButtonProps {
	playlistLink: string;
	setModalOpenState?: Dispatch<SetStateAction<boolean>>;
	position?: CSSProperties["position"];
}
export function PlayPlaylistButton({
	playlistLink,
	setModalOpenState,
	position,
}: PlayPlaylistButtonProps) {
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);

	return (
		<PlayPlaylistButtonButton
			style={{ position }}
			onClick={async () => {
				await postPlayCommand(playlistLink);
				if (setModalOpenState) setModalOpenState(false);
			}}
		/>
	);
}
