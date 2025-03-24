"use server";

const connectionIp = process.env.SOCKET_LISTENER_IP;
const chariotPort = process.env.CHARIOT_PORT;
const gjallarhornPort = process.env.GJALLARHORN_PORT;
const socketUrlChariot = `ws://${connectionIp}:${chariotPort}`;
const socketUrlGjallarhorn = `ws://${connectionIp}:${gjallarhornPort}`;

class BotWebSocket {
	private webSocket: WebSocket | null = null;

	constructor(targetBot: string) {
		this.webSocket =
			targetBot === "ChariotSanzzo"
				? this.createWebSocket(socketUrlChariot)
				: this.createWebSocket(socketUrlGjallarhorn);
	}
	private createWebSocket(url: string): WebSocket {
		console.log(`CREATING NEW SOCKET for ${url}`);
		const ws = new WebSocket(url);

		ws.onopen = () => console.log(`✅ Conectado a ${url}`);
		ws.onerror = (err) => console.error(`❌ Erro no WebSocket ${url}:`, err);
		ws.onclose = () => {
			console.warn(`⚠️ WebSocket fechado: ${url}`);
			setTimeout(() => {
				console.log(`🔄 Tentando reconectar em ${url}`);
				this.createWebSocket(url);
			}, 5000);
		};

		return ws;
	}
	public async waitForSocket(): Promise<WebSocket | null> {
		const socket = this.webSocket;
		if (!socket) return null;

		return new Promise((resolve, reject) => {
			if (socket.readyState === WebSocket.OPEN) {
				resolve(socket);
			} else {
				socket.onopen = () => resolve(socket);
				socket.onerror = (err) => reject(err);
			}
		});
	}
	public async getSocket(): Promise<WebSocket | null> {
		return this.waitForSocket();
	}
}

const chariotSocketManager = new BotWebSocket("ChariotSanzzo");
const chariotWS = await chariotSocketManager.getSocket();

const gjallarhornSocketManager = new BotWebSocket("Gjallarhorn");
const gjallarhornWS = await gjallarhornSocketManager.getSocket();

async function waitForSocket(
	socket: WebSocket | null
): Promise<WebSocket | null> {
	if (!socket) return null;
	return new Promise((resolve, reject) => {
		if (socket.readyState === WebSocket.OPEN) {
			resolve(socket);
		} else {
			socket.onopen = () => resolve(socket);
			socket.onerror = (err) => reject(err);
		}
	});
}

export async function getBotSocket(targetBot: string) {
	return targetBot === "ChariotSanzzo"
		? await waitForSocket(chariotWS)
		: await waitForSocket(gjallarhornWS);
}
