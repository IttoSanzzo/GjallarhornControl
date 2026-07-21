import { Dispatch, SetStateAction, useState } from "react";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import CSHeads from "@/../public/station_assets/CSHeads.png";
import Image from "next/image";
import { TrackCategory, TrackInfo } from "@/lib/TrackData";
import { TrackCustomizationEditionForm } from "./subComponents/TrackCustomizationEditionForm";

const EditNotesModalOpenButton = newStyledElement.button(
	styles.editNotesModalOpenButton,
);

interface EditNotesModalProps {
	trackInfo: TrackInfo;
	setTrackCategories: Dispatch<SetStateAction<TrackCategory[]>>;
	discordId: string;
}
export function EditNotesModal({
	trackInfo,
	discordId,
	setTrackCategories,
}: EditNotesModalProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	return (
		<>
			<EditNotesModalOpenButton
				onClick={(event) => {
					event.preventDefault();
					setIsOpen(true);
				}}
				tabIndex={-1}>
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
							trackInfo={trackInfo}
							setIsModalOpen={setIsOpen}
							setTrackCategories={setTrackCategories}
						/>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</>
	);
}
