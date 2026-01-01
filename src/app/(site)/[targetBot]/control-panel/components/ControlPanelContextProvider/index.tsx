import { PlayerStationContextProvider } from "@/components/PlayerStationContextProvider";
import { api } from "@/lib/axios";
import { UserPresenceState } from "@/lib/types/UserPresenceState";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

export interface UserSessionData {
	userId: string;
	targetBot: string;
	presenceState: UserPresenceState | null;
}
type ApiCommands = {
	postActionCommand: (command: string) => Promise<void>;
	postPlayCommand: (trackLink: string) => Promise<void>;
};

export const UserSessionDataContext = createContext<UserSessionData>(null!);
export const ApiCommandsHandler = createContext<ApiCommands>(null!);

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
	const [userSessionData, setUserSessionData] = useState<UserSessionData>({
		targetBot: targetBot,
		userId: userId,
		presenceState: null,
	});
	const userSessionDataRef = useRef<UserSessionData>(userSessionData);

	async function postActionCommand(command: string): Promise<void> {
		const userSessionData = userSessionDataRef.current;
		if (
			userSessionData.presenceState == null ||
			userSessionData.presenceState.voice.guildId == "0"
		) {
			return;
		}
		try {
			api.post(
				`/${targetBot}/${userSessionData.presenceState.voice.guildId}/action`,
				{
					userId,
					action: command,
					channelId: userSessionData.presenceState.chat?.channelId,
				}
			);
		} catch {
			console.error("Exception");
		}
	}
	async function postPlayCommand(trackLink: string): Promise<void> {
		const userSessionData = userSessionDataRef.current;
		if (
			userSessionData.presenceState == null ||
			userSessionData.presenceState.voice.guildId == "0"
		) {
			return;
		}
		try {
			api.post(
				`/${targetBot}/${userSessionData.presenceState.voice.guildId}/play`,
				{
					userId,
					trackLink,
					channelId: userSessionData.presenceState.chat?.channelId,
				}
			);
		} catch {
			console.error("Exception");
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
		let retryDelaySeconds = 0;
		let timeout: NodeJS.Timeout | null = null;

		function connect() {
			try {
				socket = new WebSocket(
					`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/live/users/${userId}/presence-sentinel-socket`.replace(
						"https://",
						"wss://"
					)
				);
				socket.onopen = () => {
					console.log("PresenceSentinel Socket Connected");
					retryDelaySeconds = 0;
				};
				socket.onmessage = (event) => {
					console.log("PresenceSentinel Message Received: ", event.data);
					const data: UserPresenceState = JSON.parse(event.data);
					const newState: UserSessionData = {
						targetBot: targetBot,
						userId: userId,
						presenceState: data,
					};
					setUserSessionData(newState);
					userSessionDataRef.current = newState;
				};
				socket.onclose = () => {
					const newState = {
						targetBot: targetBot,
						userId: userId,
						presenceState: null,
					};
					setUserSessionData(newState);
					userSessionDataRef.current = newState;
					retryDelaySeconds += 5;
					if (safeClose == false) {
						console.log(
							"PresenceSentinel Socket Closed... trying to reconnect."
						);
						timeout = setTimeout(connect, retryDelaySeconds * 1000);
					} else console.log("PresenceSentinel Socket Closed.");
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
	}, [userId]);

	return (
		<UserSessionDataContext.Provider value={userSessionData}>
			<PlayerStationContextProvider
				targetBot={userSessionData.targetBot}
				guildId={userSessionData.presenceState?.voice.guildId}>
				<ApiCommandsHandler.Provider value={apiCommands}>
					{children}
				</ApiCommandsHandler.Provider>
			</PlayerStationContextProvider>
		</UserSessionDataContext.Provider>
	);
}
