import { HomeContainer, HomeTitle } from "./styledComponents";
import LoginForm from "./components/LoginForm";
import InternalBox from "@/components/InternalBox";
import { QueryData } from "../(site)/[targetBot]/control-panel/page";
import { Metadata } from "next";

interface HomeProps {
	searchParams: Promise<{
		targetBot?: string;
		userId?: string;
		channelId?: string;
	}>;
}

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

export default async function Home({ searchParams }: HomeProps) {
	const queryParams = await searchParams;
	const { targetBot, userId, channelId } = queryParams;
	const queryData: QueryData = {
		channelId: channelId ?? "",
		targetBot: targetBot ?? "",
		userId: userId ?? "",
	};

	return (
		<HomeContainer>
			<InternalBox>
				<HomeTitle>Gjallarhorn Control</HomeTitle>
			</InternalBox>
			<InternalBox>
				<LoginForm queryData={queryData} />
			</InternalBox>
		</HomeContainer>
	);
}
