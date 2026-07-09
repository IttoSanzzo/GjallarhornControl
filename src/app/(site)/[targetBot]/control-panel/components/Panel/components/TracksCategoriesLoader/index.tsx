"use client";

import {
	savedPlaylistCategorieArraysCache,
	savedPlaylistCategoriesCache,
} from "@/lib/cache/savedPlaylistCategoriesCache";
import { TrackCategory } from "@/lib/TrackData";
import { SavedPlaylist } from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction, useEffect } from "react";

interface TracksLoaderProps {
	playslistMeta: SavedPlaylist;
	targetBot: string;
	setTrackCategories: Dispatch<SetStateAction<TrackCategory[]>>;
}
export function TracksLoader({
	playslistMeta,
	targetBot,
	setTrackCategories,
}: TracksLoaderProps) {
	async function loadDefaultCategories() {
		try {
			setTrackCategories(
				await savedPlaylistCategorieArraysCache.getOrLoad(
					`Default:${targetBot}`,
					async () => {
						const response = await fetch(
							`${process.env.NEXT_PUBLIC_GJALLARHORNCONTROL_FULL_ADDRESS}/api/${targetBot}/soundtracks`,
							{
								method: "GET",
								next: {
									revalidate: 60 * 60 * 24, // 24 hours,
								},
							},
						);
						const { refinedData } = await response.json();
						return refinedData;
					},
				),
			);
		} catch {
			setTrackCategories([]);
			alert("ChariotAPI is Offline");
		}
	}

	async function getOrLoadCachedCategory(key: string, endpoint: string) {
		try {
			return await savedPlaylistCategoriesCache.getOrLoad(key, async () => {
				const response = await fetch(endpoint, {
					method: "GET",
					next: {
						revalidate: 60 * 60 * 1, // 1 hours,
					},
				});
				if (!response.ok) return;
				return await response.json();
			});
		} catch {
			setTrackCategories([]);
		}
	}
	async function loadYoutubeCategories() {
		const category = await getOrLoadCachedCategory(
			playslistMeta.targetLink,
			`/api/youtube/playlist/categories?playlistLink=${playslistMeta.targetLink}`,
		);
		setTrackCategories(category ? [category] : []);
	}

	useEffect(() => {
		async function load() {
			if (!playslistMeta) return;
			if (
				playslistMeta.targetType != "Default" &&
				playslistMeta.targetLink == ""
			)
				playslistMeta.targetType = "Default";
			switch (playslistMeta.targetType) {
				case "Default":
					await loadDefaultCategories();
					break;
				case "Youtube":
					await loadYoutubeCategories();
					break;
			}
		}
		load();
	}, [playslistMeta]);
	return null;
}
