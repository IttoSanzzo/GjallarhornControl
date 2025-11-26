"use client";

import { useContext } from "react";
import { PlayerStationContext } from "@/components/PlayerStationContextProvider";
import CurrentTrack from "../../pageContent";

interface CurrentTrackWrapperProps {
	targetBot: string;
	guildId: string;
}
export function CurrentTrackWrapper({
	guildId,
	targetBot,
}: CurrentTrackWrapperProps) {
	const playerStation = useContext(PlayerStationContext);

	return (
		<CurrentTrack
			guildId={guildId}
			targetBot={targetBot}
			title={playerStation?.currentTrack?.title ?? "-"}
		/>
	);
}
