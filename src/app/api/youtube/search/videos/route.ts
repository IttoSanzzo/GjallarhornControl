import { NextRequest, NextResponse } from "next/server";
import { Innertube } from "youtubei.js";
import { LintIgnoredAny } from "@/lib/types/LintIgnoredAny";
import { SearchedYoutubeTrack } from "@/lib/types/Youtube/SearchedYoutubeTrack";

const youtubeApi = await Innertube.create();

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get("query")?.trim();

	if (!query) return NextResponse.json([]);

	try {
		const search = await youtubeApi.search(query, { type: "video" });
		const tracks: SearchedYoutubeTrack[] = search.videos.map(
			(video: LintIgnoredAny) => ({
				link: `https://youtu.be/${video.id}`,
				title: video.title.text,
				length: video.length_text.text,
				thumbnail: video.thumbnails.at(-1)?.url,
				channelName: video.author?.name,
				channelUrl: video.author?.url,
				channelId: video.author?.id,
				channelThumbnail: video.author?.thumbnails.at(-1)?.url,
				viewCount: video.short_view_count?.text,
				published: video.published?.text,
			}),
		);

		return NextResponse.json(tracks, { status: 200 });
	} catch (exception) {
		console.error(exception);
		return NextResponse.json({ error: "Search failed" }, { status: 500 });
	}
}
