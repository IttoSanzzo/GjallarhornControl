"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useContext } from "react";
import Image from "next/image";
import ChariotSanzzoIcon from "@/assets/ChariotSanzzoMaster.png";
import GjallarhornIcon from "@/assets/GjallarhornCrop.jpg";
import { PlayerStationContext } from "@/components/PlayerStationContextProvider";
import Link from "next/link";

const BotConnectionContainer = newStyledElement.div(
	styles.userConnectionContainer
);

interface BotConnectionProps {
	targetBot: "ChariotSanzzo" | "Gjallarhorn";
	userId: string;
}
export function BotConnection({ targetBot, userId }: BotConnectionProps) {
	const playerStationData = useContext(PlayerStationContext);
	const otherBotName =
		targetBot != "ChariotSanzzo" ? "ChariotSanzzo" : "Gjallarhorn";

	return (
		<Link href={`/${otherBotName}/control-panel?userId=${userId}`}>
			<BotConnectionContainer
				title={`${targetBot}\nClick to change bot controls for ${otherBotName}`}>
				<Image
					src={
						targetBot == "ChariotSanzzo" ? ChariotSanzzoIcon : GjallarhornIcon
					}
					alt="User Icon"
					fill
					className={
						playerStationData != null && playerStationData.isFinished != true
							? styles.active
							: styles.inactive
					}
				/>
			</BotConnectionContainer>
		</Link>
	);
}
