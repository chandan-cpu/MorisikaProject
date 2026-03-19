const Cart = require('../models/Cart.model')
const Order = require('../models/Order.model')
const Product = require('../models/Product.Model');

const initialCheackout = async (req, res) => {
    try {
        const userId = req.user.id;
        // console.log("Initiating checkout for user:", userId);

        const { buyNowProduct, isDirectBuy } = req.body;
        // console.log("Buy Now Product:", buyNowProduct, "Is Direct Buy:", isDirectBuy);

        try {
            let checkoutItems = [];
            let totalAmount = 0;

            if (isDirectBuy) {
                const product = await Product.findById(buyNowProduct.productId);
                console.log("Fetched product for Buy Now:", product);
                if (!product) {
                    return res.status(404).json({ msg: 'Product not found' })
                }

                checkoutItems.push({
                    productId: buyNowProduct.productId,
                    quantity: buyNowProduct.quantity || 1,
                    priceAtPurchase: product.discountPrice || product.price
                });
                totalAmount = (product.discountPrice || product.price) * (buyNowProduct.quantity || 1);
            } else{
                // Logic for Cart Checkout
                const cart= await Cart.findOne({user:userId}).populate('items.product');
                if(!cart || cart.items.length===0)
                {
                    return res.status(400).json({msg:'Cart is empty'})
                }

                checkoutItems=cart.items.map(item=>({
                    productId:item.product._id,
                    quantity:item.quantity,
                    priceAtPurchase:item.priceAtAddition
                }))

                totalAmount = cart.items.reduce((sum, item) => {
                    return sum + (item.priceAtAddition * item.quantity);
                }, 0);

            }

            return res.status(200).json({
                msg: "Checkout initiated successfully",
                checkoutItems,
                totalAmount
            })
            

            //create 
        } catch (error) {
            return res.status(500).json({ msg: 'Server Error:' + error.message });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Server Error:' + error.message });
    }
}


module.exports = { initialCheackout };