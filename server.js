// const path = require('path');

// import dotenv
require("dotenv").config();

// import required modules
const morgan = require('morgan');
const bodyParser = require('body-parser');

const express = require('express');
const mongoose = require('mongoose');
const routes = require("./api/routes");
const app = express();
const port = process.env.PORT || 3001;


// Define middleware here
// ************************************************
app.use(express.urlencoded({limit: '50mb',extended: true }));
app.use(express.json({limit: '50mb'}));

// Serve up static assets
//***************************** */
if (process.env.NODE_ENV === 'production') {
    	app.use(express.static('client/build'));
    }

// Add routes, both API and view
// ************************************************
app.use(routes);

//Connect to MongoDB
// ************************************************
mongoose.connect(
    // 'mongodb+srv:'+'//'+
    //  process.env.MONGO_ATLAS_ID + ':' + process.env.MONGO_ATLAS_PW +
    // '@node-rest-shop-77xp2.mongodb.net/test?retryWrites=true&w=majority', 
    process.env.MONGODB_URI,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    });


// Handle Deprecation warning.  Use javascript default promises instead of mongoose
// ************************************************
mongoose.Promise = global.Promise;

app.use(morgan('dev'));

// 12/22/2019: Increase File Size
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb',extended: true }));


app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Start the API server
// ************************************************
app.listen(port, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${port}!`);
});
// ************************************************

// package to help spin up server
// const http = require('http');

// Import the express app module from app.js to act as a request handler
// const app = require('./app');

// const port = process.env.PORT || 3001;


// create server
// const server = http.createServer(app);

// // Start server listening on port
// server.listen(port);
// console.log(`server listening at http://localhost:${port}`);
// if (process.env.NODE_ENV === 'production') {
// 	app.use(express.static('client/build'));
// }

