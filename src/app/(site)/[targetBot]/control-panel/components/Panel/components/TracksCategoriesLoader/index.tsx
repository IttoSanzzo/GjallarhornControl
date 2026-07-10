"use client";

import {
	savedPlaylistCategorieArraysCache,
	savedPlaylistCategoriesCache,
} from "@/lib/cache/savedPlaylistCategoriesCache";
import { userSavedPlaylistsCache } from "@/lib/cache/userSavedPlaylistsCache";
import { TrackCategory } from "@/lib/TrackData";
import {
	SavedPlaylist,
	UserSavedPlaylists,
} from "@/lib/types/UserSavedPlaylist";
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
				(await savedPlaylistCategorieArraysCache.getOrLoad(
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
				)) ?? [],
			);
		} catch {
			alert("ChariotAPI is Offline");
			setTrackCategories([]);
		}
	}

	async function getOrLoadCustomGjallar(
		listId: string,
	): Promise<UserSavedPlaylists | null> {
		try {
			return await userSavedPlaylistsCache.getOrLoad(listId, async () => {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/lists/${listId}`,
					{
						method: "GET",
						next: {
							revalidate: 60 * 60 * 24, // 24 hours,
						},
					},
				);
				if (!response.ok) return null;
				return response.json();
			});
		} catch {
			alert("ChariotAPI is Offline");
			return null;
		}
	}

	async function getOrLoadCachedCategory(
		key: string,
		endpoint: string,
		categoryId?: string,
		categoryNickname?: string,
	): Promise<TrackCategory | null> {
		let category;
		try {
			category = await savedPlaylistCategoriesCache.getOrLoad(key, async () => {
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
			category = null;
		}
		return category
			? {
					...category,
					id: categoryId,
					title: categoryNickname ?? category.title,
				}
			: null;
	}
	async function getYoutubeCategory(
		link: string,
		categoryId?: string,
		categoryNickname?: string,
	): Promise<TrackCategory | null> {
		return await getOrLoadCachedCategory(
			link,
			`/api/youtube/playlist/categories?playlistLink=${link}`,
			categoryId,
			categoryNickname,
		);
	}
	async function getGjallarCategories(): Promise<TrackCategory[] | null> {
		const customGjallar = await getOrLoadCustomGjallar(
			playslistMeta.targetLink,
		);
		if (customGjallar == null) return null;
		const allPlaylists = customGjallar.playlists.map(async (playlist) => {
			console.log(playlist.nickname);
			if (playlist.targetType == "Youtube")
				return getYoutubeCategory(
					playlist.targetLink,
					playlist.id,
					playlist.nickname != "" ? playlist.nickname : undefined,
				);
			return null;
		});
		return (await Promise.all(allPlaylists)).filter(
			(playlist) => playlist != null,
		);
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
				case "Default": {
					await loadDefaultCategories();
					break;
				}
				case "Gjallar": {
					setTrackCategories((await getGjallarCategories()) ?? []);
					break;
				}
				case "Youtube": {
					const youtubeCategory = await getYoutubeCategory(
						playslistMeta.targetLink,
					);
					setTrackCategories(youtubeCategory ? [youtubeCategory] : []);
					break;
				}
			}
		}
		load();
	}, [playslistMeta]);
	return null;
}
