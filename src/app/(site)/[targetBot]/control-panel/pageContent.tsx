"use client";

import React from "react";
import StationComponents from "./components/StationComponents";
import styles from "./styles.module.css";
import createComponent from "../../../../../libs/createComponents/createComponent";
import Panel from "./components/Panel";
import ControlPanelContextProvider from "./components/ControlPanelContextProvider";
import { QueueControl } from "./components/QueueControl";
import { UserConnection } from "./components/UserConnection";

const ControlPanelContainer = createComponent.div(styles.controlPanelContainer);
const InteriorContainer = createComponent.div(styles.interiorContainer);

interface ControlPanelProps {
	targetBot: string;
	userId: string;
}
export default function ControlPanel({ targetBot, userId }: ControlPanelProps) {
	return (
		<ControlPanelContextProvider
			targetBot={targetBot}
			userId={userId}>
			<ControlPanelContainer>
				<InteriorContainer>
					<Panel />
					<QueueControl />
					<UserConnection />
				</InteriorContainer>
				<StationComponents />
				{/* <NavigationBar
					targetBot={targetBot}
					userId={userId}
				/> */}
			</ControlPanelContainer>
		</ControlPanelContextProvider>
	);
}
