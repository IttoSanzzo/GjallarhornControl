import { NotificationData } from "@/components/Notification";

export function newNotification(
	message: string = "",
	hasError: boolean = false
): NotificationData {
	return { message, hasError, timestamp: Date.now() };
}

export function capitalize(src: string) {
	return src.charAt(0).toUpperCase() + src.slice(1);
}
