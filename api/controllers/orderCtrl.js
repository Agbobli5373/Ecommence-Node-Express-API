const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");



//Controller for getting a single order
exports.getOrder = (req, res, next) => {
  const id = req.params.orderId;
  Order.findById({ _id: id })
    .populate("product")
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
};
//Controller for getting all order
exports.getOrders = (req, res, next) => {
  Order.find({})
    .populate("product", "name")
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
//Controller for adding order
exports.addOrder = (req, res, next) => {
  Product.findById(req.body.productId)
    .then((product) => {
      if (!product) {
        return res.se({ massege: "Product not Found" });
      } else {
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
        message: err,
      });
    });
};

exports.updateOrder = (req, res, next) => {
  const id = req.params.orderId;
  Order.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

exports.deleteOrder = (req, res, next) => {
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
};
