console.log("START -> server.js Initialization");

// 0. Initialization
require("dotenv").config();
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/api');
const app = express();
const PORT = process.env.PORT;

// 1. Uses
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use('/api', apiRoutes);
app.use(express.static("public"));

// 2. Route to serve main index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 3. Start Server
app.listen(PORT, () => {
	console.log(`Main Server running at port: ${PORT}`);
});

console.log("END   -> server.js Initialization");