const express = require('express');
const router = express.Router();

const Order = require('../models/OrderModel');
const Product = require('../models/ProductModel');

router.get('/', (req,res,next)=>{
   Order.find({})
        .exec()
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(500).json(err)
        });
})


router.post('/', (req,res,next)=>{
    
    const order = new Order({
        quantity : req.body.quantity,
        product: req.body.productId
    })

    order.save()
         .then((result)=>(
            
            res.status(201).json({
                message : "Order is created",
                result
            })
         ))
         .catch((err)=>{
            res.status(500).json(err)
         });
    
})

router.get('/:orderId', (req,res,next)=>{
    const id = req.params.orderId ;
    Order.findById({_id:id})
         .exec()
         .then((result)=>{
            const resporn = {
                Data :{
                  product : result.product,
                  quantity : result.quantity,
                  _id : result._id
                },
                Request :{
                    type : "GET" ,
                    url: `http://localhost:5000/order/${result._id}`
                }}
                res.status(200).json(resporn)
         })
         .catch((err)=>{
            res.status(500).json({
                Error :err
            })
         })
   
})

router.delete('/:orderId',(req,res,next)=>{
    const id = req.params.orderId ;
    res.status(200).json({
        message : `DELETE route for Order The ID provide in the link is ${id}`
    })
})

router.patch('/:orderId',(req,res,next)=>{
    const id = req.params.orderId ;
    res.status(200).json({
        message : `PATCH route for Order The ID provide in the link is ${id}`
    })
})

module.exports = router ;