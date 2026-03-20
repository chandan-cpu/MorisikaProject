const { model } = require('mongoose');
const mongoose = require('mongoose');
const Cart = require('../models/Cart.model')
const Order = require('../models/Order.model')
const Product = require('../models/Product.Model');
const { getAggregatedCart } = require('../utils/cartHelper');

const productAddedToCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    try {
        const cartExists = await Cart.findOneAndUpdate(
            { user: userId, 'items.product': productId },
            { $inc: { 'items.$.quantity': 1 } }
        )
        if (!cartExists) {
            const product = await Product.findById(productId);
            await Cart.findOneAndUpdate(
                { user: userId },
                { $push: { items: { product: productId, quantity: 1, priceAtAddition: product.price } } },
                { upsert: true }
            );
        }

   const updatedCartData = await getAggregatedCart(userId);

    return res.status(200).json({ 
      msg: 'Updated successfully', 
      cartItems: updatedCartData 
    });


    }
    catch (error) {
        return res.status(500).json({ msg: "Error: " + error.message });
    }
};

const removeFromCart = async (req, res) => {
    const userId = req.user.id;
    const { productId } = req.params;
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { user: userId },
            { $pull: { items: { product: productId } } },
            { new: true }
        ).populate('items.product');

        if (!updatedCart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        return res.status(200).json({
            msg: "Item removed successfully",
            cart: updatedCart
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Server Error: " + error.message
        });
    }
}

const getCart=async(req,res)=>{
    const userId = req.user.id;
    try {
        const cartData = await getAggregatedCart(userId);
        return res.status(200).json({ cartItems: cartData });
    } catch (error) {
        return res.status(500).json({ msg: "Server Error: " + error.message });
    }

}
const updateCartItemQuantity= async(req ,res)=>{
    try {
        const userId=req.user.id;
        const {productId, delta} = req.body;

        // Update the quantity mathematically in the database
        const cart =await Cart.findOneAndUpdate(
            { user: userId, 'items.product': productId },
            { $inc: { 'items.$.quantity': delta } },
            { new: true }
        )
        if (!cart) {
            return res.status(404).json({ msg: "Cart or Product not found" });
        }
        // return res.status(200).json({ msg: "Quantity updated successfully", cart });

        const updatedCartData=await getAggregatedCart(userId);
        return res.status(200).json({ msg: "Quantity updated successfully", cartItems: updatedCartData });
    } catch (error) {
        return res.status(500).json({ msg: "Server Error: " + error.message });
    }
}

module.exports = { productAddedToCart, removeFromCart, getCart, updateCartItemQuantity }