"use client";

import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import YoutubeIcon from "@/assets/YoutubeIcon.png";
import { useEffect, useState } from "react";
import { YoutubeSearchEngine } from "./YoutubeSearchEngine";

const YoutubeSearchModalButtonContainer = newStyledElement.div(
	styles.youtubeSearchModalButtonContainer,
);

export function YoutubeSearchModalButton() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		function handleShortcut(event: KeyboardEvent) {
			if (!isOpen && event.ctrlKey && event.shiftKey && event.key == "Y") {
				event.preventDefault();
				setIsOpen(true);
			} else if (isOpen && event.key == "Escape") {
				event.preventDefault();
				setIsOpen(false);
			}
		}
		document.addEventListener("keydown", handleShortcut);
		return () => document.removeEventListener("keydown", handleShortcut);
	}, [isOpen]);

	return (
		<YoutubeSearchModalButtonContainer>
			<Dialog.Root open={isOpen}>
				<Dialog.Trigger
					onClick={() => setIsOpen(true)}
					tabIndex={-1}>
					<Image
						src={YoutubeIcon}
						alt=""
						height={30}
						width={30}
					/>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay
						className={styles.modalOverlay}
						onClick={() => setIsOpen(false)}
					/>
					<Dialog.Content className={styles.modalContent}>
						<YoutubeSearchEngine setIsOpen={setIsOpen} />
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</YoutubeSearchModalButtonContainer>
	);
}
