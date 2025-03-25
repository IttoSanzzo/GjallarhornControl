import { getBotSocket } from "@/lib/websockets";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ targetBot: string }> }
) {
	const { link, channelId, userId } = await req.json();
	const { targetBot } = await params;
	console.log(`PLAY [${targetBot}] <- ${userId} -> ${link}`);
	const ws = await getBotSocket(targetBot);
	if (!ws) {
		console.log(`PLAY Socket Error`);
		return new NextResponse(null, { status: 503 });
	}

	const bodyToSend = `<|Command|><|Value|>Play\n<|Color|><|Value|>#FF0000\n<|Link|><|Value|>${link}\n${
		channelId != "" && `<|ChatChannelId|><|Value|>${channelId}\n`
	}<|UserId|><|Value|>${userId}`;

	ws?.send(bodyToSend);

	return new NextResponse(null, { status: 201 });
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === "development") return [];
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
