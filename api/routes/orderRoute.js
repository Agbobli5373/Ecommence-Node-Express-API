const express = require("express");
const router = express.Router();
const OrderCtrl = require('../controllers/orderCtrl');

const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");
//GET route for getting all orders
router.get("/", OrderCtrl.getOrders );

router.post("/", (req, res, next) => {
    Product.findById(req.body.productId)
        .then((product) => {
            if (!product) { return (res.se({ massege: "Product not Found" })) }
            else {
                const order = new Order({
                    quantity: req.body.quantity,
                    product: req.body.productId,
                });
                return order.save();
            }
        })

        .then((result) =>
            res.status(201).json({
                message: "Order is created",
                result,
            })
        )
        .catch((err) => {
            res.status(500).json({
                message: err
            });

        });
});

router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.findById({ _id: id })
        .populate('product')
        .exec()
        .then((result) => {
            const resporn = {
                Data: {
                    product: result.product,
                    quantity: result.quantity,
                    _id: result._id,
                },
                Request: {
                    type: "GET",
                    url: `http://localhost:5000/order/${result._id}`,
                },
            };
            res.status(200).json(resporn);
        })
        .catch((err) => {
            res.status(500).json({
                Error: err,
            });
        });
});

router.delete("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then((result) => {
            res.status(200).json({
                message: `Order with ${id} delete successfully`,
            });
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

router.patch("/:orderId", (req, res, next) => {
    const id = req.params.orderId;
    Order.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .exec()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = router;
