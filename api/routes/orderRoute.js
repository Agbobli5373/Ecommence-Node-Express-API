const express = require("express");
const router = express.Router();
const OrderCtrl = require('../controllers/orderCtrl');
const checkAuth = require('../middlerware/check-auth')


//GET route for getting all orders
router.get("/",checkAuth, OrderCtrl.getOrders );
//POST route for adding order
router.post("/",checkAuth, OrderCtrl.addOrder);
//GET route for getting single order
router.get("/:orderId",checkAuth, OrderCtrl.getOrder);
//DELETE route for delecting order
router.delete("/:orderId", checkAuth, OrderCtrl.deleteOrder);
//UPDATE route for updating order
router.patch("/:orderId",checkAuth, OrderCtrl.updateOrder);

module.exports = router;
