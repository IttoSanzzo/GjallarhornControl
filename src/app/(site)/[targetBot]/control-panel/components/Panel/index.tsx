"use client";

import { TrackCategory } from "@/lib/TrackData";
import { useContext, useEffect, useState } from "react";
import { CategoriesGrid } from "./components/CategoriesGrid";
import { Notification, NotificationData } from "@/components/Notification";
import { newNotification } from "@/lib/utils";
import { UserSessionDataContext } from "../ControlPanelContextProvider";
import SearchBar from "./components/SearchBar";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { TracksLoader } from "./components/TracksCategoriesLoader";
import { ActivePlaylistSelector } from "./components/ActivePlaylistSelector";
import { SavedPlaylist } from "@/lib/types/UserSavedPlaylist";

const PanelContainer = newStyledElement.div(styles.panelContainer);

export default function Panel() {
	const userSessionData = useContext(UserSessionDataContext);
	const [trackCategories, setTrackCategories] = useState<TrackCategory[]>([]);
	const [refinedTrackCategories, setRefinedTrackCategories] = useState<
		TrackCategory[]
	>([]);
	const activeSavedPlaylistState = useState<SavedPlaylist>({
		id: "",
		nickname: "",
		targetLink: "",
		targetType: "Default",
	});
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [notificationData] = useState<NotificationData>(newNotification());

	function onSearchQueryChange(newQuery: string) {
		setSearchQuery(newQuery);
	}

	useEffect(() => {
		if (searchQuery === "") setRefinedTrackCategories(trackCategories);
		const filteredData: TrackCategory[] = (trackCategories ?? [])
			.map((category) => ({
				...category,
				tracks: category.tracks.filter((track) =>
					track.name.toLowerCase().includes(searchQuery.toLowerCase()),
				),
			}))
			.filter((category) => category.tracks.length > 0)
			.sort((a, b) => b.tracks.length - a.tracks.length);
		setRefinedTrackCategories(filteredData);
	}, [trackCategories, searchQuery]);

	return (
		<PanelContainer>
			<ActivePlaylistSelector
				activeSavedPlaylistState={activeSavedPlaylistState}
				discordId={userSessionData.userId}
			/>
			<TracksLoader
				playslistMeta={activeSavedPlaylistState[0]}
				targetBot={userSessionData.targetBot}
				setTrackCategories={setTrackCategories}
			/>
			<SearchBar
				setSearchQuery={onSearchQueryChange}
				value={searchQuery}
				firstTrackLink={refinedTrackCategories[0]?.tracks[0]?.link}
			/>
			<Notification data={notificationData} />
			<CategoriesGrid
				categoriesData={refinedTrackCategories}
				discordUserId={userSessionData.userId}
			/>
		</PanelContainer>
	);
}
