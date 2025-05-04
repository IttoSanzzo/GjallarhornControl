"use client";

import { TrackCategory } from "@/lib/TrackData";
import { useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import { CategoriesGrid } from "./components/CategoriesGrid";
import { QueryData } from "../../page";
import { Notification, NotificationData } from "@/components/Notification";
import { newNotification } from "@/lib/utils";

interface PanelProps {
	queryData: QueryData;
	refinedTracksData: TrackCategory[];
}

const mockDataOld: TrackCategory[] = [
	{
		title: "Magic SFX",
		tracks: [
			{
				name: "Magic Sound Effects",
				description: "",
				link: "https://www.youtube.com/watch?v=PtOzGiNKSUA&list=RDGMEMhCgTQvcskbGUxqI4Sn2QYw&start_radio=1&rv=yvmegySOZIM",
			},
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
];

export default function Panel({ queryData, refinedTracksData }: PanelProps) {
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
