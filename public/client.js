/* Global Variables */

const queryParams = getQueryParams();
const targetBot = queryParams["targetBot"];
let dbResponseContainer;

/* Fetch Function */
async function getSoundsTable() {
	try {
		const endpoint = new URL("/api/databases", window.location.origin);
		endpoint.searchParams.append("targetBot", queryParams["targetBot"]);
		const response = await fetch(endpoint, {
			method: "GET",

		});
		return (await response.json());
	} catch (ex) {
		console.error(`Handled Error: ${ex}`);
		return;
	}
}

async function postTable() {
	const body = "TEST STRING";
	try {
		const newDBResponse = await fetch("/api/databases", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body
		});
		const newDBData = await newDBResponse.json();
		appendApiResponse(newDBData, dbResponseEl);
	} catch (ex) {
		console.error(`Handled Error: ${ex}`);
		return;
	}
}

// 0. Start
document.addEventListener('DOMContentLoaded', async () => {
	console.log("DOM Loaded");
	try {
		document.title = `${targetBot} ControlPanel`;
		dbResponseContainer = document.getElementById("centralContainer");
		const soundTable = await getSoundsTable();
		await doButtons(soundTable.data.results);
		if (targetBot == "Gjallarhorn")
			await removeFutilButtons();
	} catch (ex) {
		console.error(`Handled Error: ${ex}`);
	}
});

// 1. Modify Document
async function doButtons(data) {
	for (let index = data.length - 1; index >= 0; index--) {
		const category = data[index].properties.Category.select.name;
		const name = data[index].properties.Name.title[0]?.plain_text;
		const link = data[index].properties.Link.url;
		var description = null;
		if (data[index].properties.Description.rich_text[0]?.plain_text != null)
			description = data[index].properties.Description.rich_text[0].plain_text;
		await newButton(await getGroup(category), name, link, description);
	}
}

/* E. Misc Functions */
async function getGroup(groupId) {
	const groupIdName = `Category${await getNormalizedId(groupId)}`
	let group = document.getElementById(groupIdName);
	if (group != null)
		return (group);
	group = document.createElement("div");
	group.id = groupIdName;
	group.className = "sfxGroupContainer";
	group.textContent = "";
	const groupTitle = document.createElement("h1");
	groupTitle.textContent = groupId;
	group.appendChild(groupTitle);
	const buttonsContainer = document.createElement("div");
	buttonsContainer.className = "sfxButtonsContainer";
	group.appendChild(buttonsContainer);
	dbResponseContainer.appendChild(group);
	return (group);
}
async function getButtonsContainer(group) {
	const elements = group.getElementsByClassName("sfxButtonsContainer");
	return (elements[0]);
}
async function newButton(group, name, link, description) {
	const button = document.createElement("button");
	button.type = "button";
	button.setAttribute("onclick", `SocketPlayCall('${link}')`);
	button.textContent = `「 ${name} 」`;
	if (description != null)
		button.title = description;
	else
		button.title = "No Description Provided...";
	const container = await getButtonsContainer(group);
	container.appendChild(button);
	return (button);
}
async function removeFutilButtons() {
	const previousButton = document.getElementById("previousButton");
	const nextButton = document.getElementById("nextButton");
	const shuffleButton = document.getElementById("shuffleButton");
	const resetButton = document.getElementById("resetButton");
	previousButton.remove();
	nextButton.remove();
	shuffleButton.remove();
	resetButton.remove();
}
async function getNormalizedId(id) {
	return (id.replace(/\s+/g, ''));
}
function getQueryParams() {
	const params = new URLSearchParams(window.location.search);
	const result = {};
	for (const [key, value] of params.entries())
		result[key] = value;
	return (result);
}