export type PlayerCommandResult = {
	command: string;
	wasSuccess: boolean;
	errorMessage?: string;
};
export type TrackInfo = {
	title: string;
	link: string;
	artwork: string;
	index: number;
	originalUser: string;
	originalUserAvatarUrl: string;
};
export type CurrentTrackInfo = {
	totalLength: number;
	currentPosition: number;
	lastUpdate: number;
} & TrackInfo;
export type PlayerStationState = {
	unixTimestamp: number;
	guildId: string;
	voiceChannelId?: string;
	chatChannelId?: string;
	isPaused: boolean;
	loopState: number;
	isFinished: boolean;
	currentIndex: number;
	lastCommandResult: PlayerCommandResult;
	fromLog?: boolean;
	currentTrack?: CurrentTrackInfo;
	previousTrack?: TrackInfo;
	nextTrack?: TrackInfo;
};
