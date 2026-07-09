import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { TrackCustomization, TrackInfo } from "@/lib/TrackData";
import toast from "react-hot-toast";
import { getPlataformName } from "@/lib/utils";
import { trackCustomizationCache } from "@/lib/cache/trackCustomizationCache";

const TrackCustomizationEditionFormForm = newStyledElement.form(
	styles.trackCustomizationEditionFormForm,
);

const schema = z.object({
	nickname: z.string(),
	notes: z.string(),
});

type FormData = z.infer<typeof schema>;

interface TrackCustomizationEditionFormProps {
	discordId: string;
	trackInfo: TrackInfo;
	trackCustomizationState: [
		TrackCustomization | null,
		Dispatch<SetStateAction<TrackCustomization | null>>,
	];
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}
export function TrackCustomizationEditionForm({
	discordId,
	trackCustomizationState,
	trackInfo,
	setIsModalOpen,
}: TrackCustomizationEditionFormProps) {
	const formRef = useRef<HTMLFormElement | null>(null);
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			nickname: "",
			notes: "",
		},
	});

	useEffect(() => {
		if (trackCustomizationState[0] == null) {
			form.reset({
				nickname: "",
				notes: "",
			});
			return;
		}
		form.reset({
			nickname: trackCustomizationState[0].nickname,
			notes: trackCustomizationState[0].notes,
		});
	}, [trackCustomizationState[0]]);

	async function handleSubmit(formData: FormData) {
		const toastId = toast.loading("Saving...");
		try {
			const newCustomization = {
				nickname: formData.nickname,
				source: getPlataformName(trackInfo.link),
				notes: formData.notes,
			};
			const isDeletion: boolean =
				newCustomization.nickname == "" && newCustomization.notes == "";
			const trackId = encodeURIComponent(trackInfo.link);
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/track-customization/${trackId}?discordUserId=${discordId}`,
				{
					method: isDeletion ? "DELETE" : "PUT",
					body: JSON.stringify(newCustomization),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			if (!response.ok) {
				toast.error("Error", { id: toastId });
				return;
			}
			toast.success("Saved", { id: toastId });
			form.reset(formData);
			trackCustomizationState[1](isDeletion ? null : await response.json());
			trackCustomizationCache.invalidate(trackInfo.link);
			setIsModalOpen(false);
		} catch {
			toast.error("Exception", { id: toastId });
		}
	}

	return (
		<TrackCustomizationEditionFormForm
			ref={formRef}
			onKeyDown={(event) => {
				if (!event.ctrlKey || event.key != "s") return;
				event.preventDefault();
				if (formRef.current) formRef.current.requestSubmit();
			}}
			onSubmit={form.handleSubmit(handleSubmit)}>
			<input
				placeholder="Name"
				{...form.register("nickname")}
			/>
			<textarea
				placeholder="Notes"
				{...form.register("notes")}
			/>
			<button type="submit">Save</button>
		</TrackCustomizationEditionFormForm>
	);
}
