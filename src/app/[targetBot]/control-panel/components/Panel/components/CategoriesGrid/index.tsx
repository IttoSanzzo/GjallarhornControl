import {
	CategoriesGridContainer,
	CategoryContainer,
	EntriesContainer,
	EntryButton,
} from "./styledComponents";
import { api } from "@/lib/axios";
import React from "react";
import { TrackCategory, TrackInfo } from "@/lib/TrackData";
import { QueryData } from "@/app/[targetBot]/control-panel/page";
import { newNotification } from "@/lib/utils";
import { NotificationData } from "@/components/Notification";

interface CategoriesGridProps {
	queryData: QueryData;
	categoriesData: TrackCategory[];
	setNotification: (notificationData: NotificationData) => void;
}

export const CategoriesGrid = React.memo(
	({
		queryData: { channelId, targetBot, userId },
		categoriesData,
		setNotification,
	}: CategoriesGridProps) => {
		function handlePlayEntryCall(track: TrackInfo) {
			const response = api.post(`/${targetBot}/play`, {
				channelId,
				userId,
				link: track.link,
			});
			response.catch(() => {
				setNotification(
					newNotification(
						`Failed playing ${track.name}. ( ${targetBot} is probably offline )`,
						true
					)
				);
				return;
			});
			setNotification(
				newNotification(`Played 「 ${track.name} 」 succesfully.`, false)
			);
		}

		return (
			<CategoriesGridContainer>
				{categoriesData.map((category, index) => (
					<CategoryContainer key={index}>
						<h2>{category.title}</h2>
						<EntriesContainer>
							{category.tracks.map((track, index) => (
								<EntryButton
									key={index}
									onClick={() => handlePlayEntryCall(track)}
									title={track.description}>
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
