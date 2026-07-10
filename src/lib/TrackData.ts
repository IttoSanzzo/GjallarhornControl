"use server";

import { PlaylistPlataformType } from "./types/UserSavedPlaylist";

export interface TrackInfo {
	name: string;
	description: string;
	link: string;
	artworkUrl?: string;
}

export interface TrackCustomization {
	id: string;
	discordUserId: string;
	trackSource: keyof typeof PlaylistPlataformType;
	trackId: string;
	nickname: string;
	notes: string;
	createdAt: string;
	updatedAt: string;
}

export interface TrackCategory {
	id?: string;
	title: string;
	tracks: TrackInfo[];
	targetType?: keyof typeof PlaylistPlataformType;
	targetLink?: string;
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
