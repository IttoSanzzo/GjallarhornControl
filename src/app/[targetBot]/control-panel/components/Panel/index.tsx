"use client";

import { TrackCategory } from "@/lib/TrackData";
import { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import { CategoriesGrid } from "./components/CategoriesGrid";
import { QueryData } from "../../page";
import { Notification, NotificationData } from "@/components/Notification";
import { newNotification } from "@/lib/utils";

interface PanelProps {
	queryData: QueryData;
	refinedTracksData: TrackCategory[];
	isOffline: boolean;
}

export default function Panel({
	queryData,
	refinedTracksData,
	isOffline,
}: PanelProps) {
	const [notificationData, setNotificationData] = useState<NotificationData>(
		newNotification()
	);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [controlPanelData, setControlPanelData] = useState<TrackCategory[]>([]);
	function onSearchQueryChange(newQuery: string) {
		setSearchQuery(newQuery);
	}

	useMemo(() => {
		if (searchQuery === "") setControlPanelData(refinedTracksData);
		const filteredData: TrackCategory[] = refinedTracksData
			.map((category) => ({
				...category,
				tracks: category.tracks.filter((track) =>
					track.name.toLowerCase().includes(searchQuery.toLowerCase())
				),
			}))
			.filter((category) => category.tracks.length > 0)
			.sort((a, b) => b.tracks.length - a.tracks.length);
		setControlPanelData(filteredData);
	}, [searchQuery]);

	function onNotification(message: string, hasErrors: boolean) {
		setNotificationData(newNotification(message, hasErrors));
	}

	useEffect(() => {
		if (isOffline) alert("ChariotAPI is Offline");
	}, []);

	return (
		<>
			<Notification data={notificationData} />
			<SearchBar
				queryData={queryData}
				setSearchQuery={onSearchQueryChange}
				value={searchQuery}
				firstTrackLink={controlPanelData[0]?.tracks[0]?.link}
				setNotification={onNotification}
			/>
			<CategoriesGrid
				queryData={queryData}
				categoriesData={controlPanelData}
				setNotification={setNotificationData}
			/>
		</>
	);
}
