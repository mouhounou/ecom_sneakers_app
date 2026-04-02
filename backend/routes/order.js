const orderRouter = require("express").Router();
const orderController = require('../controllers/order');
const verifyToken = require("../middleware/verifyToken");


orderRouter.get('/', verifyToken, orderController.getUserOrders)

module.exports = orderRouter;
