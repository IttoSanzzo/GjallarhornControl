import { ReactNode } from "react";
import "./styles.module.css";

interface EmbedsLayoutProps {
	children: ReactNode;
}
export default async function EmbedsLayout({ children }: EmbedsLayoutProps) {
	return children;
}
