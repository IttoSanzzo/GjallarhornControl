import { TrackCategory } from "@/lib/TrackData";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { EntryButton } from "./subComponents/EntryButton";
import React from "react";

const CategoriesGridContainer = newStyledElement.div(
	styles.categoriesGridContainer,
);
const CategoryContainer = newStyledElement.main(styles.categoryContainer);
const EntriesContainer = newStyledElement.div(styles.entriesContainer);

interface CategoriesGridProps {
	categoriesData: TrackCategory[];
}
export const CategoriesGrid = React.memo(
	({ categoriesData }: CategoriesGridProps) => {
		return (
			<CategoriesGridContainer id="categoriesGridContainer">
				{categoriesData.map((category, index) => (
					<CategoryContainer key={index}>
						<h2>{category.title}</h2>
						<EntriesContainer>
							{category.tracks.map((track, index) => (
								<EntryButton
									key={index}
									trackInfo={track}
								/>
							))}
						</EntriesContainer>
					</CategoryContainer>
				))}
			</CategoriesGridContainer>
		);
	},
);
