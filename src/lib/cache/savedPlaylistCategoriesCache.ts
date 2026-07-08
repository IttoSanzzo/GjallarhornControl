import { TrackCategory } from "../TrackData";
import { SessionCache } from "./core/SessionCache";

export const savedPlaylistCategoriesCache = new SessionCache<
	string,
	TrackCategory
>("saved-playlist-categories", {
	ttlMs: 1000 * 60 * 10, // 10 minutes
});

export const savedPlaylistCategorieArraysCache = new SessionCache<
	string,
	TrackCategory[]
>("saved-playlist-categorie-arrays", {
	ttlMs: 1000 * 60 * 10, // 10 minutes
});
