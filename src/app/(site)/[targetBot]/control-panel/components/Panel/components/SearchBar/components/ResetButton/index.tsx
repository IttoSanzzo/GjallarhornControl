import { ResetButtonContainer } from "./styledComponents";
import Image from "next/image";
import ResetIcon from "@/assets/CircularRemoveIcon.png";

interface ResetButtonProps {
	resetSearchQuery: () => void;
	disabled: boolean;
}

export default function ResetButton({
	disabled,
	resetSearchQuery,
}: ResetButtonProps) {
	return (
		<ResetButtonContainer
			disabled={disabled}
			onClick={resetSearchQuery}
			tabIndex={-1}>
			<Image
				src={ResetIcon}
				alt="Reset Search Button"
			/>
		</ResetButtonContainer>
	);
}
