"use client";

import { useContext } from "react";
import { PlayerStationContext } from "@/components/PlayerStationContextProvider";
import Seekbar from "../../pageContent";
import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";

const SeekbarDummy = newStyledElement.span(styles.seekbarDummy);

interface SeekbarWrapperProps {
	targetBot: string;
	guildId: string;
	userId?: string;
	width?: number;
}
export function SeekbarWrapper({
	guildId,
	targetBot,
	userId,
	width,
}: SeekbarWrapperProps) {
	const playerStation = useContext(PlayerStationContext);

	if (playerStation == null || playerStation.currentTrack == null)
		return (
			<SeekbarDummy>
				<span
					className={styles.dummyDeadCounter}
					style={{ left: 25 }}
				/>
				<span
					className={styles.dummyDeadCounter}
					style={{ right: 25 }}
				/>
				<span>
					<span>
						<span>
							<span />
						</span>
					</span>
				</span>
			</SeekbarDummy>
		);

	return (
		<Seekbar
			guildId={guildId}
			targetBot={targetBot}
			width={width}
			isFinished={playerStation.isFinished}
			lastUpdate={playerStation.currentTrack.lastUpdate}
			totalLength={playerStation.currentTrack.durationInSeconds}
			currentPosition={playerStation.currentTrack.currentPosition}
			unixTimestamp={playerStation.unixTimestamp}
			isPaused={playerStation.isPaused}
			userId={userId}
		/>
	);
}
