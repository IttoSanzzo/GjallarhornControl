import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { Dispatch, SetStateAction, useContext } from "react";
import { ApiCommandsHandlerContext } from "@/app/(site)/[targetBot]/control-panel/components/ControlPanelContextProvider";
import Image from "next/image";
import PlayIcon from "@/assets/CircularPlayIcon.png";

const PlayPlaylistButtonButton = newStyledElement.button(
	styles.playPlaylistButtonButton,
);

interface PlayPlaylistButtonProps {
	playlistLink: string;
	setModalOpenState?: Dispatch<SetStateAction<boolean>>;
	type?: "absolute" | "normal";
}
export function PlayPlaylistButton({
	playlistLink,
	setModalOpenState,
	type = "absolute",
}: PlayPlaylistButtonProps) {
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);

	return (
		<PlayPlaylistButtonButton
			className={styles[type]}
			onClick={async () => {
				await postPlayCommand(playlistLink);
				if (setModalOpenState) setModalOpenState(false);
			}}
			tabIndex={-1}>
			<Image
				src={PlayIcon}
				alt=""
				fill
			/>
		</PlayPlaylistButtonButton>
	);
}
