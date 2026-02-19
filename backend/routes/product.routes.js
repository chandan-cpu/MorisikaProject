const express=require('express');
const { createProduct} = require('../controllers/product.controller');
const routes=express.Router();
const upload=require('../middlewares/upload')


routes.post('/upload',upload.array("images",10),createProduct)

module.exports =routes;