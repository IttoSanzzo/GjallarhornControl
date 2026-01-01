import Queue from "./pageContent";
import { PlayerQueueContextProvider } from "../../../../../../components/PlayerQueueContextProvider";
import { CSSProperties } from "react";

interface PageServerShellProps {
	params: Promise<{
		targetBot: string;
		guildId: string;
	}>;
	searchParams: Promise<{
		withoutTitleBar?: boolean;
		position?: "center";
		backgroundColor?: keyof CSSProperties["backgroundColor"] | "default";
	}>;
}
export default async function PageServerShell({
	params,
	searchParams,
}: PageServerShellProps) {
	const { guildId, targetBot } = await params;
	const { withoutTitleBar, backgroundColor, position } = await searchParams;

	const pageWrapperStyle: CSSProperties = {
		width: "100vw",
		height: "100vh",
		...(backgroundColor != undefined && {
			backgroundColor:
				backgroundColor == "default" ? "var(--cl-gray-800)" : backgroundColor,
		}),
		...(position == "center" && {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		}),
	};

	return (
		<div style={pageWrapperStyle}>
			<PlayerQueueContextProvider
				targetBot={targetBot}
				guildId={guildId}>
				<Queue
					targetBot={targetBot}
					withQueueTitle={!withoutTitleBar}
				/>
			</PlayerQueueContextProvider>
		</div>
	);
}
