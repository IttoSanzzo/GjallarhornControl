import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import Peek, {
	PeekPreviewData,
	PeekProps,
} from "@/app/(site)/embeds/[targetBot]/[guildId]/peek/pageContent";
import { capitalize } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";
import { ApiCommandsHandler } from "../../../ControlPanelContextProvider";
import { PlayerCommandResult } from "@/lib/types/PlayerStationState";
import clsx from "clsx";

const PeekPreviewContainer = newStyledElement.div(styles.peekContainer);
const PreviewJumpButton = newStyledElement.button(styles.previewJumpButton);
const PeekTrackContainer = newStyledElement.div(styles.peekTrackContainer);

interface PeekContainerProps extends PeekProps {
	userId: string;
	preview?: PeekPreviewData;
	lastCommand: PlayerCommandResult;
	fromLog?: boolean;
}
export default function PeekContainer({
	type,
	targetBot,
	lastCommand,
	fromLog,
	...props
}: PeekContainerProps) {
	const { postActionCommand } = useContext(ApiCommandsHandler);
	const [current, setCurrent] = useState<PeekPreviewData | null>(
		props.preview ? props.preview : null
	);
	const [previous, setPrevious] = useState<PeekPreviewData | null>(null);
	const [moveDirection, setMoveDirection] = useState<"previous" | "next" | "">(
		""
	);
	async function handleActionButton(action: string) {
		await postActionCommand(action);
	}
	function handleTransitionEnd() {
		setPrevious(null);
		setMoveDirection("");
	}

	useEffect(() => {
		if (lastCommand.command == "Play" && lastCommand.wasSuccess && !fromLog) {
			setCurrent(props.preview ? props.preview : null);
		} else if (
			(lastCommand.command == "Next" || lastCommand.command == "Previous") &&
			lastCommand.wasSuccess &&
			!fromLog
		) {
			setPrevious(current);
			setCurrent(props.preview ? props.preview : null);
			setMoveDirection(lastCommand.command == "Next" ? "next" : "previous");
		}
	}, [lastCommand, props.preview]);

	return (
		<PeekPreviewContainer
			style={type == "previous" ? { left: `${6}%` } : { right: `${6}%` }}>
			{previous && (
				<PeekTrackContainer
					className={clsx(styles.old, styles[moveDirection])}
					onAnimationEnd={handleTransitionEnd}>
					<Peek
						{...props}
						preview={previous}
						targetBot={targetBot}
						type={type}
					/>
				</PeekTrackContainer>
			)}
			{current && (
				<PeekTrackContainer
					className={clsx(styles.current, styles[moveDirection])}>
					<PreviewJumpButton
						onClick={() => handleActionButton(capitalize(type ?? "next"))}>
						<Peek
							{...props}
							targetBot={targetBot}
							type={type}
						/>
					</PreviewJumpButton>
				</PeekTrackContainer>
			)}
		</PeekPreviewContainer>
	);
}
