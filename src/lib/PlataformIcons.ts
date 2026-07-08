import { StaticImageData } from "next/image";
import { PlaylistPlataformType } from "./types/UserSavedPlaylist";

import YoutubeIcon from "@/assets/YoutubeIcon.png";
import SpotifyIcon from "@/assets/SpotifyIcon.png";
import SoundcloudIcon from "@/assets/SoundCloudIcon.png";
import GjallarIcon from "@/assets/ChariotSanzzoMaster.png";

export const plataformIcons: Record<PlaylistPlataformType, StaticImageData> = {
	[PlaylistPlataformType.Unknown]: GjallarIcon,
	[PlaylistPlataformType.Youtube]: YoutubeIcon,
	[PlaylistPlataformType.Spotify]: SpotifyIcon,
	[PlaylistPlataformType.Soundcloud]: SoundcloudIcon,
	[PlaylistPlataformType.Gjallar]: GjallarIcon,
	[PlaylistPlataformType.Default]: GjallarIcon,
};
