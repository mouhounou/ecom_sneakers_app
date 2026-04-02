const cartRouter = require("express").Router();
const cartController = require("../controllers/cart");
const verifyToken = require("../middleware/verifyToken");

cartRouter.get("/find", verifyToken, cartController.getCart);
cartRouter.post("/add", verifyToken, cartController.addCart);
cartRouter.delete("/:cartItem", verifyToken, cartController.deleteCartItem);


module.exports = cartRouter;
