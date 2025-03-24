import { NextRequest, NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import { FullTrackInfo, TrackCategory, TrackInfo } from "@/lib/notionAPI";
import { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
// import "@/lib/notionAPI";

const notionKey = process.env.NOTION_KEY;
const notionPageId = process.env.NOTION_PAGE_ID;
const notion = new Client({ auth: notionKey });

async function fetchNotionAPI(targetBot: string) {
	if (!notionKey || !notionPageId) return null;

	try {
		const receivedDb = await notion.databases.query({
			database_id: notionPageId,
			filter: {
				and: [
					{
						property: "Bot",
						multi_select: {
							contains: targetBot,
						},
					},
					{
						property: "Name",
						title: {
							contains: "",
						},
					},
				],
			},
		});
		return { hasErrors: false, data: receivedDb };
	} catch (error) {
		return { hasErrors: true, error };
	}
}

async function refineTrackCategoriesArray(
	notionRawData: QueryDatabaseResponse
) {
	const rawTracksData: FullTrackInfo[] = notionRawData.results.map(
		(track: any) => {
			return {
				name: track.properties.Name.title[0]?.plain_text ?? "-ERROR: NO NAME-",
				link: track.properties.Link.url,
				description:
					track.properties.Description.rich_text[0]?.plain_text ?? "",
				categories: track.properties.Category.multi_select.map(
					(category: { name: string }) => category.name
				),
			};
		}
	);

	const categoryMap: Map<string, TrackInfo[]> = new Map();

	rawTracksData.forEach((track) => {
		const trackInfo: TrackInfo = {
			name: track.name,
			description: track.description,
			link: track.link,
		};
		track.categories.forEach((category) => {
			if (!categoryMap.has(category)) categoryMap.set(category, []);
			categoryMap.get(category)?.push(trackInfo);
		});
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
	console.log("API ReValidando");
	const { targetBot } = await params;

	const response = await fetchNotionAPI(targetBot);
	if (!response) {
		console.error("ENV Error");
		return NextResponse.json({ message: "ENV Error" }, { status: 500 });
	} else if (response.hasErrors) {
		console.error(response.error);
		return NextResponse.json({ message: response.error }, { status: 500 });
	} else if (!response.data) {
		console.error("Notion Unknown Error");
		return NextResponse.json(
			{ message: "Notion Unknown Error" },
			{ status: 500 }
		);
	}

	const refinedData = await refineTrackCategoriesArray(response.data);

	return NextResponse.json({ refinedData: refinedData }, { status: 200 });
}

export async function generateStaticParams() {
	return [{ targetBot: "ChariotSanzzo" }, { targetBot: "Gjallarhorn" }];
}
