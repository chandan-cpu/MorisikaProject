const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  // Link to the User Model
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [
    {
      // Link to the Product Model
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1
      },
      // We store the price at the time of adding to cart
      priceAtAddition: {
        type: Number,
        required: true
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Cart', CartSchema);