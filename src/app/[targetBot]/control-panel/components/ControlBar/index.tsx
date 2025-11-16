"use client";

import { ActionButton, ControlBarContainer } from "./styledComponents";
import Image from "next/image";
import IconPlayPause from "@/assets/CircularPlayPauseIcon.png";
import IconPrevious from "@/assets/CircularPreviousTrackIcon.png";
import IconNext from "@/assets/CircularNextTrackIcon.png";
import IconLoop from "@/assets/CircularLoopIcon.png";
import IconShuffle from "@/assets/CircularShuffleIcon.png";
import IconReset from "@/assets/CircularResetIcon.png";
import IconStop from "@/assets/CircularRemoveIcon.png";
import { api } from "@/lib/axios";
import React, { useState } from "react";
import { QueryData } from "../../page";
import { Notification, NotificationData } from "@/components/Notification";
import { newNotification } from "@/lib/utils";

interface ControlBarProps {
	queryData: QueryData;
}

export default function ControlBar({
	queryData: { channelId, targetBot, userId },
}: ControlBarProps) {
	const [notificationData, setNotificationData] = useState<NotificationData>(
		newNotification()
	);
	const isBotChariot = targetBot == "ChariotSanzzo";

	function handleActionButton(action: string) {
		const response = api.post(`/${targetBot}/action`, {
			channelId,
			userId,
			action,
		});
		response.catch(() => {
			setNotificationData(
				newNotification(
					`Failed using '${action}'. ( ${targetBot} is probably offline )`,
					true
				)
			);
			return;
		});
		setNotificationData(newNotification(`Used '${action}' succefully.`));
	}

	return (
		<>
			<Notification data={notificationData} />
			<ControlBarContainer>
				<ActionButton onClick={() => handleActionButton("Pause")}>
					<Image
						src={IconPlayPause}
						alt="Play / Pause button"
						priority
					/>
				</ActionButton>
				{isBotChariot && (
					<>
						<ActionButton onClick={() => handleActionButton("Previous")}>
							<Image
								src={IconPrevious}
								alt="Previous track button"
							/>
						</ActionButton>
						<ActionButton onClick={() => handleActionButton("Next")}>
							<Image
								src={IconNext}
								alt="Next track button"
							/>
						</ActionButton>
					</>
				)}
				<ActionButton onClick={() => handleActionButton("Loop")}>
					<Image
						src={IconLoop}
						alt="Loop queue button"
					/>
				</ActionButton>
				{isBotChariot && (
					<>
						<ActionButton onClick={() => handleActionButton("Shuffle")}>
							<Image
								src={IconShuffle}
								alt="Shuffle queue button"
							/>
						</ActionButton>
						<ActionButton onClick={() => handleActionButton("Reset")}>
							<Image
								src={IconReset}
								alt="Reset queue button"
							/>
						</ActionButton>
					</>
				)}
				<ActionButton onClick={() => handleActionButton("Stop")}>
					<Image
						src={IconStop}
						alt="Stop queue button"
					/>
				</ActionButton>
			</ControlBarContainer>
		</>
	);
}
