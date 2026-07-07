export interface SavedPlaylist {
	id: string;
	nickname: string | undefined;
	targetType: "Default" | "Youtube" | "Cloudflare" | "Gjalallar" | "Unknown";
	targetLink: string;
}

export interface UserSavedPlaylists {
	id: string;
	discordUserId: string;
	playlists: SavedPlaylist[];
	createdAt: string;
	updatedAt: string;
}
