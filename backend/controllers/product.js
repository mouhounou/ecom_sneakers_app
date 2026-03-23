const Product = require("../models/product");



const createProduct = async (req, res) => {
   try {
      const newProduct = new Product(req.body)
      await newProduct.save()

      res.status(200).json("Product created")
   } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      res.status(500).json("Failed to create product")
   }
}

const getAllProducts = async (req, res) => { 
   try {
      const products = await Product.find().sort({ createdAt: -1 })
      
      res.status(200).json(products);
   } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      res.status(500).json("Failed to get all products");
   }
}

const getOneProduct = async (req, res) => { 
   try {

      const productId = req.params.id
      const product = await Product.findById(productId)
      
      const {__V, createdAt, ...productData} = product._doc
      res.status(200).json(productData);
   } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      res.status(500).json("Failed to the product");
   }
}

const searchProduct = async (req, res) => { 
   try {
      const results = await Product.aggregate([
			{
				$search: {
					index: "shoes",
					text: {
						query: req.params.key,
						path: {
							wildcard: "*",
						},
					},
				},
			},
		]);

      res.status(200).json(results);
   } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      res.status(500).json("Failed to the product");
   }
} 




module.exports = {
	createProduct,
	getAllProducts,
	getOneProduct,
	searchProduct,
};
