import { Toaster } from "@/components/Toaster";
import { ReactNode } from "react";

interface AppProps {
	children: ReactNode;
}

export default function App({ children }: AppProps) {
	return (
		<>
			{children}
			<Toaster />
		</>
	);
}
