import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import Image from "next/image";
import YoutubeIcon from "@/assets/YoutubeIcon.png";
import { SearchedYoutubeTrack } from "@/lib/types/Youtube/SearchedYoutubeTrack";
import { useContext } from "react";
import { ApiCommandsHandlerContext } from "../../../../../ControlPanelContextProvider";

const YoutubeTrackButtonContainer = newStyledElement.button(
	styles.youtubeTrackButtonContainer,
);
const HoverEffect = newStyledElement.span(styles.hoverEffect);
const ArtworkContainer = newStyledElement.div(styles.artworkContainer);
const DurationSpan = newStyledElement.div(styles.durationSpan);
const VideoInfoContainer = newStyledElement.div(styles.videoInfoContainer);
const HeaderContainer = newStyledElement.div(styles.headerContainer);
const MiscContainer = newStyledElement.div(styles.miscContainer);
const ExternalVideoLink = newStyledElement.a(styles.externalVideoLink);

interface YoutubeTrackButtonProps {
	track: SearchedYoutubeTrack;
	resetModal: () => void;
}
export function YoutubeTrackButton({
	track,
	resetModal,
}: YoutubeTrackButtonProps) {
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);

	async function handleClick(event: React.MouseEvent) {
		await postPlayCommand(track.link);
		event.preventDefault();
		resetModal();
	}

	return (
		<YoutubeTrackButtonContainer
			type="button"
			onClick={handleClick}>
			<HoverEffect />
			<ArtworkContainer>
				<Image
					src={track.thumbnail}
					alt=""
					fill
				/>
				<DurationSpan>
					<p>{track.length}</p>
				</DurationSpan>
			</ArtworkContainer>
			<VideoInfoContainer>
				<HeaderContainer>
					<div>
						<Image
							src={track.channelThumbnail}
							alt=""
							fill
						/>
					</div>
					<p>{track.title}</p>
				</HeaderContainer>
				<MiscContainer>
					<a
						tabIndex={-1}
						onClick={(event) => {
							event.stopPropagation();
						}}
						href={track.channelUrl}
						target="_blank">
						{track.channelName}
					</a>
					<p>
						{track.viewCount} • {track.published}
					</p>
				</MiscContainer>
			</VideoInfoContainer>
			<ExternalVideoLink
				onClick={(event) => {
					event.stopPropagation();
				}}
				href={track.link}
				target="_blank"
				tabIndex={-1}>
				<Image
					src={YoutubeIcon}
					alt="Youtube video's link"
					fill
				/>
			</ExternalVideoLink>
		</YoutubeTrackButtonContainer>
	);
}
