"use client";

import { TrackCategory } from "@/lib/TrackData";
import { useContext, useEffect, useState } from "react";
import { CategoriesGrid } from "./components/CategoriesGrid";
import { UserSessionDataContext } from "../ControlPanelContextProvider";
import SearchBar from "./components/SearchBar";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { TracksLoader } from "./components/TracksCategoriesLoader";
import { ActivePlaylistSelector } from "./components/ActivePlaylistSelector";
import { SavedPlaylist } from "@/lib/types/UserSavedPlaylist";
import { normalizeDiacriticText } from "@/lib/utils";

const PanelContainer = newStyledElement.div(styles.panelContainer);

export default function Panel() {
	const userSessionData = useContext(UserSessionDataContext);
	const trackCategoriesState = useState<TrackCategory[]>([]);
	const [refinedTrackCategories, setRefinedTrackCategories] = useState<
		TrackCategory[]
	>([]);
	const activeSavedPlaylistState = useState<SavedPlaylist>({
		id: "",
		nickname: "",
		targetLink: "",
		targetType: "Unknown",
	});
	const [searchQuery, setSearchQuery] = useState<string>("");

	function onSearchQueryChange(newQuery: string) {
		setSearchQuery(newQuery);
	}

	useEffect(() => {
		if (searchQuery === "") {
			setRefinedTrackCategories(trackCategoriesState[0]);
			return;
		}
		const normalizedSearchQuery = normalizeDiacriticText(searchQuery);
		const filteredData: TrackCategory[] = (trackCategoriesState[0] ?? [])
			.map((category) => ({
				...category,
				tracks: category.tracks.filter(
					(track) =>
						normalizeDiacriticText(track.name).includes(
							normalizedSearchQuery,
						) ||
						normalizeDiacriticText(track.description).includes(
							normalizedSearchQuery,
						) ||
						normalizeDiacriticText(
							track.trackCustomization?.nickname ?? "",
						).includes(normalizedSearchQuery) ||
						normalizeDiacriticText(
							track.trackCustomization?.notes ?? "",
						).includes(normalizedSearchQuery),
				),
			}))
			.filter((category) => category.tracks.length > 0)
			.sort((a, b) => b.tracks.length - a.tracks.length);
		setRefinedTrackCategories(filteredData);
	}, [trackCategoriesState[0], searchQuery]);

	return (
		<PanelContainer>
			<ActivePlaylistSelector
				activeSavedPlaylistState={activeSavedPlaylistState}
				discordId={userSessionData.userId}
				targetBot={userSessionData.targetBot}
			/>
			<TracksLoader
				playslistMeta={activeSavedPlaylistState[0]}
				targetBot={userSessionData.targetBot}
				setTrackCategories={trackCategoriesState[1]}
				discordUserId={userSessionData.userId}
			/>
			<SearchBar
				setSearchQuery={onSearchQueryChange}
				value={searchQuery}
				firstTrackLink={refinedTrackCategories[0]?.tracks[0]?.link}
			/>
			<CategoriesGrid
				categoriesData={refinedTrackCategories}
				setTrackCategories={trackCategoriesState[1]}
				activeSavedPlaylistState={activeSavedPlaylistState}
				type={activeSavedPlaylistState[0]?.targetType ?? "Unknown"}
				discordUserId={userSessionData.userId}
			/>
		</PanelContainer>
	);
}
