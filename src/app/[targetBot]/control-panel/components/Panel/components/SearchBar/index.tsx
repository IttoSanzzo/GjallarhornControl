import { Suspense } from "react";
import PlayButton from "./components/PlayButton";
import ResetButton from "./components/ResetButton";
import { SearchBarContainer } from "./styledComponents";
import { QueryData } from "@/app/[targetBot]/control-panel/page";

interface SearchBarProps {
	queryData: QueryData;
	setSearchQuery: (newQuery: string) => void;
	value: string;
}

export default function SearchBar({
	queryData,
	setSearchQuery,
	value,
}: SearchBarProps) {
	function resetSearchQuery() {
		setSearchQuery("");
	}

	return (
		<SearchBarContainer>
			<input
				type="text"
				placeholder="Search"
				defaultValue={value}
				onChange={(event) => setSearchQuery(event.target.value)}
			/>
			<ResetButton
				searchQuery={value}
				resetSearchQuery={resetSearchQuery}
			/>
			<Suspense>
				<PlayButton
					queryData={queryData}
					link={value}
					resetLink={resetSearchQuery}
				/>
			</Suspense>
		</SearchBarContainer>
	);
}
