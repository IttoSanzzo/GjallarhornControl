import type { NextConfig } from "next";
import DevServer from "next/dist/server/dev/next-dev-server";

const nextConfig: NextConfig = {
	/* config options here */
	allowedDevOrigins: ["gjallarhorncontrol.setsu.party"],
};

export default nextConfig;
