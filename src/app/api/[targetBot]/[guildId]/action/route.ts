import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ targetBot: string; guildId: string }> },
) {
	try {
		const { action, channelId, userId, seekSeconds, trackPosition } =
			await req.json();
		const { targetBot, guildId } = await params;
		console.log(`ACTN [${targetBot}:${guildId}] <- ${userId} -> [${action}]`);

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/player/${targetBot}/${guildId}/action`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					command: action,
					userId: userId,
					trackPosition: trackPosition,
					seekSeconds: seekSeconds,
					channelId: channelId,
				}),
			},
		);
		const responseBody: {
			success: boolean;
		} = await response.json();
		if (responseBody.success) return new NextResponse(null, { status: 201 });
	} catch {
		console.log("Exception");
	}
	return new NextResponse(null, { status: 503 });
}

// export async function generateStaticParams() {
// 	if (process.env.NODE_ENV === "development") return [];
// 	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
// }
