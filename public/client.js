/* Global Variables */

const queryParams = getQueryParams();
const targetBot = queryParams["targetBot"];
let dbResponseContainer;
let searchBar;
let searchName = "";

/* Fetch Function */
async function getSoundsTable() {
	try {
		const endpoint = new URL("/api/databases", window.location.origin);
		endpoint.searchParams.append("targetBot", queryParams["targetBot"]);
		endpoint.searchParams.append("searchName", searchName);
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
		await addSearchBarListner();
		await loadButtons();
		if (targetBot == "Gjallarhorn")
			await removeFutilButtons();
		await initializeSocket();
	} catch (ex) {
		console.error(`Handled Error: ${ex}`);
	}
});

// 0. Search Bar
let searchBarReset;
let timeout;
async function addSearchBarListner() {
	searchBarButtons = document.getElementById("searchBarButtons");
	searchBar = document.getElementById("searchBar");
	document.addEventListener("keyup", function (event) {
		if (event.key == "Enter") {
			event.preventDefault();
			if (searchBar.value === "")
				return (resetSearchBar());
			searchBarButtons.style.visibility = 'visible';
			searchBar.focus();
			return;
		}
	})
	searchBar.addEventListener("keyup", function (event) {
		searchName = searchBar.value;
		if (event.key == "Enter") {
			event.preventDefault();
			clearTimeout(timeout);
			playSearchBar();
			return;
		}
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			if (searchBar.value === "")
				return (resetSearchBar());
			searchBarButtons.style.visibility = 'visible';
			loadButtons().then;
		}, 900);
	});
}
function resetSearchBar() {
	showNotification(3, "Green", "Cleaned");
	searchBarButtons.style.visibility = 'hidden';
	searchBar.value = "";
	searchName = "";
	loadButtons().then;
}
function playSearchBar() {
	searchBar = document.getElementById("searchBar");
	SocketPlayCall(searchBar.value);
	resetSearchBar();
}

// 1. Modify Document
async function loadButtons() {
	const soundTable = await getSoundsTable();
	resetButtons();
	await doButtons(soundTable.data.results);
}
async function doButtons(data) {
	for (let index = data.length - 1; index >= 0; index--) {
		const category = data[index].properties.Category.multi_select[0].name;
		const name = data[index].properties.Name.title[0]?.plain_text;
		const link = data[index].properties.Link.url;
		var description = null;
		if (data[index].properties.Description.rich_text[0]?.plain_text != null)
			description = data[index].properties.Description.rich_text[0].plain_text;
		await newButton(await getGroup(category), name, link, description);
	}
}
function resetButtons() {
	let groups = document.getElementsByClassName("sfxGroupContainer");
	if (groups[0] != null && groups[0] != undefined) {
		do {
			groups[0].remove();
			groups = document.getElementsByClassName("sfxGroupContainer");
		} while (groups[0] != null && groups[0] != undefined);
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