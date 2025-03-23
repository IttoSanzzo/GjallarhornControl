import { ReactNode } from "react";
import { InternalBoxContainer } from "./styledComponents";

interface InternalBoxProps {
	children: ReactNode;
}

export default function InternalBox({ children }: InternalBoxProps) {
	return <InternalBoxContainer>{children}</InternalBoxContainer>;
}
