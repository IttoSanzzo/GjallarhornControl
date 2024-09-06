console.log("START -> SocketHandler Initialization");

/* Socket */
console.log("TargetBot is " + queryParams["targetBot"]);
let port;
if (queryParams["targetBot"] == "Gjallarhorn")
	port = 11767;
else
	port = 11768;
const socketUrl = `https://189.24.27.5:${port}/`;
let socket;
createWebSocket(socketUrl);

function createWebSocket(url) {
	socket = new WebSocket(url);
	socket.addEventListener('close', () => {
		showNotification(5, "red", "Error: Socket Closed! Retrying...");
		retryConnection(5);
	});
	socket.addEventListener('open', () => {
		console.log(`Conectado ao servidor WebSocket pela porta ${port}`);
		showNotification(3, "green", "Connected");
		SocketMessageCall("A Control Panel was connected!");
	});
}

/* Buttons Interactivity */
function SocketSimpleCall(command) {
	let body = "";
	body += `<|Command|><|Value|>${command}\n`;
	if (queryParams["channelId"] != "")
		body += `<|ChatChannelId|><|Value|>${queryParams["channelId"]}\n`;
	body += `<|UserId|><|Value|>${queryParams["userId"]}`;
	SendSocketMessage(body);
}
function SocketMessageCall(message) {
	let body = "";
	body += `<|Command|><|Value|>Message\n`;
	body += `<|Color|><|Value|>#00FF00\n`;
	body += `<|Message|><|Value|>${message}\n`;
	if (queryParams["channelId"] != "")
		body += `<|ChatChannelId|><|Value|>${queryParams["channelId"]}\n`;
	body += `<|UserId|><|Value|>${queryParams["userId"]}`;
	SendSocketMessage(body);
}
function SocketPlayCall(link) {
	let body = "";
	body += `<|Command|><|Value|>Play\n`;
	body += `<|Color|><|Value|>#FF0000\n`;
	body += `<|Link|><|Value|>${link}\n`;
	if (queryParams["channelId"] != "")
		body += `<|ChatChannelId|><|Value|>${queryParams["channelId"]}\n`;
	body += `<|UserId|><|Value|>${queryParams["userId"]}`;
	SendSocketMessage(body);
}
function SendSocketMessage(content) {
	if (socket.readyState == WebSocket.OPEN) {
		console.log("Socket Message Sent!\n" + content);
		socket.send(content);
		showNotification(3, "green",);
	}
	else
		alert('Error in WebSocket Connection (Probably not open.)');
}

// E. Miscs
function getQueryParams() {
	const params = new URLSearchParams(window.location.search);
	const result = {};
	for (const [key, value] of params.entries())
		result[key] = value;
	return (result);
}
function retryConnection(seconds) {
	console.log(`Tentando reconectar em ${seconds} segundos...`);
	setTimeout(() => {
		createWebSocket(socketUrl);
	}, seconds * 1000);
}
function showNotification(duration, color, content) {
	const notification = document.getElementById('notification');
	if (content != undefined)
		notification.textContent = content;
	notification.style.visibility = 'visible';
	notification.style.backgroundColor = color;
	notification.style.opacity = '1';
	setTimeout(() => {
		notification.style.opacity = '0';
		notification.style.visibility = 'hidden';
		notification.textContent = "Done";
	}, 1000 * duration);
}

console.log("END   -> SocketHandler Initialization");