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
	setNotification: (message: string, hasErrors: boolean) => void;
}

export default function SearchBar({
	queryData: { channelId, targetBot, userId },
	setSearchQuery,
	value,
	firstTrackLink,
	setNotification,
}: SearchBarProps) {
	const isLinkEmpty = value == "";
	function resetSearchQuery() {
		setSearchQuery("");
	}

	function handlePlay() {
		const link = !!firstTrackLink ? firstTrackLink : value;
		const response = api.post(`/${targetBot}/play`, {
			channelId,
			userId,
			link,
		});
		resetSearchQuery();
		response.catch(() => {
			setNotification(
				`Failed playing. ( ${targetBot} is probably offline )`,
				true
			);
			return;
		});
		setNotification(`Played successfully`, false);
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
