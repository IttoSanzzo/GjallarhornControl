import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import * as Slider from "@radix-ui/react-slider";
import { CSSProperties, useLayoutEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const ProgressBarContainer = newStyledElement.div(styles.progressBarContainer);
const SliderForm = newStyledElement.form(styles.sliderForm);
const TimestampBox = newStyledElement.p(styles.timestampBox);

const schema = z.object({
	currentPosition: z.number(),
});

type FormData = z.infer<typeof schema>;

interface ProgressBarProps {
	targetBot: string;
	guildId: string;
	userId?: string;
	currentPositionInSeconds: number;
	totalLengthInSeconds: number;
	lastUpdate: number;
	isPaused?: boolean;
	isFinished: boolean;
	showTimings?: boolean;
	unixTimestamp: number;
}
export default function ProgressBar({
	currentPositionInSeconds,
	totalLengthInSeconds,
	lastUpdate,
	isPaused,
	showTimings = true,
	unixTimestamp,
	guildId,
	targetBot,
	userId,
	isFinished,
}: ProgressBarProps) {
	const [isInteracting, setIsInteracting] = useState<boolean>(false);

	const textStyle: CSSProperties = {
		...(isPaused && { color: "var(--cl-gray-500)" }),
	};

	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			currentPosition: currentPositionInSeconds,
		},
	});
	const currentPosition = form.watch().currentPosition;
	const { control } = form;

	useLayoutEffect(() => {
		const interval = setInterval(() => {
			if (!isPaused && !isInteracting) {
				const newPosition =
					Math.floor(Date.now() / 1000) -
					unixTimestamp +
					currentPositionInSeconds;
				if (isFinished || newPosition >= totalLengthInSeconds) {
					form.setValue("currentPosition", totalLengthInSeconds, {
						shouldValidate: false,
					});
					clearInterval(interval);
					return;
				}
				form.setValue("currentPosition", newPosition, {
					shouldValidate: false,
				});
			}
		}, 950);
		return () => clearInterval(interval);
	}, [
		form,
		isPaused,
		isInteracting,
		unixTimestamp,
		lastUpdate,
		currentPositionInSeconds,
		isFinished,
	]);

	async function handleSeekAction(position: number) {
		if (userId == null) return;
		fetch(`/api/${targetBot}/${guildId}/action`, {
			method: "POST",
			body: JSON.stringify({
				userId,
				action: "Seek",
				position: position,
			}),
			headers: {
				contentType: "application/json",
			},
		});
	}

	function handlePointerDown() {
		if (userId != null) setIsInteracting(true);
	}

	return (
		<ProgressBarContainer>
			{showTimings && (
				<TimestampBox style={textStyle}>
					{formatSecondsToText(currentPosition)}
				</TimestampBox>
			)}
			<SliderForm>
				<Controller
					name="currentPosition"
					control={control}
					defaultValue={currentPositionInSeconds}
					render={({ field }) => (
						<Slider.Root
							{...field}
							className={styles.Root}
							max={totalLengthInSeconds}
							step={1}
							disabled={!userId}
							onValueChange={(value) => field.onChange(value[0])}
							value={[field.value]}
							onPointerDown={() => handlePointerDown()}
							onValueCommit={async (value) => {
								await handleSeekAction(value[0]);
								setIsInteracting(false);
							}}>
							<Slider.Track
								className={styles.Track}
								style={{
									...(isPaused && { backgroundColor: "var(--cl-gray-700)" }),
								}}>
								<Slider.Range
									className={styles.Range}
									style={{
										...(isPaused && { backgroundColor: "var(--cl-gray-600)" }),
									}}
								/>
							</Slider.Track>
							<Slider.Thumb
								className={styles.Thumb}
								aria-label="Progress"
								style={{
									...(isPaused && { backgroundColor: "var(--cl-gray-600)" }),
								}}
							/>
						</Slider.Root>
					)}
				/>
			</SliderForm>
			{showTimings && (
				<TimestampBox style={textStyle}>
					{formatSecondsToText(totalLengthInSeconds)}
				</TimestampBox>
			)}
		</ProgressBarContainer>
	);
}

function formatSecondsToText(totalSeconds: number): string {
	if (totalSeconds >= 3600) return formatSecondsToHHMMSS(totalSeconds);
	return formatSecondsToMMSS(totalSeconds);
}
function formatSecondsToMMSS(totalSeconds: number): string {
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}
function formatSecondsToHHMMSS(totalSeconds: number): string {
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor((totalSeconds % 3600) / 60);
	const seconds = totalSeconds % 60;

	return [
		hours.toString().padStart(2, "0"),
		minutes.toString().padStart(2, "0"),
		seconds.toString().padStart(2, "0"),
	].join(":");
}
