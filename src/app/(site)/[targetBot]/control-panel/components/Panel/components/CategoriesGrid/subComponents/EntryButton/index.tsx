import { TrackInfo } from "@/lib/TrackData";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { useContext } from "react";
import { ApiCommandsHandlerContext } from "../../../../../ControlPanelContextProvider";
import Image from "next/image";
// import CSHeads from "@/../public/station_assets/CSHeads.png";

const EntryButtonContainer = newStyledElement.div(styles.entryButtonContainer);
const EntryButtonButton = newStyledElement.button(styles.entryButtonButton);
const ArtworkContainer = newStyledElement.div(styles.artworkContainer);
// const EditNoteModal = newStyledElement.div(styles.editNoteModal);

interface EntryButtonProps {
	trackInfo: TrackInfo;
}
export function EntryButton({ trackInfo }: EntryButtonProps) {
	const { postPlayCommand } = useContext(ApiCommandsHandlerContext);
	async function handlePlay(track: TrackInfo) {
		await postPlayCommand(track.link);
	}

	return (
		<EntryButtonContainer>
			{/* {true && (
				<EditNoteModal>
					<Image
						src={CSHeads}
						alt="Edit Notes"
						fill
					/>
				</EditNoteModal>
			)} */}
			<EntryButtonButton
				onClick={() => handlePlay(trackInfo)}
				title={`${trackInfo.name}\n\n${trackInfo.description}`}>
				{trackInfo.artworkUrl && (
					<ArtworkContainer>
						<Image
							src={trackInfo.artworkUrl}
							alt={`${trackInfo.name}`}
							fill
						/>
					</ArtworkContainer>
				)}
				{trackInfo.name}
			</EntryButtonButton>
		</EntryButtonContainer>
	);
}
