const mongoose = require('mongoose') ;

const orderSchema = new mongoose.Schema({
        _id:{
            type: mongoose.Schema.Types.ObjectId
        },
        productId:{
             type :String
        },
        Address:{
            type: String
        }
})

module.exports = mongoose.model('Order',orderSchema) ;