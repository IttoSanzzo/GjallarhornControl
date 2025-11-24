import { newStyledElement } from "@setsu-tp/styled-components";
import styles from "./styles.module.css";
import Peek, {
	PeekProps,
} from "@/app/(site)/embeds/[targetBot]/[guildId]/peek/pageContent";
import Image from "next/image";
import PinIcon from "@/assets/PinIcon.png";
import UnpinIcon from "@/assets/UnpinIcon.png";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const PeekContainer = newStyledElement.div(styles.peekContainer);
const TrackInfo = newStyledElement.div(styles.trackInfo);
const OriginalUser = newStyledElement.div(styles.originalUser);
const AlwaysOpenButton = newStyledElement.button(styles.alwaysOpenButton);

function getAlwaysOpenStorage(): boolean {
	return localStorage.getItem("alwaysShowCurrentTrackPeek") == "true";
}
function setAlwaysOpenStorage(state: boolean): void {
	localStorage.setItem("alwaysShowCurrentTrackPeek", state ? "true" : "false");
}

interface CurrentTrackPeekContainerProps extends PeekProps {
	userId: string;
	currentTrackData: {
		title: string;
		trackUrl: string;
		artwork: string;
		originalUserNickname: string;
		originalUserAvatarUrl: string;
	};
}
export default function CurrentTrackPeekContainer({
	targetBot,
	currentTrackData,
	...props
}: CurrentTrackPeekContainerProps) {
	const [alwaysOpen, setAlwaysOpen] = useState(false);
	const peekReference = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const storageState = getAlwaysOpenStorage();
		if (storageState) setAlwaysOpen(true);
	}, []);

	useEffect(() => {
		if (!peekReference.current || !peekReference.current.parentElement) return;
		const peekParent = peekReference.current.parentElement;
		peekParent.style.pointerEvents = alwaysOpen ? "unset" : "none";
	}, [alwaysOpen, peekReference]);

	return (
		<PeekContainer
			ref={peekReference}
			style={{
				...(alwaysOpen && { margin: "unset" }),
			}}>
			<a
				href={currentTrackData.trackUrl}
				target="_blank">
				<Peek
					{...props}
					targetBot={targetBot}
					type={"current"}
					preview={{
						artwork: currentTrackData.artwork,
						title: currentTrackData.title,
					}}
				/>
			</a>
			<TrackInfo>
				<span />
				<OriginalUser>
					<Image
						src={currentTrackData.originalUserAvatarUrl}
						alt="Original user nickname"
						width={35}
						height={35}
					/>
					<p>{currentTrackData.originalUserNickname}</p>
				</OriginalUser>
				<AlwaysOpenButton
					onClick={() => {
						setAlwaysOpen(!alwaysOpen);
						setAlwaysOpenStorage(!alwaysOpen);
					}}>
					<Image
						src={alwaysOpen ? UnpinIcon : PinIcon}
						alt="Pin current track preview."
						fill
					/>
				</AlwaysOpenButton>
			</TrackInfo>
		</PeekContainer>
	);
}
