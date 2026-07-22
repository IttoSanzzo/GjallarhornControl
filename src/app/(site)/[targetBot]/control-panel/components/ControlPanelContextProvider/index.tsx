import { PlayerStationContextProvider } from "@/components/PlayerStationContextProvider";
import { UserPresenceState } from "@/lib/types/UserPresenceState";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export interface UserSessionData {
	userId: string;
	targetBot: string;
	presenceState: UserPresenceState | null;
}
type ApiCommands = {
	postActionCommand: (command: string) => Promise<void>;
	postPlayCommand: (trackLink: string, priority?: boolean) => Promise<void>;
};

export const UserSessionDataContext = createContext<UserSessionData>(null!);
export const ApiCommandsHandlerContext = createContext<ApiCommands>(null!);

interface ControlPanelContextProviderProps {
	children: ReactNode;
	targetBot: string;
	userId: string;
}
export default function ControlPanelContextProvider({
	children,
	targetBot,
	userId,
}: ControlPanelContextProviderProps) {
	const userSessionWithoutPresenceState = {
		targetBot: targetBot,
		userId: userId,
		presenceState: null,
	};
	const [userSessionData, setUserSessionData] = useState<UserSessionData>(
		userSessionWithoutPresenceState,
	);
	const userSessionDataRef = useRef<UserSessionData>(userSessionData);

	async function postActionCommand(command: string): Promise<void> {
		const toastId = toast.loading(`Using ${command}`);
		const userSessionData = userSessionDataRef.current;
		if (
			userSessionData.presenceState == null ||
			userSessionData.presenceState.voice.guildId == "0"
		) {
			toast.error(
				userSessionData.presenceState == null
					? "User is not tracked."
					: "User is not in a voice channel.",
				{
					position: "top-center",
				},
			);
			return;
		}
		try {
			const response = await fetch(
				`/api/${targetBot}/${userSessionData.presenceState.voice.guildId}/action`,
				{
					method: "POST",
					body: JSON.stringify({
						userId,
						action: command,
						channelId: userSessionData.presenceState.chat?.channelId,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			toast[response.ok ? "success" : "error"](command, {
				id: toastId,
			});
		} catch {
			console.error("Exception");
			toast.error(`${command} Command Exception`, {
				id: toastId,
			});
		}
	}
	async function postPlayCommand(
		trackLink: string,
		priority = true,
	): Promise<void> {
		const toastId = toast.loading(`Using Play`);
		const userSessionData = userSessionDataRef.current;
		if (
			userSessionData.presenceState == null ||
			userSessionData.presenceState.voice.guildId == "0"
		) {
			toast.error(
				userSessionData.presenceState == null
					? "User is not tracked."
					: "User is not in a voice channel.",
				{
					position: "top-center",
				},
			);
			return;
		}
		try {
			const response = await fetch(
				`/api/${targetBot}/${userSessionData.presenceState.voice.guildId}/play`,
				{
					method: "POST",
					body: JSON.stringify({
						userId,
						trackLink,
						channelId: userSessionData.presenceState.chat?.channelId,
						priority: priority,
					}),
					headers: {
						"Content-Type": "application/json",
					},
				},
			);
			toast[response.ok ? "success" : "error"]("Play", {
				id: toastId,
			});
		} catch {
			console.error("Exception");
			toast.error(`Play Command Exception`, {
				id: toastId,
			});
		}
	}

	const [apiCommands] = useState<ApiCommands>({
		postActionCommand: postActionCommand,
		postPlayCommand: postPlayCommand,
	});

	useEffect(() => {
		if (userId == null) return;
		let socket: WebSocket | null = null;
		let safeClose: boolean = false;
		const retryDelaySeconds = 5;
		let timeout: NodeJS.Timeout | null = null;

		function connect() {
			try {
				socket = new WebSocket(
					`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/live/users/${userId}/presence-sentinel-socket`.replace(
						"https://",
						"wss://",
					),
				);
				socket.onopen = () => {
					if (process.env.NODE_ENV == "development")
						console.log("PresenceSentinel Socket Connected");
				};
				socket.onmessage = (event) => {
					if (process.env.NODE_ENV == "development")
						console.log("PresenceSentinel Message Received: ", event.data);
					if (!event.data) {
						setUserSessionData(userSessionWithoutPresenceState);
						userSessionDataRef.current = userSessionWithoutPresenceState;
					} else {
						const data: UserPresenceState = JSON.parse(event.data);
						const newState: UserSessionData = {
							targetBot: targetBot,
							userId: userId,
							presenceState: data,
						};
						setUserSessionData(newState);
						userSessionDataRef.current = newState;
					}
				};
				socket.onclose = () => {
					setUserSessionData(userSessionWithoutPresenceState);
					userSessionDataRef.current = userSessionWithoutPresenceState;
					if (safeClose == false) {
						if (process.env.NODE_ENV == "development")
							console.log(
								"PresenceSentinel Socket Closed... trying to reconnect.",
							);
						timeout = setTimeout(connect, retryDelaySeconds * 1000);
					} else if (process.env.NODE_ENV == "development")
						console.log("PresenceSentinel Socket Closed.");
				};
				socket.onerror = () => socket?.close();
			} catch (ex) {
				console.error(ex);
			}
		}
		connect();
		return () => {
			safeClose = true;
			socket?.close();
			if (timeout != null) {
				clearTimeout(timeout);
				timeout = null;
			}
		};
	}, [userId, setUserSessionData]);

	return (
		<UserSessionDataContext.Provider value={userSessionData}>
			<PlayerStationContextProvider
				targetBot={userSessionData.targetBot}
				guildId={userSessionData.presenceState?.voice.guildId}>
				<ApiCommandsHandlerContext.Provider value={apiCommands}>
					{children}
				</ApiCommandsHandlerContext.Provider>
			</PlayerStationContextProvider>
		</UserSessionDataContext.Provider>
	);
}
