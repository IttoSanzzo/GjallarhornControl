import { PlayerStationContextProvider } from "@/components/PlayerStationContextProvider";
import { CurrentTrackWrapper } from "./subComponents/CurrentTrackWrapper/CurrentTrackWrapper";

interface PageServerShellProps {
	params: Promise<{
		targetBot: string;
		guildId: string;
	}>;
}
export default async function PageServerShell({
	params,
}: PageServerShellProps) {
	const { guildId, targetBot } = await params;

	return (
		<PlayerStationContextProvider
			targetBot={targetBot}
			guildId={guildId}>
			<CurrentTrackWrapper
				guildId={guildId}
				targetBot={targetBot}
			/>
		</PlayerStationContextProvider>
	);
}
