import { PlayerStationContextProvider } from "@/components/PlayerStationContextProvider";
import { CurrentTrackWrapper } from "./subComponents/CurrentTrackWrapper/CurrentTrackWrapper";
import { CSSProperties } from "react";

interface PageServerShellProps {
	params: Promise<{
		targetBot: string;
		guildId: string;
	}>;
	searchParams: Promise<{
		fontSize?: number;
		position?: "center";
		backgroundColor?: keyof CSSProperties["backgroundColor"] | "default";
	}>;
}
export default async function PageServerShell({
	params,
	searchParams,
}: PageServerShellProps) {
	const { guildId, targetBot } = await params;
	const { fontSize, backgroundColor, position } = await searchParams;

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
			<PlayerStationContextProvider
				targetBot={targetBot}
				guildId={guildId}>
				<CurrentTrackWrapper
					guildId={guildId}
					targetBot={targetBot}
					fontSize={fontSize}
				/>
			</PlayerStationContextProvider>
		</div>
	);
}
