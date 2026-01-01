import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
	metadataBase: new URL("https://gjallarhorncontrol.setsu.party"),
	title: "Gjallarhorn Control | Home",
	description: "Control panel for SetsuTeaParty's music bots",
	icons: "/favicon.ico",
	openGraph: {
		title: "Gjallarhorn Control | Home",
		description: "Control panel for SetsuTeaParty's music bots",
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
		title: "Gjallarhorn Control | Home",
		description: "Control panel for SetsuTeaParty's music bots",
		images: [
			{ url: "/link-preview/og_preview.png", width: 1200, height: 630 },
			{ url: "favicon.ico", width: 128, height: 128 },
		],
	},
};

export default async function Home() {
	redirect("/ChariotSanzzo/control-panel");
}
