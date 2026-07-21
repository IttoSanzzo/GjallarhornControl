"use client";

import { PlayButtonContainer } from "./styledComponents";
import Image from "next/image";
import PlayIcon from "@/assets/CircularPlayIcon.png";

interface PlayButtonProps {
	handlePlay: () => void;
	disabled: boolean;
}

export default function PlayButton({ disabled, handlePlay }: PlayButtonProps) {
	return (
		<PlayButtonContainer
			disabled={disabled}
			onClick={handlePlay}
			tabIndex={-1}>
			<Image
				src={PlayIcon}
				alt="Reset Search Button"
			/>
		</PlayButtonContainer>
	);
}
