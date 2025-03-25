import { memo } from "react";
import { boolStyle } from "../../../libs/createComponents/utils";
import { NotificationMessage } from "./styledComponents";
import styles from "./styles.module.css";

export interface NotificationData {
	message: string;
	hasError?: boolean;
	timestamp: number;
}

interface NotificationProps {
	data: NotificationData;
}

export const Notification = memo(
	({ data: { message, hasError = false, timestamp } }: NotificationProps) => {
		if (message === "") return;
		return (
			<NotificationMessage
				key={timestamp}
				className={boolStyle("hasError", styles, hasError)}>
				{message}
			</NotificationMessage>
		);
	}
);
