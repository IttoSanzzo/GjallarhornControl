"use client";

import { PlayButtonContainer } from "./styledComponents";
import Image from "next/image";
import PlayIcon from "@/assets/CircularPlayIcon.png";
import { api } from "@/lib/axios";
import { useSearchParams } from "next/navigation";
import { QueryData } from "@/app/[targetBot]/control-panel/page";

interface PlayButtonProps {
	queryData: QueryData;
	link: string;
	resetLink: () => void;
}

export default function PlayButton({
	queryData: { channelId, targetBot, userId },
	link,
	resetLink,
}: PlayButtonProps) {
	const params = useSearchParams();
	const isLinkEmpty = link == "";

	function handlePlayButton() {
		api.post(`/${targetBot}/play`, {
			channelId,
			userId,
			link,
		});
		resetLink();
	}

	return (
		<>
			{!isLinkEmpty && (
				<PlayButtonContainer onClick={handlePlayButton}>
					<Image
						src={PlayIcon}
						alt="Reset Search Button"
					/>
				</PlayButtonContainer>
			)}
		</>
	);
}
