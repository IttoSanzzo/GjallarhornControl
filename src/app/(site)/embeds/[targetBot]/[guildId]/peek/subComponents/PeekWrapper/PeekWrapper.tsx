"use client";

import { useContext } from "react";
import Peek from "../../pageContent";
import { PlayerStationContext } from "@/components/PlayerStationContextProvider";

interface PeekWrapperProps {
	targetBot: string;
	guildId: string;
	size?: number;
	type: "previous" | "current" | "next";
}
export function PeekWrapper({
	guildId,
	targetBot,
	type,
	size,
}: PeekWrapperProps) {
	const playerStation = useContext(PlayerStationContext);

	return (
		<Peek
			guildId={guildId}
			targetBot={targetBot}
			size={size}
			type={type}
			preview={playerStation?.currentTrack}
		/>
	);
}
