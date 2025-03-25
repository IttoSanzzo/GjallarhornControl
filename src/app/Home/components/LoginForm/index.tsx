"use client";

import { z } from "zod";
import {
	ErrorText,
	LoginFormContainer,
	SelectorContainer,
	SubmitButton,
	TextInput,
	TextInputContainer,
} from "./styledComponents";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { QueryData } from "@/app/[targetBot]/control-panel/page";

const LoginFormSchema = z.object({
	targetBot: z.string(),
	userId: z
		.string()
		.min(17, { message: "User ID has to be valid." })
		.max(18, { message: "User ID has to be valid." }),
	channelId: z
		.string()
		.min(17, { message: "Channel ID has to be valid." })
		.max(19, { message: "Channel ID has to be valid." }),
});
type LoginFormData = z.infer<typeof LoginFormSchema>;

interface LoginFormProps {
	queryData: QueryData;
}

export default function LoginForm({ queryData }: LoginFormProps) {
	const router = useRouter();
	const queryUserId = queryData.userId;
	const queryChannelId = queryData.channelId;
	const queryTargetBot = queryData.targetBot;

	const {
		register,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm({
		resolver: zodResolver(LoginFormSchema),
		defaultValues: {
			userId: queryUserId ?? "",
			channelId: queryChannelId ?? "",
			targetBot: queryTargetBot === "" ? "ChariotSanzzo" : queryTargetBot,
		},
	});

	function handleLogin(data: LoginFormData) {
		router.push(
			`/${data.targetBot}/control-panel?userId=${data.userId}&channelId=${data.channelId}`
		);
	}

	return (
		<LoginFormContainer>
			<SelectorContainer>
				<label>Target Bot</label>
				<select {...register("targetBot")}>
					<option value="ChariotSanzzo">ChariotSanzzo</option>
					<option value="Gjallarhorn">Gjallarhorn</option>
				</select>
			</SelectorContainer>
			<TextInputContainer>
				<label>
					User ID{" "}
					{errors.userId && <ErrorText>{errors.userId.message}</ErrorText>}
				</label>
				<TextInput
					placeholder="User Id"
					{...register("userId")}
				/>
			</TextInputContainer>
			<TextInputContainer>
				<label>
					Chat Channel ID{" "}
					{errors.channelId && (
						<ErrorText>{errors.channelId.message}</ErrorText>
					)}
				</label>
				<TextInput
					placeholder="Chat Channel Id (Optional)"
					{...register("channelId")}
				/>
			</TextInputContainer>
			<SubmitButton
				onClick={handleSubmit(handleLogin)}
				disabled={isSubmitting}>
				Login
			</SubmitButton>
		</LoginFormContainer>
	);
}
