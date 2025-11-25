"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useContext, useEffect, useRef } from "react";
import { PlayerQueueContext } from "./subComponents/PlayerQueueContextProvider";
import { api } from "@/lib/axios";
import Image from "next/image";

const QueueContainer = newStyledElement.div(styles.queueContainer);
const QueueTitle = newStyledElement.div(styles.queueTitle);
const NoTracksMessage = newStyledElement.p(styles.noTracksMessage);
const TracksList = newStyledElement.div(styles.tracksList);
const TrackEntry = newStyledElement.button(styles.trackEntry);
const QueueEnd = newStyledElement.div(styles.queueEnd);
const IndexIcon = newStyledElement.p(styles.indexIcon);
const ArtworkPreview = newStyledElement.div(styles.artworkPreview);
const Title = newStyledElement.p(styles.title);

export interface QueueProps {
	withQueueTitle?: boolean;
	targetBot: string;
	guildId: string;
	userId?: string;
}
export default function Queue({
	guildId,
	targetBot,
	userId,
	withQueueTitle = false,
}: QueueProps) {
	const queue = useContext(PlayerQueueContext);
	const currentTrackRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		currentTrackRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "center",
		});
	}, [currentTrackRef.current]);

	async function handleClick(link: string) {
		try {
			api.post(`/${targetBot}/${guildId}/play`, {
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
					{queue.tracks.map((track, index) => (
						<TrackEntry
							onClick={userId ? () => handleClick(track.link) : undefined}
							key={track.link}
							className={
								index == queue.currentIndex ? styles.current : undefined
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
							<IndexIcon
								className={
									index == queue.currentIndex ? styles.current : undefined
								}>
								{index + 1}
							</IndexIcon>
							<Title>{track.title}</Title>
						</TrackEntry>
					))}
					<QueueEnd>End</QueueEnd>
				</TracksList>
			)}
		</QueueContainer>
	);
}
