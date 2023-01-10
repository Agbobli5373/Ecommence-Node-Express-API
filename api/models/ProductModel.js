const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({
    /* _id:{
        type : mongoose.Types.ObjectId
    } */ 
    name:{
        type : String,
        
     },
     price :{
        type: Number,
     }
})

module.exports = mongoose.model('Product',productSchema);