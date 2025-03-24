"use server";

import React from "react";
import ControlBar from "./components/ControlBar";
import { ControlPanelContainer } from "./styledComponents";
import Panel from "./components/Panel";
import NavigationBar from "./components/NavigationBar";

interface ControlPanelProps {
	params: Promise<{ targetBot: string }>;
	searchParams: Promise<{ userId?: string; channelId?: string }>;
}
export interface QueryData {
	targetBot: string;
	userId: string;
	channelId: string;
}

export default async function ControlPanel({
	params,
	searchParams,
}: ControlPanelProps) {
	const { targetBot } = await params;
	const queryParams = await searchParams;
	const { userId, channelId } = queryParams;
	const queryData: QueryData = {
		targetBot,
		userId: userId ?? "",
		channelId: channelId ?? "",
	};

	const response = await fetch(
		`http://localhost:${process.env.PORT}/api/${targetBot}/notion`,
		{
			method: "GET",
			next: {
				revalidate: 60 * 60 * 24, // 24 hours,
			},
		}
	);
	const { refinedData } = await response.json();

	return (
		<ControlPanelContainer>
			<ControlBar queryData={queryData} />
			<NavigationBar queryData={queryData} />
			<Panel
				queryData={queryData}
				refinedTracksData={refinedData}
			/>
		</ControlPanelContainer>
	);
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === "development") return [];
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
