const express=require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const connectDb = require('./config/db');
const authRoutes=require('./routes/auth.routes');
const productRoutes=require('./routes/product.routes')

require('dotenv').config();
const app=express();
const PORT=process.env.PORT

// CORS Configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Support both Vite ports
  credentials: true // Allow cookies
}));

app.use(express.json());
app.use(cookieParser());

// app.use('/',(req,res)=>{
//     res.send('Moriskia Backend Server is Running');
// })

app.use('/api/auth',authRoutes);

//Product Routes
app.use('/api/product',productRoutes);

require('./config/cleanUp');

app.listen(PORT,()=>{
    connectDb();
    console.log('Server is running on port '+PORT);
})

