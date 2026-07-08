export enum PlaylistPlataformType {
	"Unknown",
	"Default",
	"Youtube",
	"Spotify",
	"Soundcloud",
	"Gjallar",
}

export interface SavedPlaylist {
	id: string;
	nickname: string | undefined;
	targetType: keyof typeof PlaylistPlataformType;
	targetLink: string;
}

export interface UserSavedPlaylists {
	id: string;
	discordUserId: string;
	playlists: SavedPlaylist[];
	createdAt: string;
	updatedAt: string;
}
