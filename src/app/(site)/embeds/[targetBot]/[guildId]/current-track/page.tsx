import CurrentTrack from "./pageContent";

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
		<CurrentTrack
			guildId={guildId}
			targetBot={targetBot}
			title={"Default"}
		/>
	);
}
