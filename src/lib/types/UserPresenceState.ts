export type UserPresenceState = {
	voice: {
		guildId: string;
		guildName: string;
		channelId: string;
		channelName: string;
	};
	chat?: {
		guildId: string;
		channelId: string;
	};
	user: {
		username: string;
		avatarUrl: string;
	};
};
