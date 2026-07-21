import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SavedPlaylist } from "@/lib/types/UserSavedPlaylist";
import { Dispatch, SetStateAction, useState } from "react";
import { userSavedPlaylistsCache } from "@/lib/cache/userSavedPlaylistsCache";
import * as Dialog from "@radix-ui/react-dialog";
import { TrackCategory } from "@/lib/TrackData";

const PatchPlaylistFromGjallarListContainer = newStyledElement.div(
	styles.patchPlaylistFromGjallarListContainer,
);
const PatchPlaylistFromGjallarListModalButton = newStyledElement.button(
	styles.patchPlaylistFromGjallarListModalButton,
);
const PatchPlaylistFromGjallarListForm = newStyledElement.form(
	styles.patchPlaylistFromGjallarListForm,
);

const schema = z.object({
	nickname: z.string().min(1, "Name must be provided."),
});

type FormData = z.infer<typeof schema>;

interface PatchPlaylistFromGjallarListProps {
	discordId: string;
	activeSavedPlaylistState: [
		SavedPlaylist,
		Dispatch<SetStateAction<SavedPlaylist>>,
	];
	category: TrackCategory;
}
export function PatchPlaylistFromGjallarList({
	discordId,
	activeSavedPlaylistState,
	category,
}: PatchPlaylistFromGjallarListProps) {
	const modalOpenState = useState<boolean>(false);
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
		defaultValues: {
			nickname: "",
		},
		mode: "all",
	});

	async function handleSubmit(formData: FormData) {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/gjallar/lists/${activeSavedPlaylistState[0]?.targetLink}/${category.id}?discordUserId=${discordId}`,
			{
				method: "PATCH",
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
		modalOpenState[1](false);
	}

	return (
		<PatchPlaylistFromGjallarListContainer>
			<Dialog.Root
				open={modalOpenState[0]}
				defaultOpen={false}>
				<Dialog.Trigger asChild>
					<PatchPlaylistFromGjallarListModalButton
						onClick={() => {
							modalOpenState[1](true);
						}}
						tabIndex={-1}>
						{"R"}
					</PatchPlaylistFromGjallarListModalButton>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay
						className={styles.modalOverlay}
						onClick={() => {
							modalOpenState[1](false);
						}}
					/>
					<Dialog.Content className={styles.modalContent}>
						<h1>Rename</h1>
						<PatchPlaylistFromGjallarListForm
							onSubmit={form.handleSubmit(handleSubmit)}>
							<input
								autoFocus
								placeholder="Name"
								{...form.register("nickname")}
							/>
							<button
								type="submit"
								disabled={
									!form.formState.isValid || form.formState.isSubmitting
								}>
								Add Playlist
							</button>
						</PatchPlaylistFromGjallarListForm>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</PatchPlaylistFromGjallarListContainer>
	);
}
