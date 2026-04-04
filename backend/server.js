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

app.set('trust proxy', 1);

// Set custom DNS servers to resolve MongoDB SRV records
dns.setServers(['1.1.1.1', '8.8.8.8']);

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://x8xp936p-5173.inc1.devtunnels.ms',
  'https://x8xp936p-5174.inc1.devtunnels.ms',
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS ? process.env.FRONTEND_URLS.split(',').map((url) => url.trim()) : []),
].filter(Boolean);

// CORS Configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser tools like Postman/curl (no Origin header)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS not allowed for this origin'));
  },
  credentials: true,
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

