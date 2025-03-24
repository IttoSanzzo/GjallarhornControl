import { ResetButtonContainer } from "./styledComponents";
import Image from "next/image";
import ResetIcon from "@/assets/CircularRemoveIcon.png";

interface ResetButtonProps {
	searchQuery: string;
	resetSearchQuery: () => void;
}

export default function ResetButton({
	searchQuery,
	resetSearchQuery,
}: ResetButtonProps) {
	const isSearchQueryEmpry = searchQuery == "";
	return (
		<>
			{!isSearchQueryEmpry && (
				<ResetButtonContainer onClick={resetSearchQuery}>
					<Image
						src={ResetIcon}
						alt="Reset Search Button"
					/>
				</ResetButtonContainer>
			)}
		</>
	);
}
