const express = require('express');
const productRoute = require('./api/routes/productRoute');
const oderRoute = require('./api/routes/orderRoute') ;

const app = express();
const PORT = 5000 ;

app.use('/',(req,res)=>{
    res.status(200).json("hello world")
}) 

app.use('/product', productRoute);
app.use('/order',oderRoute) ;

app.listen(PORT, () => console.log(`Am running on Port ${PORT}`));
