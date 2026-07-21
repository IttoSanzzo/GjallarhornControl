export interface SearchedYoutubeTrack {
	type: "video" | "shorts" | "playlist";
	link: string;
	title: string;
	length?: string;
	thumbnail: string;
	channelName?: string;
	channelUrl?: string;
	channelId?: string;
	channelThumbnail?: string;
	viewCount?: string;
	published?: string;
}
