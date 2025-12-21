const express=require('express');
const { createProduct, getAllProducts } = require('../controllers/product.controller');
const routes=express.Router();

routes.post('/add-Product',createProduct)
console.log('Product Routes Loaded');
routes.get('/getAllProducts',getAllProducts)

module.exports =routes;