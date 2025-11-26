"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useContext, useEffect, useRef } from "react";
import { PlayerQueueContext } from "./subComponents/PlayerQueueContextProvider";
import { api } from "@/lib/axios";
import Image from "next/image";
import YoutubeIcon from "@/assets/YoutubeIcon.png";
import SpotifyIcon from "@/assets/SpotifyIcon.png";
import SoundcloudIcon from "@/assets/SoundCloudIcon.png";
import { getPlataformName, scrollChildIntoParentCenter } from "@/lib/utils";
import clsx from "clsx";

const QueueContainer = newStyledElement.div(styles.queueContainer);
const QueueTitle = newStyledElement.div(styles.queueTitle);
const NoTracksMessage = newStyledElement.p(styles.noTracksMessage);
const TracksList = newStyledElement.div(styles.tracksList);
const TrackEntry = newStyledElement.button(styles.trackEntry);
const QueueEnd = newStyledElement.div(styles.queueEnd);
const IndexIcon = newStyledElement.div(styles.indexIcon);
const PlataformIcon = newStyledElement.div(styles.plataformIcon);
const ArtworkPreview = newStyledElement.div(styles.artworkPreview);
const Title = newStyledElement.p(styles.title);

const plataformIcons = {
	youtube: YoutubeIcon,
	spotify: SpotifyIcon,
	soundcloud: SoundcloudIcon,
};

export interface QueueProps {
	withQueueTitle?: boolean;
	withEndMessage?: boolean;
	targetBot: string;
	userId?: string;
}
export default function Queue({
	targetBot,
	userId,
	withQueueTitle = false,
	withEndMessage = true,
}: QueueProps) {
	const queue = useContext(PlayerQueueContext);
	const currentTrackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!currentTrackRef.current || !currentTrackRef.current.parentElement)
			return;
		scrollChildIntoParentCenter(
			currentTrackRef.current.parentElement,
			currentTrackRef.current
		);
	}, [currentTrackRef.current]);

	async function handleClick(link: string) {
		if (!queue) return;
		try {
			api.post(`/${targetBot}/${queue.guildId}/play`, {
				userId,
				trackLink: link,
			});
		} catch {
			console.error("Exception");
		}
	}

	if (!queue)
		return (
			<QueueContainer>
				<QueueTitle>No Active Queue</QueueTitle>
			</QueueContainer>
		);
	return (
		<QueueContainer
			style={{ ...(!withQueueTitle && { paddingTop: "var(--sp-1)" }) }}>
			{withQueueTitle && <QueueTitle>{queue.guildName}</QueueTitle>}
			{queue.tracks.length == 0 ? (
				<NoTracksMessage>No Tracks Yet</NoTracksMessage>
			) : (
				<TracksList>
					{queue.tracks.map((track, index) => {
						const plataformName = getPlataformName(track.link);
						console.log(plataformName);

						return (
							<TrackEntry
								onClick={userId ? () => handleClick(track.link) : undefined}
								key={`${index}:${track.link}`}
								className={
									index == queue.currentIndex
										? clsx(
												styles.current,
												queue.isPaused ? styles.paused : undefined,
												queue.loopState == 1 ? styles.trackLoop : undefined,
												queue.loopState == 2 ? styles.queueLoop : undefined
										  )
										: undefined
								}
								ref={index == queue.currentIndex ? currentTrackRef : undefined}
								title={track.link}>
								<ArtworkPreview>
									<Image
										src={track.artwork}
										alt={"Track's artwork"}
										fill
									/>
								</ArtworkPreview>
								<IndexIcon>
									{index + 1}
									{plataformName && (
										<PlataformIcon>
											<Image
												src={plataformIcons[plataformName]}
												alt={""}
												fill
											/>
										</PlataformIcon>
									)}
								</IndexIcon>
								<Title>{track.title}</Title>
							</TrackEntry>
						);
					})}
					<QueueEnd>{withEndMessage && "End"}</QueueEnd>
				</TracksList>
			)}
		</QueueContainer>
	);
}
