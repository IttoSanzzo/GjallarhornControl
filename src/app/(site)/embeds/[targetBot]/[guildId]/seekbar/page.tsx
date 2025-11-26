import { PlayerStationContextProvider } from "@/components/PlayerStationContextProvider";
import { SeekbarWrapper } from "./subComponents/SeekbarWrapper/SeekbarWrapper";

interface PageServerShellProps {
	params: Promise<{
		targetBot: string;
		guildId: string;
	}>;
	searchParams: Promise<{
		width?: number;
	}>;
}
export default async function PageServerShell({
	params,
	searchParams,
}: PageServerShellProps) {
	const { guildId, targetBot } = await params;
	const { width } = await searchParams;

	return (
		<PlayerStationContextProvider
			targetBot={targetBot}
			guildId={guildId}>
			<SeekbarWrapper
				targetBot={targetBot}
				guildId={guildId}
				width={width}
				userId={undefined}
			/>
		</PlayerStationContextProvider>
	);
}
