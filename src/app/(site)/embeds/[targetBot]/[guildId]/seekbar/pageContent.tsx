import { newStyledElement } from "@setsu-tp/styled-components";
import ProgressBar from "./subComponents/ProgressBar";
import styles from "./styles.module.css";

const SeekbarContainer = newStyledElement.div(styles.seekbarContainer);

interface PageContentProps {
	targetBot: string;
	guildId: string;
	userId: string;
	width?: number;
	isPaused?: boolean;
	isFinished: boolean;
	currentPosition?: number;
	lastUpdate: number;
	totalLength: number;
	unixTimestamp: number;
}
export default function Seekbar({
	guildId,
	targetBot,
	width,
	isPaused,
	totalLength,
	currentPosition = 0,
	lastUpdate,
	unixTimestamp,
	userId,
	isFinished,
}: PageContentProps) {
	return (
		<SeekbarContainer style={{ ...(width && { width: `${width}px` }) }}>
			<ProgressBar
				userId={userId}
				guildId={guildId}
				targetBot={targetBot}
				currentPositionInSeconds={currentPosition}
				lastUpdate={lastUpdate}
				totalLengthInSeconds={totalLength}
				isPaused={isPaused}
				unixTimestamp={unixTimestamp}
				isFinished={isFinished}
			/>
		</SeekbarContainer>
	);
}
