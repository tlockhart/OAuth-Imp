// Handle requests

// import modules
const express = require('express');
//inclue proxy
// ponst proxy = require('http-proxy-middleware');
// // proxy middleware options
// var options = {
//     target: 'http://www.example.org', // target host
//     changeOrigin: true, // needed for virtual hosted sites
//     ws: true, // proxy websockets
//     pathRewrite: {
//       '^/api/old-path': '/api/new-path', // rewrite path
//       '^/api/remove/path': '/path' // remove base path
//     },
//     router: {
//       // when request.headers.host == 'dev.localhost:3000',
//       // override target 'http://www.example.org' to 'http://localhost:8000'
//       'dev.localhost:3001': 'http://localhost:8000'
//     }
//   };
  
//   // create the proxy (without context)
//   app.use('/api', exampleProxy);
const app = express();

// shorthand syntax for the example above:
// var apiProxy = proxy('http://www.example.org/api');

const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Import product routes.  
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

//Connect to MongoDB1
mongoose.connect(
    // 'mongodb+srv:'+'//'+
    //  process.env.MONGO_ATLAS_ID + ':' + process.env.MONGO_ATLAS_PW +
    // '@node-rest-shop-77xp2.mongodb.net/test?retryWrites=true&w=majority', 
    process.env.MONGODB_URI,
    { 
        useCreateIndex: true,
        useNewUrlParser: true ,
        useUnifiedTopology: true 
    });
    

    // Handle Deprecation warning.  Use javascript default promises instead of mongoose
    mongoose.Promise = global.Promise;

app.use(morgan('dev'));

// Make uploads folder publicly available:
// app.use('/uploads', express.static('uploads'));

// app.use(bodyParser.urlencoded({extended: false})); // parse simple body and url encoded data, not extended bodies with rich data
// app.use(bodyParser.json()); // parse json data, and make it easily readable

// 12/22/2019: Increase File Size
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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
    // Header 4: Call next, so that other routes can handle the next (real) request
    next();
});

// Example 1: Funnel every request to the same response
// app.use((req, res, next) => {
//     // send json response with status code
//     res.status(200).json({
//         message: 'It works!'
//     });
// });

// Example 2: Request are forwarded to app.js, if route is /products (filter)
// Any request starting with /products will be forwarded to the productRoutes (products.js)
// localhost:3000/products/
app.use('/products', productRoutes);

// Example 3: forward order requests
// localhost:3000/orders/
app.use('/orders', orderRoutes);

// Example 4: forward order requests
// localhost:3000/user/
app.use('/user', userRoutes);

// Catch errors that make it past Example 1, 2, 3, or 4 route, for no route for requested page, with no filter (/orders)
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404; // No fitting route
    next(error); // Forward the error request
});

// Handles all errors thrown for DB Failures
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message,
        }
    });
});

module.exports = app;