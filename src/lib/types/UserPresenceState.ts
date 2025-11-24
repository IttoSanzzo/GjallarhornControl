export type UserPresenceState = {
	voice: {
		guildId: string;
		channelId: string;
	};
	chat?: {
		guildId: string;
		channelId: string;
	};
};
