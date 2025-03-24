import { Suspense } from "react";
import PlayButton from "./components/PlayButton";
import ResetButton from "./components/ResetButton";
import { SearchBarContainer } from "./styledComponents";
import { QueryData } from "@/app/[targetBot]/control-panel/page";
import { api } from "@/lib/axios";
import { TrackInfo } from "@/lib/notionAPI";

interface SearchBarProps {
	queryData: QueryData;
	setSearchQuery: (newQuery: string) => void;
	value: string;
	firstTrackLink: string | null;
}

export default function SearchBar({
	queryData: { channelId, targetBot, userId },
	setSearchQuery,
	value,
	firstTrackLink,
}: SearchBarProps) {
	const isLinkEmpty = value == "";
	function resetSearchQuery() {
		setSearchQuery("");
	}

	function handlePlay() {
		if (!!firstTrackLink)
			api.post(`/${targetBot}/play`, {
				channelId,
				userId,
				link: firstTrackLink,
			});
		else
			api.post(`/${targetBot}/play`, {
				channelId,
				userId,
				link: value,
			});
		resetSearchQuery();
	}

	return (
		<SearchBarContainer>
			<form
				onSubmit={(event) => {
					event.preventDefault();
					handlePlay();
				}}>
				<input
					type="text"
					placeholder="Search"
					value={value}
					onChange={(event) => setSearchQuery(event.target.value)}
				/>
			</form>
			<ResetButton
				disabled={isLinkEmpty}
				resetSearchQuery={resetSearchQuery}
			/>
			<PlayButton
				disabled={isLinkEmpty}
				handlePlay={handlePlay}
			/>
		</SearchBarContainer>
	);
}
