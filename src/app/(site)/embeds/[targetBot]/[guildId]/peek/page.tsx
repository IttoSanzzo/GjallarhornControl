import { PlayerStationContextProvider } from "@/components/PlayerStationContextProvider";
import { PeekWrapper } from "./subComponents/PeekWrapper/PeekWrapper";
import { CSSProperties } from "react";

interface PageServerShellProps {
	params: Promise<{
		targetBot: string;
		guildId: string;
	}>;
	searchParams: Promise<{
		size?: number;
		type?: "previous" | "current" | "next";
		inBox?: boolean;
		boxSide?: "left" | "right";
		position?: "center";
		backgroundColor?: keyof CSSProperties["backgroundColor"] | "default";
	}>;
}
export default async function PageServerShell({
	params,
	searchParams,
}: PageServerShellProps) {
	const { guildId, targetBot } = await params;
	const {
		size,
		type = "current",
		inBox = false,
		boxSide,
		backgroundColor,
		position,
	} = await searchParams;

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
				<PeekWrapper
					targetBot={targetBot}
					guildId={guildId}
					size={size}
					type={type}
					inBox={inBox}
					boxSide={boxSide}
				/>
			</PlayerStationContextProvider>
		</div>
	);
}
