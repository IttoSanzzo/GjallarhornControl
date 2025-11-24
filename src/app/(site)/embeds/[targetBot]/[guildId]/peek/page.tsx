import Peek from "./pageContent";

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
		<Peek
			guildId={guildId}
			targetBot={targetBot}
			size={size}
			type={type}
		/>
	);
}
