const express = require('express') ;
const router = express.Router() ;
const mongoose = require('mongoose');

const Product = require('../models/ProductModel');

router.get('/',(req,res,next)=>{
    
   Product.find({}) 
          .exec()
          .then((result)=>{
            const resporn = {
                 count :result.length,
                 product : result.map((data)=>{
                     return {
                        name : data.name,
                        price : data.price,
                        _id : data._id,
                        request: {
                            type : "GET",
                            url : `http://localhost:5000/product/${data._id}`
                        }
                     }
                 })
            }
       
                res.status(200).json(resporn)
    
            
          })
          .catch((err)=>{
            res.status(500).json(err)
          })
  
})

//POST route
router.post('/',(req,res,next)=>{
  
    const product = new Product ({
        name:req.body.name,
        price :req.body.price
    })
    product.save()
           .then((result)=>{
            console.log(result)
            res.status(201).json({
                CreatedProduct : result
            })
           })
           .catch((err)=>{
            console.log(err)
           })
})
//DELETE Product Route
router.delete('/:productId', (req,res,next)=>{
    const id = req.params.productId ;
    Product.remove({_id : id})
           .exec()
           .then((result)=>{
            res.status(200).json({message : `Product with ${id} is deleted`})
           })
           .catch((err)=>{
            res.status(500).json(err)
           });

})
//GET Single Product route
router.get('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.findById(id)
           .exec()
           .then((result)=>{
            const resporn = {
                  _id :result._id,
                  name : result.name,
                  price: result.price ,
                  type : "GET",
                  url : `http://localhost:5000/product/${result._id}`

            } 
            result ? res.status(200).json(resporn) :res.status(404).json({message:"ID Not Found"})
           })
           .catch((err)=>{
              res.status(500).json(err)
           })
    
})
//UPDATE Product Route
router.patch('/:productId',(req,res,next)=>{
    const id = req.params.productId ;
    Product.findOneAndUpdate({_id:id },req.body,{new:true,useFindmodify:false})
           .exec()
           .then((result)=>{
             res.status(200).json(result)
           })
           .catch((err)=>{
            res.status(500).json(err)
           });

})

module.exports = router ;
