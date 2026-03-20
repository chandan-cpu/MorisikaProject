const express=require('express');
const { initialCheackout } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const { productAddedToCart, removeFromCart, getCart, updateCartItemQuantity } = require('../controllers/cartController');
const routes=express.Router();

routes.post('/add',authMiddleware,initialCheackout);
routes.post('/addcart/:productId',authMiddleware,productAddedToCart);
routes.delete('/remove/:productId',authMiddleware,removeFromCart);
routes.get('/get',authMiddleware,getCart);
routes.put('/update-quantity',authMiddleware,updateCartItemQuantity);


module.exports =routes;