import { HomeContainer, HomeTitle } from "./styledComponents";
import LoginForm from "./components/LoginForm";
import InternalBox from "@/components/InternalBox";
import { QueryData } from "../[targetBot]/control-panel/page";

interface HomeProps {
	searchParams: Promise<{
		targetBot?: string;
		userId?: string;
		channelId?: string;
	}>;
}

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
