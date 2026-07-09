"use client";

import { TrackCustomization, TrackInfo } from "@/lib/TrackData";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { useContext, useLayoutEffect, useState } from "react";
import { ApiCommandsHandlerContext } from "../../../../../ControlPanelContextProvider";
import Image from "next/image";
import { trackCustomizationCache } from "@/lib/cache/trackCustomizationCache";
import { EditNotesModal } from "./subComponents/EditNotesModal";

const EntryButtonContainer = newStyledElement.div(styles.entryButtonContainer);
const EntryButtonButton = newStyledElement.button(styles.entryButtonButton);
const ArtworkContainer = newStyledElement.div(styles.artworkContainer);

interface EntryButtonProps {
	trackInfo: TrackInfo;
	discordUserId: string;
}
export function EntryButton({ trackInfo, discordUserId }: EntryButtonProps) {
	const trackCustomizationState = useState<TrackCustomization | null>(null);
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);
	async function handlePlay(track: TrackInfo) {
		await postPlayCommand(track.link);
	}

	useLayoutEffect(() => {
		async function loadCustomization() {
			trackCustomizationState[1](
				await trackCustomizationCache.getOrLoad(trackInfo.link, async () => {
					try {
						const response = await fetch(
							`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/track-customization/${encodeURIComponent(trackInfo.link)}?discordUserId=${discordUserId}`,
							{
								method: "GET",
								next: {
									revalidate: 60 * 60 * 1, // 1 hours,
								},
							},
						);
						if (response.ok) return await response.json();
					} catch {
						return null;
					}
					return null;
				}),
			);
		}
		loadCustomization();
	}, [trackInfo.link]);

	return (
		<EntryButtonContainer>
			<EditNotesModal
				trackInfo={trackInfo}
				trackCustomizationState={trackCustomizationState}
				discordId={discordUserId}
			/>
			<EntryButtonButton
				onClick={() => handlePlay(trackInfo)}
				title={`${trackInfo.name}${(trackCustomizationState[0]?.notes ?? "" != "") ? `\n\n${trackCustomizationState[0]!.notes}` : ""}${trackInfo.description != "" ? `\n\n${trackInfo.description}` : ""}\n\n${trackInfo.link}`}>
				{trackInfo.artworkUrl && (
					<ArtworkContainer>
						<Image
							src={trackInfo.artworkUrl}
							alt={`${trackInfo.name}`}
							fill
						/>
					</ArtworkContainer>
				)}
				{(trackCustomizationState[0]?.nickname ?? "" != "")
					? trackCustomizationState[0]!.nickname
					: trackInfo.name}
			</EntryButtonButton>
		</EntryButtonContainer>
	);
}
