// A reusable function to get the aggregated cart
const { model } = require('mongoose');
const mongoose = require('mongoose');
const Cart = require('../models/Cart.model')

const getAggregatedCart = async (userId) => {
    return await Cart.aggregate([
        { $match: { user: new mongoose.Types.ObjectId(userId) } },
        { $unwind: "$items" },
        {
            $lookup: {
                from: "products",
                localField: "items.product",
                foreignField: "_id",
                as: "details"
            }
        },
        { $unwind: "$details" },
        {
            $project: {
                _id: 0,
                productId: "$items.product",
                quantity: "$items.quantity",
                name: "$details.name",
                price: "$details.price",
                image: { $arrayElemAt: ["$details.images", 0] }
            }
        }
    ]);
};
module.exports = { getAggregatedCart };