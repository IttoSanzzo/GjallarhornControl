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

export function inferPlaylistPlataformType(
	link: string,
): "Youtube" | "Soundcloud" | "Spotify" | null {
	link = link.trim();

	if (/^https:\/\/(?:www\.)?youtube\.com\/playlist\?list=/i.test(link))
		return "Youtube";

	if (/^https:\/\/(?:www\.)?soundcloud\.com\/[^/]+\/sets\/[^/?]+/i.test(link))
		return "Soundcloud";

	if (/^https:\/\/open\.spotify\.com\/playlist\/[A-Za-z0-9]+/i.test(link))
		return "Spotify";

	return null;
}
