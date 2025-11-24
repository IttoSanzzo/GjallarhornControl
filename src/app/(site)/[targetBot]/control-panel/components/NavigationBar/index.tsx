import Link from "next/link";
import { NavigationBarContainer } from "./styledComponents";
import Image from "next/image";
import GjallarhornIcon from "@/assets/GjallarhornCrop.jpg";
import ChariotIcon from "@/assets/ChariotSanzzoMaster.png";
import HomeIcon from "@/assets/CSHeads.png";

interface NavitationBarProps {
	targetBot: string;
	userId: string;
}
export default function NavigationBar({
	targetBot,
	userId,
}: NavitationBarProps) {
	return (
		<NavigationBarContainer>
			{targetBot !== "ChariotSanzzo" ? (
				<Link href={`/ChariotSanzzo/control-panel?userId=${userId}`}>
					<Image
						src={GjallarhornIcon}
						alt="Switch Bot Button"
					/>
				</Link>
			) : (
				<Link href={`/Gjallarhorn/control-panel?userId=${userId}`}>
					<Image
						src={ChariotIcon}
						alt="Switch Bot Button"
					/>
				</Link>
			)}
			<Link href={`/?targetBot=${targetBot}&userId=${userId}`}>
				<Image
					src={HomeIcon}
					alt="Home Button"
				/>
			</Link>
		</NavigationBarContainer>
	);
}
