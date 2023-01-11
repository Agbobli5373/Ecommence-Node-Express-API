const express = require('express');
const morgan = require('morgan') ;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/productRoute');
const oderRoutes = require('./api/routes/orderRoute') ;
const userRoute = require('./api/routes/userRoute') ;


const app = express();
const PORT = 5000 ;
const mongoURL ='mongodb://127.0.0.1:27017/ecomDB'

mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology:true,}) 

   .then(()=>console.log('MongoDB connected'))
   .catch((err) =>console.log(err));


/* app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-header',
        'Origin,X-Requested-With,Content-Type,Accept, Authorization');

   if(req.method ==='OPTION'){
    res.header('Access-Control-Allow-method','GET,POST,PUTCH,DELETE,PUT') ;
    return res.status(200).json({});
   }
   nexet();
}) */

app.use(morgan('dev'));
app.use(bodyParser.urlencoded ({ extended :false}));
app.use(bodyParser.json()) ;

/* app.use('/',(req,res)=>{
    res.status(200).json("hello world")
})  */

app.use('/product', productRoutes);
app.use('/order',oderRoutes) ;
app.use('/user',userRoute) ;

app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
})

app.listen(PORT, () => console.log(`Running Server on ${PORT}`));
