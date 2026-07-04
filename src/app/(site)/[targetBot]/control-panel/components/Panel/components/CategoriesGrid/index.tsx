import React, { useContext } from "react";
import { TrackCategory, TrackInfo } from "@/lib/TrackData";
import { ApiCommandsHandlerContext } from "../../../ControlPanelContextProvider";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";

const CategoriesGridContainer = newStyledElement.div(
	styles.categoriesGridContainer,
);
const CategoryContainer = newStyledElement.main(styles.categoryContainer);
const EntriesContainer = newStyledElement.div(styles.entriesContainer);
const EntryButton = newStyledElement.button(styles.entryButton);

interface CategoriesGridProps {
	categoriesData: TrackCategory[];
}
export const CategoriesGrid = React.memo(
	({ categoriesData }: CategoriesGridProps) => {
		const { postPlayCommand } = useContext(ApiCommandsHandlerContext);
		async function handlePlay(track: TrackInfo) {
			await postPlayCommand(track.link);
		}

		return (
			<CategoriesGridContainer id="categoriesGridContainer">
				{categoriesData.map((category, index) => (
					<CategoryContainer key={index}>
						<h2>{category.title}</h2>
						<EntriesContainer>
							{category.tracks.map((track, index) => (
								<EntryButton
									key={index}
									onClick={() => handlePlay(track)}
									title={track.description}>
									{track.name}
								</EntryButton>
							))}
						</EntriesContainer>
					</CategoryContainer>
				))}
			</CategoriesGridContainer>
		);
	},
);
