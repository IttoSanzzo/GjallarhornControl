import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: "Gjallarhorn Control",
		short_name: "Gjallarhorn",
		description: "A control panel for Gjallarhorn and Chariot Sanzzo",
		start_url: "/",
		display: "standalone",
		background_color: "#300070",
		theme_color: "#000000",
		icons: [],
	};
}
