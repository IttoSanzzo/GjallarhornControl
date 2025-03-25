import { NotificationData } from "@/components/Notification";

export function newNotification(
	message: string = "",
	hasError: boolean = false
): NotificationData {
	return { message, hasError, timestamp: Date.now() };
}
