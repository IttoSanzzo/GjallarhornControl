import { SearchBarContainer } from "./styledComponents";

interface SearchBarProps {
	setSearchQuery: (newQuery: string) => void;
	value: string;
}

export default function SearchBar({ setSearchQuery, value }: SearchBarProps) {
	return (
		<SearchBarContainer>
			<input
				type="text"
				placeholder="Search"
				defaultValue={value}
				onChange={(value) => setSearchQuery(String(value))}></input>
		</SearchBarContainer>
	);
}
