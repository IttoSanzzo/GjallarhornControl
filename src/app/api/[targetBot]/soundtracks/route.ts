import { NextRequest, NextResponse } from "next/server";
import {
	FullTrackInfo,
	TrackCategory,
	TrackInfo,
	SoundTrack,
} from "@/lib/TrackData";

const ChariotApi = process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS;

async function fetchSoundTracks(targetBot: string) {
	try {
		const response = await fetch(`${ChariotApi}/soundtracks`, {
			method: "GET",
		});
		const allSoundtracks: SoundTrack[] = await response.json();
		const thisBotSoundtracks = allSoundtracks.filter((soundtrack) =>
			soundtrack.bots.includes(targetBot)
		);
		return { hasErrors: false, data: thisBotSoundtracks };
	} catch (error) {
		return { hasErrors: true, error };
	}
}

async function refineTrackCategoriesArray(allSoundTracks: SoundTrack[]) {
	const rawTracksData: FullTrackInfo[] = allSoundTracks.map((track) => {
		return {
			name: track.name,
			link: track.trackUrl,
			description: track.description || "",
			category: track.category,
		};
	});

	const categoryMap: Map<string, TrackInfo[]> = new Map();

	rawTracksData.forEach((track) => {
		const trackInfo: TrackInfo = {
			name: track.name,
			description: track.description,
			link: track.link,
		};
		if (!categoryMap.has(track.category)) categoryMap.set(track.category, []);
		categoryMap.get(track.category)?.push(trackInfo);
	});

	const refinedData: TrackCategory[] = Array.from(categoryMap.entries()).map(
		([title, tracks]) => ({
			title,
			tracks,
		})
	);

	return refinedData.sort((a, b) => b.tracks.length - a.tracks.length);
}

export async function GET(
	req: NextRequest,
	{ params }: { params: Promise<{ targetBot: string }> }
) {
	console.log("ReValidating API");
	const { targetBot } = await params;

	const response = await fetchSoundTracks(targetBot);
	if (!response) {
		console.error("ENV Error");
		return NextResponse.json({ message: "ENV Error" }, { status: 500 });
	} else if (response.hasErrors) {
		// console.error(response.error);
		return NextResponse.json({ message: response.error }, { status: 500 });
	} else if (!response.data) {
		console.error("ChariotAPI Unknown Error");
		return NextResponse.json({ message: "ChariotAPI Error" }, { status: 500 });
	}

	const refinedData = await refineTrackCategoriesArray(response.data);

	return NextResponse.json({ refinedData: refinedData }, { status: 200 });
}

export async function generateStaticParams() {
	if (process.env.NODE_ENV === "development") return [];
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
