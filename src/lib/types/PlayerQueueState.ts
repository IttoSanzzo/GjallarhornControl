import { TrackInfo } from "./PlayerStationState";

export type PlayerQueueState = {
	unixTimestamp: number;
	guildId: string;
	guildName: string;
	voiceChannelId?: string;
	isPaused: boolean;
	loopState: number;
	isFinished: boolean;
	currentIndex: number;
	tracks: TrackInfo[];
};
