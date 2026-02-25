const express=require('express');
const { createProduct, updateProduct, deleteProduct, getAllProduct} = require('../controllers/product.controller');
const routes=express.Router();
const upload=require('../middlewares/upload')


routes.post('/upload',upload.array("images",10),createProduct)
routes.put('/update/:id',upload.array("images",5),updateProduct)
routes.delete('/delete/:id',deleteProduct);
routes.get('/all',getAllProduct);



module.exports =routes;