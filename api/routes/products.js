// Handles product related routes

const express = require('express');

// Conveniently handles routes with different endpoints
const router = express.Router();

// const mongoose = require('mongoose');

// import models
// const Product = require('../models/product');

// form parser
const multer = require('multer');

// JWT Middleware to Authenticate routes:
const checkAuth = require('../authenticators/check-auth');

// Import ProductsController
const ProductsController = require('../controllers/products');

// How files are stored
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

// only accept png files
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        // accept a file, and store
        cb(null, true);
    } else {
        // reject a file, do not save the file
    cb(null, false);
    } 
}
// specify a folder where multer will save incoming files.  Folder must be statically accessible.
const upload = multer({ 
    storage: storage , 
    limits: {
        fileSize: 1024 * 1024 * 5
    }, 
    fileFilter: fileFilter
});

// Handle incoming requests from '/products':
// Second argument is a hander function
// localhost:3000/products/
router.get('/', ProductsController.products_get_all);

// Post request body:
// {
// 	"name": "Smurfs",
// 	"value": 12.99,
//  "productImage": tlockhart.png
// }
// upload by multer gives us handlers used before main request handlers
// localhost:3000/products/
// Add checkAuth to authenticate path:  Express will automatically pass request into checkAuth
// checkAuth must be loaded after bodyparser, if sent as a token, but if sent in Authorization header, it doesn't matter
// router.post('/', checkAuth, upload.single('productImage'), ProductsController.products_create_product);
router.post('/product/insert', upload.single('productImage'), ProductsController.products_create_product);


// localhost:3000/products/5d75802fa50af037b063668d
router.get('/:productId', ProductsController.products_get_product);

// change data in the database (update)
// Patch Request Body: 
// [
// 	{
// 		"propName": "name",
// 		"value": "Harry Potter 7"
// 	},
// 	{
// 		"propName": "value",
// 		"value": "10"
// 	}
// ]
// localhost:3000/products/5d75802fa50af037b063668d
// NOTE: Authorization add 
router.patch('/product/update/:productId', checkAuth, ProductsController.products_update_product);

// localhost:3000/products/delte/5d75802fa50af037b063668d
// NOTE: Authorization added
router.delete('/product/delete/:productId', checkAuth, ProductsController.products_delete_product);

module.exports = router;