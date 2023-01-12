const Order = require('../models/OrderModel');
const Product = require("../models/ProductModel");

exports.getOrder = (req,res,next) =>{

};
//Controller for getting all order
exports.getOrders= (req,res,next) =>{
    Order.find({})
        .populate('product','name')
        .exec()
        .then((result) => {
            const resporn = {
                Data: result.map((data) => {
                    return {
                        _id: data._id,
                        quantity: data.quantity,
                        product: data.product,
                        Request: {
                            Type: "GET",
                            url: `http://localhost:5000/order/${data._id}`,
                        },
                    };
                }),
            };
            res.status(200).json(resporn);
        })
        .catch((err) => {
            res.status(500).json(err);
        });

};

exports.addOrder = (req,res,next) =>{

};

exports.updateOrder = (req,res,next) =>{

};

exports.deleteOrder= (req,res,next) =>{

};