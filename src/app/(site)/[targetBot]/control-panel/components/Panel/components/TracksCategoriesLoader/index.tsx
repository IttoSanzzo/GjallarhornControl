"use client";

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
			fetch(
				`${process.env.NEXT_PUBLIC_GJALLARHORNCONTROL_FULL_ADDRESS}/api/${targetBot}/soundtracks`,
				{
					method: "GET",
					next: {
						revalidate: 60 * 60 * 24, // 24 hours,
					},
				},
			).then(async (response) => {
				const { refinedData } = await response.json();
				setTrackCategories(refinedData);
			});
		} catch {
			setTrackCategories([]);
			alert("ChariotAPI is Offline");
		}
	}
	async function loadYoutubeCategories() {
		const response = await fetch(
			`/api/youtube/playlist/categories?playlistLink=${playslistMeta.targetLink}`,
			{
				method: "GET",
				next: {
					revalidate: 60 * 60 * 1, // 1 hours,
				},
			},
		);
		if (!response.ok) return;
		setTrackCategories([await response.json()]);
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
