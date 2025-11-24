import Seekbar from "./pageContent";

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
		<Seekbar
			guildId={guildId}
			targetBot={targetBot}
			width={width}
		/>
	);
}
