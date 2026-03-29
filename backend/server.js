const dns = require('dns');
const express=require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes=require('./routes/auth.routes');
const productRoutes=require('./routes/product.routes.js')
const cloudeRoute=require('./routes/upload')
const orderAndCartRoutes=require('./routes/orderAndCart.routes');

require('dotenv').config();
const app=express();
const PORT=process.env.PORT

// CORS Configuration
app.use(cors({
  origin: ['https://x8xp936p-5173.inc1.devtunnels.ms', 'https://x8xp936p-5174.inc1.devtunnels.ms','http://localhost:5173'], // Support both Vite ports
  credentials: true // Allow cookies
}));

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes);
// app.use('/api/upload',cloudeRoute);

//Product Routes
app.use('/api/product',productRoutes);

//order and cart routes
app.use('/api/cart',orderAndCartRoutes);

require('./config/cleanUp');

app.listen(PORT,()=>{
    connectDb();
    console.log('Server is running on port '+PORT);
})

