// import dotenv
require("dotenv").config();

// package to help spin up server
const http = require('http');

// Import the express app module from app.js to act as a request handler
const app = require('./app');

// const port = process.env.PORT || 3000;
const port = process.env.PORT || 3001;


// create server
const server = http.createServer(app);

// Start server listening on port
server.listen(port);
console.log(`server listening at http://localhost:${port}`);