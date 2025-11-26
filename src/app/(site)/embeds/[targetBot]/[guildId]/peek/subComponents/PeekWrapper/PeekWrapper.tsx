"use client";

import { useContext } from "react";
import Peek from "../../pageContent";
import { PlayerStationContext } from "@/components/PlayerStationContextProvider";

interface PeekWrapperProps {
	targetBot: string;
	guildId: string;
	size?: number;
	type: "previous" | "current" | "next";
	inBox?: boolean;
	boxSide?: "left" | "right";
}
export function PeekWrapper({
	guildId,
	targetBot,
	type,
	size,
	inBox,
	boxSide,
}: PeekWrapperProps) {
	const playerStation = useContext(PlayerStationContext);

	return (
		<Peek
			guildId={guildId}
			targetBot={targetBot}
			size={size}
			type={type}
			preview={playerStation?.currentTrack}
			inBox={inBox}
			boxSide={boxSide}
		/>
	);
}
