import Link from "next/link";
import { QueryData } from "../../page";
import { ButtonLink, NavigationBarContainer } from "./styledComponents";
import Image from "next/image";
import GjallarhornIcon from "@/assets/GjallarhornCrop.jpg";
import ChariotIcon from "@/assets/ChariotSanzzoMaster.png";
import HomeIcon from "@/assets/CSHeads.png";

interface NavitationBarProps {
	queryData: QueryData;
}
export default function NavigationBar({
	queryData: { channelId, targetBot, userId },
}: NavitationBarProps) {
	return (
		<NavigationBarContainer>
			<ButtonLink>
				{targetBot !== "ChariotSanzzo" ? (
					<Link
						href={`/ChariotSanzzo/control-panel?userId=${userId}&channelId=${channelId}`}>
						<Image
							src={GjallarhornIcon}
							alt="Switch Bot Button"
						/>
					</Link>
				) : (
					<Link
						href={`/Gjallarhorn/control-panel?userId=${userId}&channelId=${channelId}`}>
						<Image
							src={ChariotIcon}
							alt="Switch Bot Button"
						/>
					</Link>
				)}
			</ButtonLink>
			<ButtonLink>
				<Link
					href={`/?targetBot=${targetBot}&userId=${userId}&channelId=${channelId}`}>
					<Image
						src={HomeIcon}
						alt="Home Button"
					/>
				</Link>
			</ButtonLink>
		</NavigationBarContainer>
	);
}
