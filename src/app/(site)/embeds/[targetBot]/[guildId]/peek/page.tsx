import { PlayerStationContextProvider } from "@/components/PlayerStationContextProvider";
import { PeekWrapper } from "./subComponents/PeekWrapper/PeekWrapper";

interface PageServerShellProps {
	params: Promise<{
		targetBot: string;
		guildId: string;
	}>;
	searchParams: Promise<{
		size?: number;
		type: "previous" | "current" | "next";
	}>;
}
export default async function PageServerShell({
	params,
	searchParams,
}: PageServerShellProps) {
	const { guildId, targetBot } = await params;
	const { size, type } = await searchParams;

	return (
		<PlayerStationContextProvider
			targetBot={targetBot}
			guildId={guildId}>
			<PeekWrapper
				targetBot={targetBot}
				guildId={guildId}
				size={size}
				type={type}
			/>
		</PlayerStationContextProvider>
	);
}
