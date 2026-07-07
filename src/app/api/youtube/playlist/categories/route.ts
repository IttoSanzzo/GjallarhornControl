import { NextRequest, NextResponse } from "next/server";
import { TrackCategory, TrackInfo } from "@/lib/TrackData";
import { Innertube } from "youtubei.js";

export async function GET(req: NextRequest) {
	console.log("ReValidating API");
	const playlistLink = req.nextUrl.searchParams.get("playlistLink") ?? "";

	const youtube = await Innertube.create();
	const playlistId = new URL(playlistLink).searchParams.get("list");
	if (!playlistId) return;

	const playlist = await youtube.getPlaylist(playlistId);
	const tracks: TrackInfo[] = playlist.videos.map((video: any) => ({
		name: video.metadata.title.text ?? "Error",
		description: "",
		link: video.content_id
			? `https://www.youtube.com/watch?v=${video.content_id}`
			: "",
		artworkUrl: video.content_image.image[0].url,
	}));
	const category: TrackCategory = {
		title: playlist.info.title ?? "Playlist",
		tracks,
	};

	return NextResponse.json(category, { status: 200 });
}
