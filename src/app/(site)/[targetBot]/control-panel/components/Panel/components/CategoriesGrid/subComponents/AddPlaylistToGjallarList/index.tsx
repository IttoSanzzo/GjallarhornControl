import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	PlaylistPlataformType,
	SavedPlaylist,
} from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction } from "react";
import { LintIgnoredAny } from "@/lib/types/LintIgnoredAny";
import { userSavedPlaylistsCache } from "@/lib/cache/userSavedPlaylistsCache";

const AddPlaylistToGjallarListForm = newStyledElement.form(
	styles.addUserPlaylistForm,
);

const schema = z
	.object({
		nickname: z.string().min(1, "Name must be provided."),
		targetType: z.string().min(1, "Target Type must be provided."),
		targetLink: z.string(),
	})
	.superRefine((data, ctx) => {
		if (data.targetType !== "Gjallar" && data.targetLink.trim() === "") {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				path: ["targetLink"],
				message: "Target Link must be provided.",
			});
		}
	});

type FormData = z.infer<typeof schema>;

interface AddPlaylistToGjallarListProps {
	discordId: string;
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
}
export function AddPlaylistToGjallarList({
	discordId,
	activeSavedPlaylistState,
}: AddPlaylistToGjallarListProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			nickname: "",
			targetLink: "",
			targetType: "Youtube",
		},
		mode: "all",
	});
	const watchedValues = form.watch();

	async function handleSubmit(formData: FormData) {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/lists/${activeSavedPlaylistState[0]?.targetLink}?discordUserId=${discordId}`,
			{
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		if (!response.ok) return;
		form.reset();
		userSavedPlaylistsCache.invalidate(activeSavedPlaylistState[0].targetLink);
		activeSavedPlaylistState[1]((state) => ({
			...state,
			timestamp: Date.now(),
		}));
	}

	return (
		<AddPlaylistToGjallarListForm onSubmit={form.handleSubmit(handleSubmit)}>
			<input
				placeholder="Name"
				{...form.register("nickname")}
			/>
			<select {...form.register("targetType")}>
				{Object.keys(PlaylistPlataformType)
					.filter(
						(key) =>
							isNaN(key as LintIgnoredAny) &&
							(key as keyof typeof PlaylistPlataformType) != "Unknown" &&
							(key as keyof typeof PlaylistPlataformType) != "Gjallar" &&
							(key as keyof typeof PlaylistPlataformType) != "Default",
					)
					.map((option) => (
						<option
							key={option}
							value={option}>
							{option}
						</option>
					))}
			</select>
			{watchedValues.targetType != "Gjallar" && (
				<input
					placeholder="Link"
					{...form.register("targetLink")}
				/>
			)}
			<button
				type="submit"
				disabled={!form.formState.isValid || form.formState.isSubmitting}>
				Add Playlist
			</button>
		</AddPlaylistToGjallarListForm>
	);
}
