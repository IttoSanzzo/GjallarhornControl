import { UserSavedPlaylists } from "../types/UserSavedPlaylist";
import { SessionCache } from "./core/SessionCache";

export const userSavedPlaylistsCache = new SessionCache<
	string,
	UserSavedPlaylists
>("user-saved-playlists", {
	ttlMs: 1000 * 60 * 10, // 10 minutes
});
