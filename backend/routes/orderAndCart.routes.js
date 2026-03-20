const express=require('express');
const { initialCheackout } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middlewares');
const { productAddedToCart, removeFromCart, getCart } = require('../controllers/cartController');
const routes=express.Router();

routes.post('/add',authMiddleware,initialCheackout);
routes.post('/addcart/:productId',authMiddleware,productAddedToCart);
routes.delete('/remove/:productId',authMiddleware,removeFromCart);
routes.get('/get',authMiddleware,getCart);


module.exports =routes;