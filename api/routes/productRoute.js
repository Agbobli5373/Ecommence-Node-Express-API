const express = require('express') ;
const router = express.Router() ;

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message : "This is GET Route"
    })
})

router.post('/',(req,res,next)=>{
    const product = {
        name : req.body.name,
        price: req.body.price
    };
    res.status(201).json({
        message:"This POST route",
        CreatedProduct : product
    })
})

router.delete('/:productId', (req,res,next)=>{
    const id = req.params.productId ;
    res.status(200).json({
        message : `DELETE route for Product The ID provide in the link is ${id}`
    })
})

router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;

    res.status(200).json(
        {
            message : `This GET product by ${id} route`
        }
    )
})

router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId ;
    res.status(200).json({
        message : `PATCH route for Product The ID provide in the link is ${id}`
    })
})

module.exports = router ;

module.exports = router ;