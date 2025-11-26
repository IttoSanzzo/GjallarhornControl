import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import Image from "next/image";

const PeekContainer = newStyledElement.div(styles.peekContainer);

export interface PeekPreviewData {
	title: string;
	artwork: string;
}
export interface PeekProps {
	targetBot: string;
	guildId: string;
	size?: number;
	type?: "previous" | "current" | "next";
	preview?: PeekPreviewData;
	keepOpaque?: boolean;
}
export default function Peek({
	size,
	type = "current",
	preview,
	keepOpaque = true,
}: PeekProps) {
	return (
		<PeekContainer
			style={{
				...(size && { width: `${size}px` }),
				...(keepOpaque && { opacity: "1" }),
			}}>
			<Image
				src={
					preview
						? preview.artwork
						: `${process.env.NEXT_PUBLIC_GJALLARHORNCONTROL_FULL_ADDRESS}/station_assets/no_track.png`
				}
				alt={`Preview to ${type} track's artwork`}
				style={{ objectFit: "contain" }}
				sizes=""
				fill
			/>
		</PeekContainer>
	);
}
