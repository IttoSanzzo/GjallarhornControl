import {
	CategoriesGridContainer,
	CategoryContainer,
	EntriesContainer,
	EntryButton,
} from "./styledComponents";

interface TrackInfo {
	name: string;
	description: string;
	link: string;
}

export interface TrackCategory {
	title: string;
	tracks: TrackInfo[];
}

interface CategoriesGridProps {
	categoriesData: TrackCategory[];
}

export default function CategoriesGrid({
	categoriesData,
}: CategoriesGridProps) {
	return (
		<CategoriesGridContainer>
			{categoriesData.map((category, index) => (
				<CategoryContainer key={index}>
					<h2>{category.title}</h2>
					<EntriesContainer>
						{category.tracks.map((track, index) => (
							<EntryButton key={index}>{track.name}</EntryButton>
						))}
					</EntriesContainer>
				</CategoryContainer>
			))}
		</CategoriesGridContainer>
	);
}
