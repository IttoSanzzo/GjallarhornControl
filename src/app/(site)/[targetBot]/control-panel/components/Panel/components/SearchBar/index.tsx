import { useContext, useEffect, useRef } from "react";
import PlayButton from "./components/PlayButton";
import ResetButton from "./components/ResetButton";
import { ApiCommandsHandlerContext } from "../../../ControlPanelContextProvider";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";

export const SearchBarContainer = newStyledElement.div(
	styles.searchBarContainer,
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
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);
	const isLinkEmpty = value == "";
	const searchBarRef = useRef<HTMLInputElement | null>(null);

	function resetSearchQuery() {
		setSearchQuery("");
	}

	async function handlePlay() {
		await postPlayCommand(firstTrackLink != null ? firstTrackLink : value);
		resetSearchQuery();
	}

	useEffect(() => {
		function focusIntoSearchBar(event: KeyboardEvent) {
			if (!event.ctrlKey || event.key != "p" || !searchBarRef.current) return;
			event.preventDefault();
			searchBarRef.current.focus();
		}
		document.body.addEventListener("keydown", focusIntoSearchBar);
		return () =>
			document.body.removeEventListener("keydown", focusIntoSearchBar);
	}, [searchBarRef.current]);

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
					ref={searchBarRef}
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
