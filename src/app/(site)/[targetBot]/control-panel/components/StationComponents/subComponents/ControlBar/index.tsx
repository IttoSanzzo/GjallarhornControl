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
import { useContext, useState } from "react";
import { Notification, NotificationData } from "@/components/Notification";
import { newNotification } from "@/lib/utils";
import {
	ApiCommandsHandler,
	PlayerStationDataContext,
	UserSessionData,
} from "../../../ControlPanelContextProvider";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";

const ControlBarContainer = newStyledElement.div(styles.controlBarContainer);
const ActionButton = newStyledElement.button(styles.actionButton);

interface ControlBarProps {
	queryData: UserSessionData;
}

export default function ControlBar({
	queryData: { targetBot },
}: ControlBarProps) {
	const { postActionCommand } = useContext(ApiCommandsHandler);
	const playerState = useContext(PlayerStationDataContext);
	const [notificationData] = useState<NotificationData>(newNotification());
	const isBotChariot = targetBot == "ChariotSanzzo";

	return (
		<>
			<Notification data={notificationData} />
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
				{isBotChariot && (
					<>
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
					</>
				)}
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
				{isBotChariot && (
					<>
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
					</>
				)}
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
