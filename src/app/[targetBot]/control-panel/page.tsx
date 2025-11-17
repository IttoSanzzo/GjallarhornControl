"use server";

import React from "react";
import ControlBar from "./components/ControlBar";
import { ControlPanelContainer } from "./styledComponents";
import Panel from "./components/Panel";
import NavigationBar from "./components/NavigationBar";
import { Metadata } from "next";

interface ControlPanelProps {
	params: Promise<{ targetBot: string }>;
	searchParams: Promise<{ userId?: string; channelId?: string }>;
}
export async function generateMetadata({
	params,
}: ControlPanelProps): Promise<Metadata> {
	const { targetBot } = await params;
	const title = `${targetBot}'s Control Panel`;
	const description = `Control panel for ${targetBot}`;

	return {
		metadataBase: new URL("https://gjallarhorncontrol.setsu.party"),
		title,
		description,
		icons: "/favicon.ico",
		openGraph: {
			title,
			description,
			url: "https://gjallarhorncontrol.setsu.party/",
			siteName: "Gjallarhorn Control",
			images: [
				{ url: "/link-preview/og_preview.png", width: 1200, height: 630 },
				{ url: "favicon.ico", width: 128, height: 128 },
			],
			countryName: "Brazil",
			locale: "pt_BR",
			type: "website",
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [
				{ url: "/link-preview/og_preview.png", width: 1200, height: 630 },
				{ url: "favicon.ico", width: 128, height: 128 },
			],
		},
	};
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
		`http://localhost:${process.env.PORT}/api/${targetBot}/soundtracks`,
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
				refinedTracksData={refinedData || []}
				isOffline={refinedData === undefined}
			/>
		</ControlPanelContainer>
	);
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === "development") return [];
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
