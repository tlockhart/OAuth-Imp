// Import product routes. 
const router = require("express").Router(); 
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const userRoutes = require('./user');

/************************************
 * RouteHandler 2: Product routes
 * Purpose: Handles "/api/products" URLS
 * Description: First Parameter is a filter: '/api/',
 * requests followed by "/products" will
 * be handled by the second argument "productRoutes".
 * *******************************************/
// Addroutes, both api and view
router.use('/products', productRoutes);
router.use('/orders', orderRoutes);
router.use('/user', userRoutes);

module.exports = router;