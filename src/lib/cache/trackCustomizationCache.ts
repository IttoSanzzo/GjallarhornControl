import { TrackCustomization } from "../TrackData";
import { SessionCache } from "./core/SessionCache";

export const trackCustomizationCache = new SessionCache<
	string,
	TrackCustomization
>("track-customization", {
	ttlMs: 1000 * 60 * 10, // 10 minutes
});
