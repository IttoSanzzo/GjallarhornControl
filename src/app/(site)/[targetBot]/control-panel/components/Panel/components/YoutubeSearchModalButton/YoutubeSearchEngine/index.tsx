"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { YoutubeTrackButton } from "./YoutubeTrackButton";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { SearchedYoutubeTrack } from "@/lib/types/Youtube/SearchedYoutubeTrack";

const YoutubeSearchEngineContainer = newStyledElement.div(
	styles.youtubeSearchEngineContainer,
);
const FormContainer = newStyledElement.div(styles.formContainer);
const QueriedTracksContainer = newStyledElement.div(
	styles.queriedTracksContainer,
);

const schema = z.object({
	query: z.string(),
});

type FormData = z.infer<typeof schema>;

interface YoutubeSearchEngineProps {
	setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export function YoutubeSearchEngine({ setIsOpen }: YoutubeSearchEngineProps) {
	const [tracks, setTracks] = useState<SearchedYoutubeTrack[]>([]);
	const abortController = useRef<AbortController | null>(null);

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			query: "",
		},
	});
	const query = form.watch("query");

	useEffect(() => {
		const trimmed = query.trim();
		if (trimmed.length < 3) {
			setTracks([]);
			return;
		}

		if (trimmed === "") {
			abortController.current?.abort();
			setTracks([]);
			return;
		}

		const timeout = setTimeout(async () => {
			abortController.current?.abort();
			const controller = new AbortController();
			abortController.current = controller;
			try {
				const response = await fetch(
					`/api/youtube/search/videos?query=${encodeURIComponent(trimmed)}`,
					{
						signal: controller.signal,
					},
				);
				if (!response.ok) {
					setTracks([]);
					return;
				}
				const tracks: SearchedYoutubeTrack[] = await response.json();
				setTracks(tracks);
			} catch (err) {
				if (!(err instanceof DOMException && err.name === "AbortError")) {
					console.error(err);
				}
			}
		}, 250);

		return () => clearTimeout(timeout);
	}, [query]);

	function resetModal() {
		setIsOpen(false);
		setTracks([]);
		form.reset();
	}

	return (
		<YoutubeSearchEngineContainer>
			<FormContainer>
				<form onSubmit={form.handleSubmit(() => {})}>
					<input
						{...form.register("query")}
						placeholder="Search"
						autoFocus
					/>
				</form>
			</FormContainer>
			<QueriedTracksContainer tabIndex={-1}>
				{tracks.map((track) => (
					<YoutubeTrackButton
						key={track.link}
						track={track}
						resetModal={resetModal}
					/>
				))}
			</QueriedTracksContainer>
		</YoutubeSearchEngineContainer>
	);
}
