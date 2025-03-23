"use client";

import { ActionButton, ControlBarContainer } from "./styledComponents";
import Image from "next/image";
import IconPlayPause from "@/assets/CircularPlayPauseIcon.png";
import IconPrevious from "@/assets/CircularPreviousTrackIcon.png";
import IconNext from "@/assets/CircularNextTrackIcon.png";
import IconLoop from "@/assets/CircularLoopIcon.png";
import IconShuffle from "@/assets/CircularShuffleIcon.png";
import IconReset from "@/assets/CircularResetIcon.png";
import IconRemove from "@/assets/CircularRemoveIcon.png";
import { useSearchParams } from "next/navigation";

interface ControlBarProps {
	targetBot: string;
}

export default function ControlBar({ targetBot }: ControlBarProps) {
	const params = useSearchParams();
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

	function SocketSimpleCall(command: string) {
		let body = `<|Command|><|Value|>${command}\n`;
		if (params.get("channelId") != "")
			body += `<|ChatChannelId|><|Value|>${params.get("channelId")}\n`;
		body += `<|UserId|><|Value|>${params.get("userId")}`;
		// SendSocketMessage(body);
		console.log(body);
	}

	function handleActionButton(action: string) {
		// console.log(action);
		SocketSimpleCall(action);
	}

	return (
		<ControlBarContainer>
			<ActionButton onClick={() => handleActionButton("pause")}>
				<Image
					src={IconPlayPause}
					alt="Play / Pause button"
				/>
			</ActionButton>
			{isBotChariot && (
				<>
					<ActionButton onClick={() => handleActionButton("next")}>
						<Image
							src={IconNext}
							alt="Next track button"
						/>
					</ActionButton>
					<ActionButton onClick={() => handleActionButton("previous")}>
						<Image
							src={IconPrevious}
							alt="Previous track button"
						/>
					</ActionButton>
				</>
			)}
			<ActionButton onClick={() => handleActionButton("loop")}>
				<Image
					src={IconLoop}
					alt="Loop queue button"
				/>
			</ActionButton>
			{isBotChariot && (
				<>
					<ActionButton onClick={() => handleActionButton("shuffle")}>
						<Image
							src={IconShuffle}
							alt="Shuffle queue button"
						/>
					</ActionButton>
					<ActionButton onClick={() => handleActionButton("clean")}>
						<Image
							src={IconReset}
							alt="Clean queue button"
						/>
					</ActionButton>
				</>
			)}
			<ActionButton onClick={() => handleActionButton("exit")}>
				<Image
					src={IconRemove}
					alt="Exit queue button"
				/>
			</ActionButton>
		</ControlBarContainer>
	);
}
