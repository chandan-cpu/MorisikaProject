const mongoose= require('mongoose');

const OrderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[
        {
            product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},
            quantity:{type:Number,default:1,min:1},
            priceAtPurchase:{type:Number,required:true}
        }
    ],
    totalAmount:{type:Number},
    status:{type:String,enum:['pending','paid','shipped','delivered','cancelled'],default:'pending'},
    paymentMethod:{type:String,enum:['card','paypal','cash'],default:'card'},
    shippingAddress:{
        type:String,
        required:true
    },
    orderType:{type:String, enum:['Cart','BuyNow'], default:'Cart'}

},{timestamps:true});

module.exports=mongoose.model('Order',OrderSchema);