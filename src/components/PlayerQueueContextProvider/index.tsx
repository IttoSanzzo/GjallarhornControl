"use client";

import { PlayerQueueState } from "@/lib/types/PlayerQueueState";
import { createContext, ReactNode, useEffect, useState } from "react";

export const PlayerQueueContext = createContext<PlayerQueueState | null>(null);

interface PlayerQueueContextProviderProps {
	children?: ReactNode;
	targetBot: string;
	guildId?: string;
}
export function PlayerQueueContextProvider({
	guildId,
	targetBot,
	children,
}: PlayerQueueContextProviderProps) {
	const [playerQueueState, setPlayerQueueState] =
		useState<PlayerQueueState | null>(null);

	useEffect(() => {
		if (guildId == null || guildId == "0") return;
		let socket: WebSocket | null = null;
		let safeClose: boolean = false;
		let retryDelaySeconds = 0;
		let timeout: NodeJS.Timeout | null = null;

		function connect() {
			try {
				socket = new WebSocket(
					`${process.env.NEXT_PUBLIC_CHARIOT_API_FULL_ADDRESS}/live/${targetBot}/${guildId}/queue-update-socket`.replace(
						"https://",
						"wss://",
					),
				);
				socket.onopen = () => {
					if (process.env.NODE_ENV == "development")
						console.log("QueueUpdate Socket Connected");
					retryDelaySeconds = 0;
				};
				socket.onmessage = (event) => {
					if (process.env.NODE_ENV == "development")
						console.log("QueueUpdate Message Received: ", event.data);
					const data: PlayerQueueState = JSON.parse(event.data);
					setPlayerQueueState(data);
				};
				socket.onclose = () => {
					setPlayerQueueState(null);
					retryDelaySeconds += 5;
					if (safeClose == false) {
						if (process.env.NODE_ENV == "development")
							console.log("QueueUpdate Socket Closed... trying to reconnect.");
						timeout = setTimeout(connect, retryDelaySeconds * 1000);
					} else if (process.env.NODE_ENV == "development")
						console.log("QueueUpdate Socket Closed.");
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
	}, [guildId]);

	return (
		<PlayerQueueContext.Provider
			value={playerQueueState}
			children={children}
		/>
	);
}
