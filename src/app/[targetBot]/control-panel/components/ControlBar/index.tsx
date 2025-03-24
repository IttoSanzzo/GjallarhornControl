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
import React from "react";
import { QueryData } from "../../page";

interface ControlBarProps {
	queryData: QueryData;
}

export default function ControlBar({
	queryData: { channelId, targetBot, userId },
}: ControlBarProps) {
	const isBotChariot = targetBot == "ChariotSanzzo";

	/*
	function SendSocketMessage(content: string) {
		if (socket.readyState == WebSocket.OPEN) {
			console.log("Socket Message Sent!\n" + content);
			socket.send(content);
			showNotification(3, "green");
		} else alert("Error in WebSocket Connection (Probably not open.)");
	}
		*/

	function handleActionButton(action: string) {
		api.post(`/${targetBot}/action`, {
			channelId,
			userId,
			action,
		});
	}

	return (
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
	);
}
