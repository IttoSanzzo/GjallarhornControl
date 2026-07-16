"use client";

import Image from "next/image";
import IconPlayPause from "@/assets/CircularPlayPauseIcon.png";
import IconPrevious from "@/assets/CircularPreviousTrackIcon.png";
import IconNext from "@/assets/CircularNextTrackIcon.png";
import IconLoop from "@/assets/CircularLoopIcon.png";
import OneIconLoop from "@/assets/CircularOneLoopIcon.png";
import IconShuffle from "@/assets/CircularShuffleIcon.png";
import IconReset from "@/assets/CircularResetIcon.png";
import IconStop from "@/assets/CircularRemoveIcon.png";
import { useContext } from "react";
import { ApiCommandsHandlerContext } from "../../../ControlPanelContextProvider";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { PlayerStationContext } from "@/components/PlayerStationContextProvider";

const ControlBarContainer = newStyledElement.div(styles.controlBarContainer);
const ActionButton = newStyledElement.button(styles.actionButton);

export default function ControlBar() {
	const { postActionCommand } = useContext(ApiCommandsHandlerContext);
	const playerState = useContext(PlayerStationContext);

	return (
		<>
			<ControlBarContainer>
				<ActionButton
					onClick={() => postActionCommand("Pause")}
					style={{
						...(playerState?.isPaused && { backgroundColor: "cyan" }),
					}}>
					<Image
						src={IconPlayPause}
						alt="Play / Pause button"
						priority
					/>
				</ActionButton>

				<ActionButton onClick={() => postActionCommand("Previous")}>
					<Image
						src={IconPrevious}
						alt="Previous track button"
					/>
				</ActionButton>
				<ActionButton onClick={() => postActionCommand("Next")}>
					<Image
						src={IconNext}
						alt="Next track button"
					/>
				</ActionButton>

				<ActionButton
					onClick={() => postActionCommand("Loop")}
					style={{
						...(playerState?.loopState == 1 && { backgroundColor: "green" }),
						...(playerState?.loopState == 2 && { backgroundColor: "red" }),
					}}>
					<Image
						src={playerState?.loopState == 1 ? OneIconLoop : IconLoop}
						alt="Loop queue button"
					/>
				</ActionButton>
				<ActionButton onClick={() => postActionCommand("Shuffle")}>
					<Image
						src={IconShuffle}
						alt="Shuffle queue button"
					/>
				</ActionButton>
				<ActionButton onClick={() => postActionCommand("Reset")}>
					<Image
						src={IconReset}
						alt="Reset queue button"
					/>
				</ActionButton>
				<ActionButton onClick={() => postActionCommand("Stop")}>
					<Image
						src={IconStop}
						alt="Stop queue button"
					/>
				</ActionButton>
			</ControlBarContainer>
		</>
	);
}
