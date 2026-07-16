import { useLayoutEffect } from "react";
import styles from "./styles.module.css";
import { newStyledElement } from "@setsu-tp/styled-components";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Slider from "@radix-ui/react-slider";
import clsx from "clsx";

const VolumeSliderContainer = newStyledElement.div(
	styles.volumeSliderContainer,
);
const SliderForm = newStyledElement.form(styles.sliderForm);

const schema = z.object({
	volume: z.number(),
});

type FormData = z.infer<typeof schema>;

interface VolumeSliderProps {
	currentVolume: number;
	userId: string;
	targetBot: string;
	guildId: string;
}
export function VolumeSlider({
	currentVolume,
	userId,
	targetBot,
	guildId,
}: VolumeSliderProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			volume: currentVolume,
		},
	});
	const volume = form.watch().volume;
	const { control } = form;

	useLayoutEffect(() => {
		form.reset({ volume: currentVolume });
	}, [currentVolume]);

	async function handleSeekAction(volume: number) {
		if (userId == null) return;
		fetch(`/api/${targetBot}/${guildId}/action`, {
			method: "POST",
			body: JSON.stringify({
				userId,
				action: "Volume",
				volume: Number(volume),
			}),
			headers: {
				contentType: "application/json",
			},
		});
	}

	return (
		<VolumeSliderContainer>
			<SliderForm>
				<Controller
					name="volume"
					control={control}
					defaultValue={currentVolume}
					render={({ field }) => (
						<Slider.Root
							orientation="vertical"
							{...field}
							className={styles.Root}
							max={125}
							step={1}
							disabled={!userId}
							onValueChange={(value) => field.onChange(value[0])}
							value={[field.value]}
							onValueCommit={async (value) => {
								await handleSeekAction(value[0]);
							}}>
							<Slider.Track className={styles.Track}>
								<Slider.Range
									className={clsx(
										styles.Range,
										volume > 100 ? styles.extraVolume : undefined,
									)}
								/>
							</Slider.Track>
							<Slider.Thumb
								className={styles.Thumb}
								aria-label="Volume"
							/>
							<p>{volume}</p>
						</Slider.Root>
					)}
				/>
			</SliderForm>
		</VolumeSliderContainer>
	);
}
