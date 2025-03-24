"use client";

import { PlayButtonContainer } from "./styledComponents";
import Image from "next/image";
import PlayIcon from "@/assets/CircularPlayIcon.png";
import { useSearchParams } from "next/navigation";
import { QueryData } from "@/app/[targetBot]/control-panel/page";

interface PlayButtonProps {
	handlePlay: () => void;
	disabled: boolean;
}

export default function PlayButton({ disabled, handlePlay }: PlayButtonProps) {
	const params = useSearchParams();

	return (
		<PlayButtonContainer
			disabled={disabled}
			onClick={handlePlay}>
			<Image
				src={PlayIcon}
				alt="Reset Search Button"
			/>
		</PlayButtonContainer>
	);
}
