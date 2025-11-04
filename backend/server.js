const express=require('express');
const cookieParser = require('cookie-parser');
const connectDb = require('./config/db');
const authRoutes=require('./routes/auth.routes');

require('dotenv').config();
const app=express();
const PORT=process.env.PORT

app.use(express.json());
app.use(cookieParser());

// app.use('/',(req,res)=>{
//     res.send('Moriskia Backend Server is Running');
// })

app.use('/api/auth',authRoutes);

require('./config/cleanUp');

app.listen(PORT,()=>{
    connectDb();
    console.log('Server is running on port '+PORT);
})

