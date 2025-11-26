import { ReactNode } from "react";
import "./styles.css";

interface EmbedsLayoutProps {
	children: ReactNode;
}
export default async function EmbedsLayout({ children }: EmbedsLayoutProps) {
	return children;
}
