console.log("START -> SocketHandler Initialization");

/* Socket */
console.log("TargetBot is " + queryParams["targetBot"]);
let port;
if (queryParams["targetBot"] == "Gjallarhorn")
	port = 11367;
else
	port = 11368;

var socket = new WebSocket(`ws://localhost:${port}/`);

socket.addEventListener('open', () => {
	console.log(`Conectado ao servidor WebSocket pela porta ${port}`);
});

/* Buttons Interactivity */
function SocketSimpleCall(command) {
	let body = "";
	body += `<|Command|><|Value|>${command}\n`;
	body += `<|Color|><|Value|>#FF0000\n`;
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

console.log("END   -> SocketHandler Initialization");