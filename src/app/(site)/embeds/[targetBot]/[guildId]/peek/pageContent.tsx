import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import Image from "next/image";
import { capitalize } from "@/lib/utils";

const PeekContainer = newStyledElement.div(styles.peekContainer);
const PeekBox = newStyledElement.div(styles.peekBox);

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
	inBox?: boolean;
	boxSide?: "left" | "right";
}
export default function Peek({
	size,
	type = "current",
	preview,
	keepOpaque = true,
	inBox = false,
	boxSide,
}: PeekProps) {
	if (inBox)
		return (
			<PeekBox
				className={
					boxSide && (boxSide == "left" || boxSide == "right")
						? styles[`box${capitalize(boxSide)}`]
						: undefined
				}>
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
			</PeekBox>
		);
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
