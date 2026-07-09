import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserSavedPlaylists } from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction } from "react";

const AddUserPlaylistForm = newStyledElement.form(styles.addUserPlaylistForm);

const schema = z.object({
	nickname: z.string().min(1, "Name must be provided."),
	targetType: z.string().min(1, "Target Type must be provided."),
	targetLink: z.string().min(1, "Target Link must be provided."),
});

type FormData = z.infer<typeof schema>;

interface AddUserPlaylistProps {
	discordId: string;
	userSavedPlaylistsState: [
		UserSavedPlaylists | null,
		Dispatch<SetStateAction<UserSavedPlaylists | null>>,
	];
}
export function AddUserPlaylist({
	discordId,
	userSavedPlaylistsState,
}: AddUserPlaylistProps) {
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			nickname: "",
			targetLink: "",
			targetType: "Youtube",
		},
	});

	async function handleSubmit(formData: FormData) {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/playlists?discordUserId=${discordId}`,
			{
				method: "POST",
				body: JSON.stringify(formData),
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
		const newPlaylist = await response.json();
		if (!response.ok) return;
		form.reset();
		userSavedPlaylistsState[1]((state) =>
			state
				? {
						...state,
						playlists: [...state.playlists, newPlaylist],
					}
				: null,
		);
	}

	return (
		<AddUserPlaylistForm onSubmit={form.handleSubmit(handleSubmit)}>
			<input
				placeholder="Name"
				{...form.register("nickname")}
			/>
			<input
				placeholder="Type"
				{...form.register("targetType")}
			/>
			<input
				placeholder="Link"
				{...form.register("targetLink")}
			/>
			<button type="submit">Save</button>
		</AddUserPlaylistForm>
	);
}
