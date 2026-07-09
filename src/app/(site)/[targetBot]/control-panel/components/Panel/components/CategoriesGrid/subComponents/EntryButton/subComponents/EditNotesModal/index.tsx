import { Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import CSHeads from "@/../public/station_assets/CSHeads.png";
import Image from "next/image";
import { TrackCustomization, TrackInfo } from "@/lib/TrackData";
import { TrackCustomizationEditionForm } from "./subComponents/TrackCustomizationEditionForm";

const EditNotesModalOpenButton = newStyledElement.button(
	styles.editNotesModalOpenButton,
);

interface EditNotesModalProps {
	trackInfo: TrackInfo;
	trackCustomizationState: [
		TrackCustomization | null,
		Dispatch<SetStateAction<TrackCustomization | null>>,
	];
	discordId: string;
}
export function EditNotesModal({
	trackInfo,
	trackCustomizationState,
	discordId,
}: EditNotesModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<EditNotesModalOpenButton
				onClick={(event) => {
					event.preventDefault();
					setIsOpen(true);
				}}>
				<Image
					src={CSHeads}
					alt="Edit Notes"
					fill
				/>
			</EditNotesModalOpenButton>
			<Dialog.Root
				defaultOpen={false}
				open={isOpen}>
				<Dialog.Portal>
					<Dialog.Overlay
						className={styles.modalOverlay}
						onClick={() => setIsOpen(false)}
					/>
					<Dialog.Content className={styles.modalContent}>
						<h1 style={{ color: "var(--cl-yellow-600)", textAlign: "center" }}>
							{trackInfo.name}'s Customization
						</h1>
						<TrackCustomizationEditionForm
							discordId={discordId}
							trackCustomizationState={trackCustomizationState}
							trackInfo={trackInfo}
							setIsModalOpen={setIsOpen}
						/>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
