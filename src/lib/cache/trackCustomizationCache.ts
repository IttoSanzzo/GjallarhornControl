import { SessionCache } from "./core/SessionCache";

export const trackCustomizationCache = new SessionCache("track-customization", {
	ttlMs: 1000 * 60 * 10, // 10 minutes
});
