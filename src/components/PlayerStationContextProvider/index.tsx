"use client";

import { PlayerStationState } from "@/lib/types/PlayerStationState";
import { createContext, ReactNode, useEffect, useState } from "react";

export const PlayerStationContext = createContext<PlayerStationState | null>(
	null
);

interface PlayerStationContextProviderProps {
	children?: ReactNode;
	targetBot: string;
	guildId?: string;
}
export function PlayerStationContextProvider({
	guildId,
	targetBot,
	children,
}: PlayerStationContextProviderProps) {
	const [playerState, setPlayerState] = useState<PlayerStationState | null>(
		null
	);

	useEffect(() => {
		if (guildId == null || guildId == "0") return;
		let socket: WebSocket | null = null;
		let safeClose: boolean = false;
		let retryDelaySeconds = 0;
		let timeout: NodeJS.Timeout | null = null;

		function connect() {
			try {
				socket = new WebSocket(
					`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/live/${targetBot}/${guildId}/player-update-socket`.replace(
						"https://",
						"wss://"
					)
				);
				socket.onopen = () => {
					console.log("PlayerUpdate Socket Connected");
					retryDelaySeconds = 0;
				};
				socket.onmessage = (event) => {
					console.log("PlayerUpdate Message Received: ", event.data);
					const data: PlayerStationState = JSON.parse(event.data);
					const newState =
						data.lastCommandResult.command == "Stop" &&
						data.lastCommandResult.wasSuccess == true
							? null
							: data;
					setPlayerState(newState);
				};
				socket.onclose = () => {
					setPlayerState(null);
					retryDelaySeconds += 5;
					if (safeClose == false) {
						console.log("PlayerUpdate Socket Closed... trying to reconnect.");
						timeout = setTimeout(connect, retryDelaySeconds * 1000);
					} else console.log("PlayerUpdate Socket Closed.");
				};
				socket.onerror = () => {
					socket?.close();
				};
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
	}, [targetBot, guildId]);

	return (
		<PlayerStationContext.Provider
			value={playerState}
			children={children}
		/>
	);
}
