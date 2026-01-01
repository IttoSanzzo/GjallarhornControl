"use client";

import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useLayoutEffect, useRef, useState } from "react";

const CurrentTrackContainer = newStyledElement.div(
	styles.currentTrackContainer
);
const BaseBar = newStyledElement.div(styles.baseBar);
const MarqueeContainer = newStyledElement.span(styles.marqueeContainer);
const CurrentTitleTrack = newStyledElement.div(styles.currentTitleTrack);

export interface CurrentTrackProps {
	targetBot: string;
	guildId: string;
	title: string;
	fontSize?: number;
}
export default function CurrentTrack({ title, fontSize }: CurrentTrackProps) {
	const [trackData, setTrackData] = useState<{
		count: number;
		duration: number;
	}>({
		count: 0,
		duration: 0,
	});
	const trackElementRef = useRef<HTMLSpanElement>(null);
	const titleElementRef = useRef<HTMLParagraphElement>(null);

	const fontSizeStyle = fontSize ? { fontSize: Number(fontSize) } : {};

	useLayoutEffect(() => {
		function updateTrackData() {
			if (!titleElementRef.current || !trackElementRef.current) return;
			const titleWidth = titleElementRef.current.scrollWidth;
			const trackWidth = trackElementRef.current.scrollWidth;
			if (titleWidth < trackWidth) {
				if (trackData.count > 0)
					setTrackData({
						count: 0,
						duration: 0,
					});
				return;
			}
			const count = getRepeatCount(titleWidth, trackWidth);
			setTrackData({
				count: count % 2 === 0 ? count + 1 : count,
				duration: trackWidth / 30,
			});
		}
		updateTrackData();
		const observer = new ResizeObserver(updateTrackData);
		if (titleElementRef.current) observer.observe(titleElementRef.current);
		if (trackElementRef.current) observer.observe(trackElementRef.current);
		return () => observer.disconnect();
	}, [title, fontSize]);

	return (
		<CurrentTrackContainer>
			<BaseBar>
				<span
					ref={trackElementRef}
					style={{ width: "100%", height: 0 }}
				/>
				<MarqueeContainer
					className={styles["fadeout-horizontal"]}
					style={{
						...(trackData.count == 0 && {
							display: "flex",
							justifyContent: "center",
						}),
					}}>
					<CurrentTitleTrack
						style={{
							animationDuration: `${trackData.duration}s`,
						}}>
						<p
							ref={titleElementRef}
							style={{
								...(trackData.count == 0 && { padding: "unset" }),
								...fontSizeStyle,
							}}>
							{title}
						</p>
						{Array.from({ length: trackData.count }, (_, index) => (
							<p
								aria-disabled
								key={index}
								style={fontSizeStyle}>
								{title}
							</p>
						))}
					</CurrentTitleTrack>
				</MarqueeContainer>
			</BaseBar>
		</CurrentTrackContainer>
	);
}

function getRepeatCount(contentWidth: number, trackWidth: number): number {
	const minTotalWidth = trackWidth * 1.5;
	return Math.ceil(minTotalWidth / contentWidth);
}
