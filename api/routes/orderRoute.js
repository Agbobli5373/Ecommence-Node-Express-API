const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.status(200).json({
        message : "GET route for Order"
    })
})


router.post('/', (req,res,next)=>{
    res.status(200).json({
        message : "POST route for Product"
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