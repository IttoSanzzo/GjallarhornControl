import { useContext } from "react";
import PlayButton from "./components/PlayButton";
import ResetButton from "./components/ResetButton";
import { ApiCommandsHandler } from "../../../ControlPanelContextProvider";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";

export const SearchBarContainer = newStyledElement.div(
	styles.searchBarContainer
);

interface SearchBarProps {
	setSearchQuery: (newQuery: string) => void;
	value: string;
	firstTrackLink: string | null;
}
export default function SearchBar({
	setSearchQuery,
	value,
	firstTrackLink,
}: SearchBarProps) {
	const { postPlayCommand } = useContext(ApiCommandsHandler);
	const isLinkEmpty = value == "";
	function resetSearchQuery() {
		setSearchQuery("");
	}

	async function handlePlay() {
		await postPlayCommand(firstTrackLink != null ? firstTrackLink : value);
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
