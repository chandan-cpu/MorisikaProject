const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 🆔 Public Order ID (Important)
    orderId: {
        type: String,
        unique: true,
        required: true,
    },
    items: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, default: 1, min: 1 },
            priceAtPurchase: { type: Number, required: true }
        }
    ],
    totalAmount: { type: Number },
    status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, enum: ['upi', 'cod', 'whatsapp'], default: 'upi' },

    // 🏦 UPI Details
    upiId: {
        type: String,
        default: null,
    },
    // 🔗 Store UPI Link (optional)
    upiLink: {
        type: String,
    },
    // 🧾 Transaction ID (UTR)
    utr: {
        type: String,
        default: null,
    },
    // ⏱️ Payment Time
    paidAt: {
        type: Date,
    },


    // 💸 Payment Status (Separate - Best Practice)
    paymentStatus: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },

        addressLine1: { type: String, required: true },
        addressLine2: { type: String },

        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },

        country: { type: String, default: "India" }
    },
    orderType: { type: String, enum: ['Cart', 'BuyNow'], default: 'Cart' }

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);