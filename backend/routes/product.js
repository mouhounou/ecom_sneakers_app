const productRouter = require('express').Router()
const productController = require('../controllers/product')


productRouter.get("/", productController.getAllProducts);
productRouter.get("/:id", productController.getOneProduct);
productRouter.get("search/:key", productController.searchProduct);
productRouter.post("/", productController.createProduct);



module.exports = productRouter