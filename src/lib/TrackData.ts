"use server";

export interface TrackInfo {
	name: string;
	description: string;
	link: string;
	artworkUrl?: string;
}
export interface TrackCategory {
	title: string;
	tracks: TrackInfo[];
}
export interface FullTrackInfo {
	name: string;
	link: string;
	description: string;
	category: string;
}

export type SoundTrack = {
	name: string;
	trackUrl: string;
	description?: string;
	category: string;
	bots: string[];
	creatorKey: string;
	tags: string[];
};
