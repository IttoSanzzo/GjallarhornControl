import { getBotSocket } from "@/lib/websockets";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
	req: NextRequest,
	{ params }: { params: Promise<{ targetBot: string }> }
) {
	const { action, channelId, userId } = await req.json();
	const { targetBot } = await params;
	const ws = await getBotSocket(targetBot);

	const bodyToSend = `<|Command|><|Value|>${action}\n${
		channelId != "" && `<|ChatChannelId|><|Value|>${channelId}\n`
	}<|UserId|><|Value|>${userId}`;

	ws?.send(bodyToSend);

	return new NextResponse(null, { status: 201 });
}

export async function generateStaticParams() {
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
