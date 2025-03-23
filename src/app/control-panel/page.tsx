"use client";

import { useState } from "react";
import ControlBar from "./components/ControlBar";
import SearchBar from "./components/SearchBar";
import { ControlPanelContainer } from "./styledComponents";
import CategoriesGrid, { TrackCategory } from "@/components/CategoriesGrid";

const mockData: TrackCategory[] = [
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
	{
		title: "Magic SFX",
		tracks: [
			{ name: "Magic Sound Effects", description: "", link: "" },
			{ name: "Japanese RPG Magic SFXs", description: "", link: "" },
		],
	},
	{
		title: "Misc SFX",
		tracks: [
			{ name: "Big Heavy Door", description: "", link: "" },
			{ name: "Door Opening Sound Effect", description: "", link: "" },
			{ name: "3D Rocks Falling SFX", description: "", link: "" },
		],
	},
];

interface ControlPanelProps {
	searchParams: { [key: string]: string | undefined };
}

export default async function ControlPanel({ searchParams }: any) {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const targetBot = searchParams?.targetBot ?? "ChariotSanzzo";

	function onSearchQueryChange(newQuery: string) {
		setSearchQuery(newQuery);
	}

	return (
		<ControlPanelContainer>
			<ControlBar targetBot={targetBot} />
			<SearchBar
				setSearchQuery={onSearchQueryChange}
				value={searchQuery}
			/>
			<CategoriesGrid categoriesData={mockData} />
		</ControlPanelContainer>
	);
}
