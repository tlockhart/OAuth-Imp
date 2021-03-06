// Dependencies
/*************************/
// import dotenv
require("dotenv").config();

// use multipart data 5/17/2020
const formData = require('express-form-data');
// const cors = require('cors');

// import required modules
const morgan = require('morgan');
const bodyParser = require('body-parser');

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
// Define routes here to get body parser working
const routes = require("./api/routes");
// initialize express
const app = express();
// const csp = require('express-csp-header');

// Set port
const port = process.env.PORT || 3001;


//5/17/2020:
// use multipart data:
app.use(formData.parse());

// app.use(bodyParser.json({limit: '200mb'}));
// app.use(bodyParser.urlencoded({limit: '200mb', extended: true}));
/*********************************************/
// Define middleware here 5/17/2020
/*********************************************/
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.json({limit: '5024mb'}));
app.use(express.urlencoded({limit: '5024mb', extended: true }));

//Content-Security-Policy
// app.use(csp({
//     policies: {
//         'default-src': [csp.SELF],
//         'script-src': [csp.SELF, csp.INLINE, 'somehost.com'],
//         'style-src': [csp.SELF, 'mystyles.net'],
//         'img-src': ['data:', 'images.com'],
//         'worker-src': [csp.NONE],
//         'block-all-mixed-content': true
//     }
// }));

// Append headers to any response sent back, before routes, to disable cors errors
app.use((req, res, next) => {
    // Header 1: restrict to certain URL
    // res.header('Access-Control-Allow-Origin', 'http://my-cool-page.com'); 

    // Set Cross Access Control Header to all incoming URLS
    res.header('Access-Control-Allow-Origin', '*'); 

    // Header 2: Set which Headers can be accepted along with a request
    // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Headers', '*');

    // Header 3: An options incoming request.meth is equal to options.  A browser will always send an options request first when you make an HTTP request, where the browser determines if he is allowed to make the actual request (Post Flight Check);
    if ( req.method === 'OPTIONS') {
        // Allow all HTTP REQUESTS
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    // Set content-type header for all request
    // res.set("Content-Type", "application/json");

    // Header 4: Call next, so that other routes can handle the next (real) request
    next();
});


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

