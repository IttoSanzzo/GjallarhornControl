"use client";

import { TrackCategory } from "@/lib/TrackData";
import { useContext, useEffect, useState } from "react";
import { CategoriesGrid } from "./components/CategoriesGrid";
import { Notification, NotificationData } from "@/components/Notification";
import { newNotification } from "@/lib/utils";
import { UserSessionData } from "../ControlPanelContextProvider";
import SearchBar from "./components/SearchBar";

export default function Panel() {
	const userSessionData = useContext(UserSessionData);
	const [trackCategories, setTrackCategories] = useState<TrackCategory[]>([]);
	const [refinedTrackCategories, setRefinedTrackCategories] = useState<
		TrackCategory[]
	>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [notificationData] = useState<NotificationData>(newNotification());

	function onSearchQueryChange(newQuery: string) {
		setSearchQuery(newQuery);
	}

	useEffect(() => {
		try {
			fetch(
				`${process.env.NEXT_PUBLIC_GJALLARHORNCONTROL_FULL_ADDRESS}/api/${userSessionData.targetBot}/soundtracks`,
				{
					method: "GET",
					next: {
						revalidate: 60 * 60 * 24, // 24 hours,
					},
				}
			).then(async (response) => {
				const { refinedData } = await response.json();
				setTrackCategories(refinedData);
			});
		} catch {
			setTrackCategories([]);
			alert("ChariotAPI is Offline");
		}
	}, []);

	useEffect(() => {
		if (searchQuery === "") setRefinedTrackCategories(trackCategories);
		const filteredData: TrackCategory[] = trackCategories
			.map((category) => ({
				...category,
				tracks: category.tracks.filter((track) =>
					track.name.toLowerCase().includes(searchQuery.toLowerCase())
				),
			}))
			.filter((category) => category.tracks.length > 0)
			.sort((a, b) => b.tracks.length - a.tracks.length);
		setRefinedTrackCategories(filteredData);
	}, [trackCategories, searchQuery]);

	return (
		<>
			<SearchBar
				setSearchQuery={onSearchQueryChange}
				value={searchQuery}
				firstTrackLink={refinedTrackCategories[0]?.tracks[0]?.link}
			/>
			<Notification data={notificationData} />
			<CategoriesGrid categoriesData={refinedTrackCategories} />
		</>
	);
}
