"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useContext } from "react";
import Seekbar from "@/app/(site)/embeds/[targetBot]/[guildId]/seekbar/pageContent";
import PreviewContainer from "./subComponents/PreviewContainer";
import CurrentTrack from "@/app/(site)/embeds/[targetBot]/[guildId]/current-track/pageContent";
import CurrentTrackPeekContainer from "./subComponents/CurrentTrackPeekContainer";
import ControlBar from "./subComponents/ControlBar";
import {
	PlayerStationDataContext,
	UserSessionData,
} from "../ControlPanelContextProvider";

const SeekbarContainer = newStyledElement.div(styles.seekbarContainer);
const CurrentTrackContainer = newStyledElement.div(
	styles.currentTrackContainer
);
const TrackInfoDisplay = newStyledElement.div(styles.trackInfoDisplay);

export default function StationComponents() {
	const userSessionData = useContext(UserSessionData);
	const playerStationData = useContext(PlayerStationDataContext);

	if (
		userSessionData.presenceState == null ||
		userSessionData.presenceState?.voice.guildId == "0" ||
		playerStationData == null
	)
		return null;

	const previousTrack =
		playerStationData.loopState == 1
			? playerStationData.currentTrack
			: playerStationData.previousTrack;
	const nextTrack =
		playerStationData.loopState == 1
			? playerStationData.currentTrack
			: playerStationData.nextTrack;

	return (
		<div
			className={
				playerStationData.guildId != "0" ||
				playerStationData.currentTrack == null
					? styles.displayIn
					: styles.displayOut
			}>
			<ControlBar queryData={userSessionData} />

			<PreviewContainer
				userId={userSessionData.userId}
				guildId={userSessionData.presenceState.voice.guildId}
				targetBot={userSessionData.targetBot}
				lastCommand={playerStationData.lastCommandResult}
				type="previous"
				keepOpaque={false}
				preview={
					previousTrack && {
						artwork: previousTrack.artwork,
						title: previousTrack.title,
					}
				}
				fromLog={playerStationData.fromLog}
			/>
			<PreviewContainer
				userId={userSessionData.userId}
				guildId={userSessionData.presenceState.voice.guildId}
				targetBot={userSessionData.targetBot}
				lastCommand={playerStationData.lastCommandResult}
				type="next"
				keepOpaque={false}
				preview={
					nextTrack && {
						artwork: nextTrack.artwork,
						title: nextTrack.title,
					}
				}
				fromLog={playerStationData.fromLog}
			/>

			{playerStationData.currentTrack && (
				<CurrentTrackContainer>
					<SeekbarContainer>
						<Seekbar
							userId={userSessionData.userId}
							guildId={userSessionData.presenceState.voice.guildId}
							targetBot={userSessionData.targetBot}
							isPaused={playerStationData.isPaused}
							totalLength={playerStationData.currentTrack.durationInSeconds}
							currentPosition={playerStationData.currentTrack.currentPosition}
							lastUpdate={playerStationData.currentTrack.lastUpdate}
							unixTimestamp={playerStationData.unixTimestamp}
							isFinished={playerStationData.isFinished}
						/>
					</SeekbarContainer>
					<CurrentTrack
						guildId={userSessionData.presenceState.voice.guildId}
						targetBot={userSessionData.targetBot}
						title={playerStationData.currentTrack.title}
					/>
					<TrackInfoDisplay>
						<CurrentTrackPeekContainer
							guildId={userSessionData.presenceState.voice.guildId}
							targetBot={userSessionData.targetBot}
							userId={userSessionData.userId}
							keepOpaque
							currentTrackData={{
								trackUrl: playerStationData.currentTrack.link,
								originalUserAvatarUrl:
									playerStationData.currentTrack.originalUserAvatarUrl,
								originalUserNickname:
									playerStationData.currentTrack.originalUser,
								title: playerStationData.currentTrack.title,
								artwork: playerStationData.currentTrack.artwork,
							}}
						/>
					</TrackInfoDisplay>
				</CurrentTrackContainer>
			)}
		</div>
	);
}
