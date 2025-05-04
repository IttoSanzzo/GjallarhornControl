import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ targetBot: string }> }
) {
	const { action, channelId, userId } = await req.json();
	const { targetBot } = await params;
	console.log(`ACTN [${targetBot}] <- ${userId} -> [${action}]`);

	const response = await fetch(
		`http://${process.env.CHARIOT_API}/player/${targetBot}`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				command: action,
				channelId: channelId,
				userId: userId,
			}),
		}
	);
	const responseBody: {
		success: boolean;
	} = await response.json();
	if (responseBody.success) return new NextResponse(null, { status: 201 });
	return new NextResponse(null, { status: 503 });
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === "development") return [];
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
