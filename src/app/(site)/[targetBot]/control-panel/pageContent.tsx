"use client";

import React from "react";
import StationComponents from "./components/StationComponents";
import styles from "./styles.module.css";
import createComponent from "../../../../../libs/createComponents/createComponent";
import Panel from "./components/Panel";
import NavigationBar from "./components/NavigationBar";
import ControlPanelContextProvider from "./components/ControlPanelContextProvider";

const ControlPanelContainer = createComponent.div(styles.controlPanelContainer);

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
				<NavigationBar
					targetBot={targetBot}
					userId={userId}
				/>

				<Panel />
				<StationComponents />
			</ControlPanelContainer>
		</ControlPanelContextProvider>
	);
}
