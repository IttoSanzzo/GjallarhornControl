import { NextRequest, NextResponse } from "next/server";
import { Innertube } from "youtubei.js";
import { LintIgnoredAny } from "@/lib/types/LintIgnoredAny";
import { SearchedYoutubeTrack } from "@/lib/types/Youtube/SearchedYoutubeTrack";

const youtubeApi = await Innertube.create();

export async function GET(req: NextRequest) {
	const query = req.nextUrl.searchParams.get("query")?.trim();

	if (!query) return NextResponse.json([]);

	try {
		const search = await youtubeApi.search(query, { type: "all" });
		const trackLinkSet = new Set<string>();

		const tracks: SearchedYoutubeTrack[] = [
			...search.videos.map((video: LintIgnoredAny) => {
				try {
					switch (video.type) {
						case "Video":
							return {
								type: "video" as const,
								link: `https://youtu.be/${video.id}`,
								title: video.title.text,
								length: video.length_text?.text,
								thumbnail: video.thumbnails.at(-1)?.url,
								channelName: video.author?.name,
								channelUrl: video.author?.url,
								channelId: video.author?.id,
								channelThumbnail: video.author?.thumbnails.at(-1)?.url,
								viewCount: video.short_view_count?.text,
								published: video.published?.text,
							};
						case "ShortsLockupView":
							return {
								type: "shorts" as const,
								link: `https://youtube.com${video.on_tap_endpoint.metadata.url}`,
								title: video.overlay_metadata.primary_text.text,
								thumbnail:
									video.on_tap_endpoint.payload.thumbnail.thumbnails.at(-1)
										?.url,
								viewCount: video.overlay_metadata.secondary_text.text,
							};
						default:
							return null;
					}
				} catch (ex) {
					console.error(ex);
					return null;
				}
			}),
			...search.playlists.map((video: LintIgnoredAny) => ({
				type: "playlist" as const,
				link: `https://youtube.com/playlist?list=${video.content_id}`,
				title: video.metadata.title.text,
				length:
					video.content_image.primary_thumbnail.overlays[0].badges[0].text,
				thumbnail: video.content_image.primary_thumbnail.image[0].url,
				viewCount: video.short_view_count?.text,
			})),
		].filter((entry): entry is LintIgnoredAny => {
			if (entry == null) return false;
			if (trackLinkSet.has(entry.link)) return false;
			trackLinkSet.add(entry.link);
			return true;
		});

		return NextResponse.json(tracks, { status: 200 });
	} catch (exception) {
		console.error(exception);
		return NextResponse.json({ error: "Search failed" }, { status: 500 });
	}
}
