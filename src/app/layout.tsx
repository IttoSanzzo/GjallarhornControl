import type { Metadata } from "next";
import App from "@/app/_app";
import "@/styles/global.css";

export const metadata: Metadata = {
	title: "Gjallarhorn Control",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link
					rel="preconnect"
					href="https://fonts.googleapis.com"
				/>
				<link
					rel="preconnect"
					href="https://fonts.gstatic.com"
					crossOrigin="anonymous"
				/>
				<link
					href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
					rel="stylesheet"
				/>
			</head>
			<body>
				<App>{children}</App>
			</body>
		</html>
	);
}
