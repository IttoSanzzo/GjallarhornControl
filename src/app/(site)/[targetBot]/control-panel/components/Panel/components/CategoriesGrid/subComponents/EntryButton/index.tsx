"use client";

import { TrackCategory, TrackInfo } from "@/lib/TrackData";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { Dispatch, SetStateAction, useContext } from "react";
import { ApiCommandsHandlerContext } from "../../../../../ControlPanelContextProvider";
import Image from "next/image";
import { EditNotesModal } from "./subComponents/EditNotesModal";

const EntryButtonContainer = newStyledElement.div(styles.entryButtonContainer);
const EntryButtonButton = newStyledElement.button(styles.entryButtonButton);
const ArtworkContainer = newStyledElement.div(styles.artworkContainer);
const FloatingArtworkContainer = newStyledElement.div(
	styles.floatingArtworkContainer,
);

interface EntryButtonProps {
	trackInfo: TrackInfo;
	discordUserId: string;
	setTrackCategories: Dispatch<SetStateAction<TrackCategory[]>>;
}
export function EntryButton({
	trackInfo,
	discordUserId,
	setTrackCategories,
}: EntryButtonProps) {
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);
	async function handlePlay(track: TrackInfo) {
		await postPlayCommand(track.link);
	}

	return (
		<EntryButtonContainer>
			<EditNotesModal
				trackInfo={trackInfo}
				setTrackCategories={setTrackCategories}
				discordId={discordUserId}
			/>
			<EntryButtonButton
				onClick={() => handlePlay(trackInfo)}
				title={`${trackInfo.name}${(trackInfo.trackCustomization?.notes ?? "" != "") ? `\n\n${trackInfo.trackCustomization!.notes}` : ""}${trackInfo.description != "" ? `\n\n${trackInfo.description}` : ""}\n\n${trackInfo.link}`}>
				{trackInfo.artworkUrl && (
					<>
						<ArtworkContainer>
							<Image
								src={trackInfo.artworkUrl}
								alt={`${trackInfo.name}`}
								fill
							/>
						</ArtworkContainer>
						<FloatingArtworkContainer>
							<Image
								src={trackInfo.artworkUrl}
								alt=""
								fill
							/>
						</FloatingArtworkContainer>
					</>
				)}
				{(trackInfo.trackCustomization?.nickname ?? "" != "")
					? trackInfo.trackCustomization!.nickname
					: trackInfo.name}
			</EntryButtonButton>
		</EntryButtonContainer>
	);
}
