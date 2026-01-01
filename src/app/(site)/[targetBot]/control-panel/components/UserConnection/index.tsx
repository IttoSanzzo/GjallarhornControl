"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useContext } from "react";
import { UserSessionDataContext } from "../ControlPanelContextProvider";
import Image from "next/image";
import NoAvatarIcon from "@/assets/CSHeads.png";

const UserConnectionContainer = newStyledElement.button(
	styles.userConnectionContainer
);

export function UserConnection() {
	const userSessionData = useContext(UserSessionDataContext);

	if (userSessionData.presenceState == null) return null;

	return (
		<UserConnectionContainer
			title={`${userSessionData.presenceState.user.username}${
				userSessionData.presenceState.voice.channelId != "0"
					? `\n${userSessionData.presenceState.voice.guildName}\n${userSessionData.presenceState.voice.channelName}`
					: ""
			}`}>
			<Image
				src={userSessionData.presenceState.user.avatarUrl || NoAvatarIcon}
				alt="User Icon"
				fill
				className={
					userSessionData.presenceState.voice.channelId != "0"
						? styles.active
						: styles.inactive
				}
			/>
		</UserConnectionContainer>
	);
}
