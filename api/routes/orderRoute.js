const express = require('express');
const router = express.Router();

const Order = require('../models/OrderModel');

router.get('/', (req,res,next)=>{
   Order.find({}).exec()
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            res.status(500).json(err)
        });
})


router.post('/', (req,res,next)=>{
    
    const order ={
        productId : req.body.productId,
        quantity : req.body.quantity
    }
    res.status(201).json({
        message : "POST route for Product",
        createdOrder:order
    })
})

router.get('/:orderId', (req,res,next)=>{
    const id = req.params.orderId ;
    res.status(200).json({
        message : `GET route for Order The ID provide in the link is ${id}`
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