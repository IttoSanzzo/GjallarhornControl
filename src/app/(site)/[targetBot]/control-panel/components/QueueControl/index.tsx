"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import Image from "next/image";
import QueueIcon from "@/assets/CircularQueueIcon.png";
import { PlayerQueueContextProvider } from "@/app/(site)/embeds/[targetBot]/[guildId]/queue/subComponents/PlayerQueueContextProvider";
import { useContext, useLayoutEffect, useState } from "react";
import { UserSessionDataContext } from "../ControlPanelContextProvider";
import Queue from "@/app/(site)/embeds/[targetBot]/[guildId]/queue/pageContent";

const QueueControlButton = newStyledElement.button(styles.queueControlButton);
const QueueContainer = newStyledElement.div(styles.queueContainer);

function getOpenStateInStorage(): boolean {
	return localStorage.getItem("queueBarOpenState") == "true";
}
function setOpenStateInStorage(state: boolean): void {
	localStorage.setItem("queueBarOpenState", state ? "true" : "false");
}

export function QueueControl() {
	const userSessionData = useContext(UserSessionDataContext);
	const [openState, setOpenState] = useState<boolean | null>(null);

	useLayoutEffect(() => {
		const storageState = getOpenStateInStorage();
		if (storageState) setOpenState(true);
	}, []);
	useLayoutEffect(() => {
		if (openState == null) return;
		const categoriesGridContainerElement = document.getElementById(
			"categoriesGridContainer"
		);
		if (categoriesGridContainerElement == null) return;
		if (openState == true && window.innerWidth > 680)
			categoriesGridContainerElement.style.paddingRight = "var(--sp-4)";
		else categoriesGridContainerElement.style.paddingRight = "var(--sp-8)";
	}, [openState]);

	return (
		<PlayerQueueContextProvider
			targetBot={userSessionData.targetBot}
			guildId={userSessionData.presenceState?.voice.guildId}>
			<QueueContainer
				className={
					openState == null
						? undefined
						: openState
						? styles.open
						: styles.closed
				}>
				<Queue
					targetBot={userSessionData.targetBot}
					userId={userSessionData.userId}
					withQueueTitle
					withEndMessage={false}
				/>
			</QueueContainer>
			<QueueControlButton
				onClick={() => {
					setOpenStateInStorage(!openState);
					setOpenState(!openState);
				}}>
				<Image
					src={QueueIcon}
					alt="Queue Control Icon"
					fill
				/>
			</QueueControlButton>
		</PlayerQueueContextProvider>
	);
}
