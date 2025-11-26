import Queue from "./pageContent";
import { PlayerQueueContextProvider } from "./subComponents/PlayerQueueContextProvider";

interface PageServerShellProps {
	params: Promise<{
		targetBot: string;
		guildId: string;
	}>;
	searchParams: Promise<{
		withoutTitleBar?: boolean;
	}>;
}
export default async function PageServerShell({
	params,
	searchParams,
}: PageServerShellProps) {
	const { guildId, targetBot } = await params;
	const { withoutTitleBar } = await searchParams;

	return (
		<PlayerQueueContextProvider
			targetBot={targetBot}
			guildId={guildId}>
			<Queue
				targetBot={targetBot}
				withQueueTitle={!withoutTitleBar}
			/>
		</PlayerQueueContextProvider>
	);
}
