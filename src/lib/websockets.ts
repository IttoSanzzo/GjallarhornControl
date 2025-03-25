"use server";

const connectionIp = process.env.SOCKET_LISTENER_IP;
const chariotPort = process.env.CHARIOT_PORT;
const gjallarhornPort = process.env.GJALLARHORN_PORT;
const socketUrlChariot = `ws://${connectionIp}:${chariotPort}`;
const socketUrlGjallarhorn = `ws://${connectionIp}:${gjallarhornPort}`;

class BotWebSocket {
	private webSocket: WebSocket | null = null;
	private socketUrl: string;

	constructor(targetBot: string) {
		this.socketUrl =
			targetBot === "ChariotSanzzo" ? socketUrlChariot : socketUrlGjallarhorn;
		this.createWebSocket();
	}
	private createWebSocket(): void {
		console.log(`CREATING NEW SOCKET for ${this.socketUrl}`);
		const ws = new WebSocket(this.socketUrl);
		const timeoutInSeconds = 15;

		ws.onopen = () => console.log(`✅ Conectado a ${this.socketUrl}`);
		ws.onerror = () => {
			console.error(`❌ Erro no WebSocket ${this.socketUrl}:`);
			console.log(
				`🔄 Tentando reconectar a ${this.socketUrl} em ${timeoutInSeconds} segundos`
			);
			setTimeout(() => {
				this.createWebSocket();
			}, timeoutInSeconds * 1000);
		};
		ws.onclose = () => {
			console.warn(`⚠️ WebSocket fechado: ${this.socketUrl}`);
			console.log(
				`🔄 Tentando reconectar a ${this.socketUrl} em ${timeoutInSeconds} segundos`
			);
			setTimeout(() => {
				this.createWebSocket();
			}, timeoutInSeconds * 1000);
		};
		this.webSocket = ws;
	}
	private async getSafeSocket(): Promise<WebSocket | null> {
		const socket = this.webSocket;
		if (!socket) return null;

		return new Promise((resolve) => {
			if (socket.readyState === WebSocket.OPEN) {
				resolve(socket);
			} else {
				resolve(null);
			}
		});
	}
	public async getSocket(): Promise<WebSocket | null> {
		return this.getSafeSocket();
	}
}

const chariotSocketManager = new BotWebSocket("ChariotSanzzo");
const gjallarhornSocketManager = new BotWebSocket("Gjallarhorn");

export async function getBotSocket(targetBot: string) {
	return targetBot === "ChariotSanzzo"
		? await chariotSocketManager.getSocket()
		: await gjallarhornSocketManager.getSocket();
}
