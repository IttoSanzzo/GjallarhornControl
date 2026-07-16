"use client";

import { useContext } from "react";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { PlayerStationContext } from "@/components/PlayerStationContextProvider";
import { VolumeSlider } from "./VolumeSlider";

const VolumeBarContainer = newStyledElement.div(styles.volumeBarContainer);
const VolumeBarDummy = newStyledElement.div(styles.volumeBarDummy);

interface VolumeBarProps {
	userId: string;
	targetBot: string;
}
export default function VolumeBar({ targetBot, userId }: VolumeBarProps) {
	const playerStation = useContext(PlayerStationContext);
	if (playerStation == null || playerStation.currentTrack == null)
		return (
			<VolumeBarContainer>
				<VolumeBarDummy>
					<span />
				</VolumeBarDummy>
			</VolumeBarContainer>
		);
	return (
		<VolumeBarContainer>
			<VolumeSlider
				currentVolume={playerStation.volume}
				userId={userId}
				targetBot={targetBot}
				guildId={playerStation.guildId}
			/>
		</VolumeBarContainer>
	);
}
