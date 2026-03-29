const Cart = require('../models/Cart.model')
const Order = require('../models/Order.model')
const Product = require('../models/Product.Model');

const buildUpiLink = ({ upiId, amount, orderId }) => {
    const params = new URLSearchParams({
        pa: upiId,
        pn: 'Moriskia Store',
        am: Number(amount).toFixed(2),
        cu: 'INR',
        tn: `Order payment ${orderId}`,
        tr: orderId,
    });

    return `upi://pay?${params.toString()}`;
};

const validateShippingAddress = (shippingAddress = {}) => {
    const requiredFields = ['fullName', 'phone', 'addressLine1', 'city', 'state', 'pincode'];
    const missingField = requiredFields.find((field) => !shippingAddress[field]);
    return !missingField;
};

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
            } else {
                // Logic for Cart Checkout
                const cart = await Cart.findOne({ user: userId }).populate('items.product');
                if (!cart || cart.items.length === 0) {
                    return res.status(400).json({ msg: 'Cart is empty' })
                }

                checkoutItems = cart.items.map(item => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                    priceAtPurchase: item.priceAtAddition
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

const createOrderWithAddress = async (rq, res) => {
    try {
        const userId = rq.user.id;
        const { shippingAddress, paymentMethod = 'upi', upiId } = rq.body;
        const merchantWhatsAppNumber = (process.env.MERCHANT_WHATSAPP_NUMBER || process.env.DEFAULT_WHATSAPP_NUMBER || '7637839831').replace(/\D/g, '');

        if (!validateShippingAddress(shippingAddress)) {
            return res.status(400).json({ error: "Invalid address" });
        }

        const cart = await Cart.findOne({ user: userId }).populate('items.product');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ msg: 'Cart is empty' });
        }

        const orderItems = cart.items.map((item) => ({
            product: item.product._id,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtAddition,
        }));

        const totalAmount = orderItems.reduce((sum, item) => {
            return sum + (item.priceAtPurchase * item.quantity);
        }, 0);

        const orderId = `ORD-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        const selectedUpiId = upiId || process.env.MERCHANT_UPI_ID || process.env.DEFAULT_UPI_ID || '7099414274@ptaxis';

        if (paymentMethod === 'upi' && !selectedUpiId) {
            return res.status(400).json({ msg: 'Merchant UPI ID is not configured on server' });
        }

        const upiLink = paymentMethod === 'upi'
            ? buildUpiLink({ upiId: selectedUpiId, amount: totalAmount, orderId })
            : null;

        const order = await Order.create({
            user: userId,
            orderId,
            items: orderItems,
            totalAmount,
            shippingAddress,
            paymentMethod,
            upiId: paymentMethod === 'upi' ? selectedUpiId : null,
            upiLink,
            paymentStatus: 'pending',
            status: 'pending',
            orderType: 'Cart',
        });

        // Clear cart after checkout initiation.
        await Cart.findOneAndUpdate(
            { user: userId },
            { $set: { items: [] } },
            { new: true }
        );

        return res.status(201).json({
            msg: 'Order created successfully',
            orderId: order.orderId,
            totalAmount: order.totalAmount,
            upiLink: order.upiLink,
            merchantWhatsAppNumber,
        });




    } catch (error) {
        return res.status(500).json({ msg: 'Server Error:' + error.message });

    }
}


module.exports = { initialCheackout, createOrderWithAddress };