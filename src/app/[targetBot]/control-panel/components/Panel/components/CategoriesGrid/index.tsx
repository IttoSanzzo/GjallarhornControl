import {
	CategoriesGridContainer,
	CategoryContainer,
	EntriesContainer,
	EntryButton,
} from "./styledComponents";
import { api } from "@/lib/axios";
import React from "react";
import { TrackCategory, TrackInfo } from "@/lib/notionAPI";
import { QueryData } from "@/app/[targetBot]/control-panel/page";

interface CategoriesGridProps {
	queryData: QueryData;
	categoriesData: TrackCategory[];
}

export const CategoriesGrid = React.memo(
	({
		queryData: { channelId, targetBot, userId },
		categoriesData,
	}: CategoriesGridProps) => {
		function handlePlayEntryCall(track: TrackInfo) {
			api.post(`/${targetBot}/play`, {
				channelId,
				userId,
				link: track.link,
			});
		}

		return (
			<CategoriesGridContainer>
				{categoriesData.map((category, index) => (
					<CategoryContainer key={index}>
						<h2>{category.title}</h2>
						<EntriesContainer>
							{category.tracks.map((track, index) => (
								<EntryButton
									onClick={() => handlePlayEntryCall(track)}
									key={index}>
									{track.name}
								</EntryButton>
							))}
						</EntriesContainer>
					</CategoryContainer>
				))}
			</CategoriesGridContainer>
		);
	}
);
