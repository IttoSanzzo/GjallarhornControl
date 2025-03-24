import { getBotSocket } from "@/lib/websockets";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ targetBot: string }> }
) {
	const { link, channelId, userId } = await req.json();
	const { targetBot } = await params;
	const ws = await getBotSocket(targetBot);

	const bodyToSend = `<|Command|><|Value|>Play\n<|Color|><|Value|>#FF0000\n<|Link|><|Value|>${link}\n${
		channelId != "" && `<|ChatChannelId|><|Value|>${channelId}\n`
	}<|UserId|><|Value|>${userId}`;

	ws?.send(bodyToSend);

	return new NextResponse(null, { status: 201 });
}

export async function generateStaticParams() {
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
