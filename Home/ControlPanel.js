console.log("ControlPanel Start");

/* Socket */
const queryParams = getQueryParams();

console.log("TargetBot is " + queryParams["targetBot"]);
var port;
if (queryParams["targetBot"] == "Gjallarhorn")
	port = 11367;
else
	port = 11368;

var socket = new WebSocket(`ws://localhost:${port}/`);
socket.addEventListener('open', () => {
	console.log('Conectado ao servidor WebSocket');
});
console.log(`Servidor WebSocket ouvindo na porta ${port}`);

function SendSocketCall(content) {
	if (socket.readyState == WebSocket.OPEN) {
		console.log("Socket!\n" + content);
		socket.send(content);
	}
	else
		console.log('A conexão WebSocket não está aberta.');
}

function getQueryParams() {
	const params = new URLSearchParams(window.location.search);
	const result = {};
	for (const [key, value] of params.entries())
		result[key] = value;
	return (result);
}

/* Buttons Interactivity */
function SocketPlayCall(link) {
	if (queryParams["userId"] == "") {
		alert("UserId Empty!");
		return;
	}
	var body = "";
	body += `<|Command|><|Value|>Play\n`;
	body += `<|Color|><|Value|>#FF0000\n`;
	body += `<|Link|><|Value|>${link}\n`;
	if (queryParams["channelId"] != "")
		body += `<|ChatChannelId|><|Value|>${queryParams["channelId"]}\n`;
	body += `<|UserId|><|Value|>${queryParams["userId"]}`;
	SendSocketCall(body);
}

console.log("ControlPanel End");