"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useContext, useEffect, useRef } from "react";
import { PlayerQueueContext } from "../../../../../../components/PlayerQueueContextProvider";
import Image from "next/image";
import { getPlataformType, scrollChildIntoParentCenter } from "@/lib/utils";
import clsx from "clsx";
import toast from "react-hot-toast";
import { plataformIcons } from "@/lib/PlataformIcons";

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
			currentTrackRef.current,
		);
		scrollChildIntoParentCenter(
			currentTrackRef.current.parentElement,
			currentTrackRef.current,
		);
	}, [currentTrackRef.current]);
	useEffect(() => {
		setTimeout(() => {
			if (!currentTrackRef.current || !currentTrackRef.current.parentElement)
				return;
			scrollChildIntoParentCenter(
				currentTrackRef.current.parentElement,
				currentTrackRef.current,
			);
			scrollChildIntoParentCenter(
				currentTrackRef.current.parentElement,
				currentTrackRef.current,
			);
		}, 1500);
	}, []);

	async function handleClick(position: number) {
		if (!queue) return;
		const toastId = toast.loading("Play");
		try {
			const response = await fetch(
				`/api/${targetBot}/${queue.guildId}/action`,
				{
					method: "POST",
					body: JSON.stringify({
						userId,
						action: "Index",
						trackPosition: position,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			toast[response.ok ? "success" : "error"]("Play", {
				id: toastId,
			});
		} catch {
			console.error("Exception");
			toast.error(`Play Command Exception`, {
				id: toastId,
			});
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
						const plataformType = getPlataformType(track.link);

						return (
							<TrackEntry
								onClick={userId ? () => handleClick(index + 1) : undefined}
								key={`${index}:${track.link}`}
								className={
									index + 1 == queue.currentIndex
										? clsx(
												styles.current,
												queue.isPaused ? styles.paused : undefined,
												queue.loopState == 1 ? styles.trackLoop : undefined,
												queue.loopState == 2 ? styles.queueLoop : undefined,
											)
										: undefined
								}
								ref={
									index + 1 == queue.currentIndex ? currentTrackRef : undefined
								}
								title={`${track.title}\n\n${track.link}`}>
								<ArtworkPreview>
									<Image
										src={track.artwork}
										alt={"Track's artwork"}
										fill
									/>
								</ArtworkPreview>
								<IndexIcon>
									{index + 1}
									<PlataformIcon>
										<Image
											src={plataformIcons[plataformType]}
											alt={""}
											fill
										/>
									</PlataformIcon>
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
