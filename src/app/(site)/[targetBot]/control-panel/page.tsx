"use server";

import React from "react";
import { Metadata } from "next";
import ControlPanel from "./pageContent";
import { notFound } from "next/navigation";

interface ControlPanelServerShellProps {
	params: Promise<{ targetBot: "ChariotSanzzo" | "Gjallarhorn" }>;
	searchParams: Promise<{ userId?: string }>;
}
export async function generateMetadata({
	params,
}: ControlPanelServerShellProps): Promise<Metadata> {
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

export default async function ControlPanelServerShell({
	params,
	searchParams,
}: ControlPanelServerShellProps) {
	const { targetBot } = await params;
	const { userId } = await searchParams;

	if (
		userId == null ||
		userId == "" ||
		(targetBot != "ChariotSanzzo" && targetBot != "Gjallarhorn")
	)
		notFound();

	return (
		<ControlPanel
			targetBot={targetBot}
			userId={userId}
		/>
	);
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === "development") return [];
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
