import { NextRequest, NextResponse } from "next/server";
import { TrackCategory, TrackInfo } from "@/lib/TrackData";
import { Innertube } from "youtubei.js";
import { LintIgnoredAny } from "@/lib/types/LintIgnoredAny";

const youtubeApi = await Innertube.create();

export async function GET(req: NextRequest) {
	const playlistLink = req.nextUrl.searchParams.get("playlistLink") ?? "";

	let playlistId = null;
	try {
		playlistId = new URL(playlistLink).searchParams.get("list");
	} catch {
		return NextResponse.error();
	}
	if (!playlistId) return;

	let playlist;
	try {
		playlist = await youtubeApi.getPlaylist(playlistId);
	} catch {
		return NextResponse.error();
	}

	const tracks: TrackInfo[] = playlist.videos.map((video: LintIgnoredAny) => {
		switch (video.type) {
			case "LockupView":
				return {
					name: video.metadata.title.text ?? "",
					description: "",
					link: video.content_id
						? `https://www.youtube.com/watch?v=${video.content_id}`
						: "",
					artworkUrl: video.content_image.image[0].url,
				};
			case "PlaylistVideo":
			default:
				return {
					name: video.title.text ?? "",
					description: "",
					link: video.endpoint.payload.videoId
						? `https://www.youtube.com/watch?v=${video.endpoint.payload.videoId}`
						: "",
					artworkUrl: video.thumbnails[0].url,
				};
		}
	});
	const category: TrackCategory = {
		title: playlist.info.title ?? "Playlist",
		tracks,
		targetType: "Youtube",
		targetLink: playlistLink,
	};

	return NextResponse.json(category, { status: 200 });
}
