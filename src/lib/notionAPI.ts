"use server";

export interface TrackInfo {
	name: string;
	description: string;
	link: string;
}
export interface TrackCategory {
	title: string;
	tracks: TrackInfo[];
}
export interface FullTrackInfo {
	name: string;
	link: string;
	description: string;
	categories: string[];
}

const notionKey = process.env.NOTION_KEY;
const notionPageId = process.env.NOTION_PAGE_ID;

import { Client } from "@notionhq/client";
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

export async function getControlPanelData(
	targetBot: string
): Promise<TrackCategory[]> {
	console.log("ReValidando");
	const response = await fetchNotionAPI(targetBot);
	if (!response) {
		console.error("ENV Error");
		return [];
	} else if (response.hasErrors) {
		console.error(response.error);
		return [];
	} else if (!response.data) {
		console.error("Notion Unknown Error");
		return [];
	}
	const rawTracksData: FullTrackInfo[] = response.data.results.map(
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

	return refinedData;
}
