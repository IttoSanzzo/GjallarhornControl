console.log("START -> api.js Initialization");

// 0. Initialization
const express = require("express");
const { Client } = require("@notionhq/client");
const router = express.Router();
const apiKey = process.env.NOTION_KEY;
const pageId = process.env.NOTION_PAGE_ID;
const notion = new Client({ auth: apiKey });
console.log(`apiKey is: ${apiKey}\npageId is: ${pageId}`);

// Get
var runCount = 0;
router.get("/databases", async function (request, response) {
	console.log(`Trying to get from API for ${request.query.targetBot}: ${++runCount}`);
	try {
		let searchName = request.query.searchName;
		console.log(`$API for query: ${searchName}`);
		const receivedDb = await notion.databases.query({
			database_id: pageId,
			filter: {
				and: [
					{
						property: "Bot",
						multi_select: {
							contains: request.query.targetBot
						}
					},
					{
						property: "Name",
						title: {
							contains: searchName
						}
					}
				]
			}
		});
		response.json({ message: "success!", data: receivedDb });
	} catch (error) {
		response.json({ message: "error", error });
	}
});

router.get("/socketip", async function (request, response) {
	console.log(`Trying to get from IP Adress for GjallarhornSocketConnection`);
	try {
		let ipAdress = null;
		fetch('https://api.ipify.org?format=json').then(response => response.json()).then(data => {
			ipAdress = data.ip;
			response.json({ message: "success!", data: ipAdress });
		}).catch(error => {
			console.error('Error obtaining the IP Adress', error);
		});
	} catch (error) {
		response.json({ message: "error", error });
	}
});

// E. Miscs
module.exports = router;
console.log("END   -> api.js Initialization");