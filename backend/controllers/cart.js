const Cart = require("../models/Cart");
const Product = require("../models/product");


const addCart = async (req, res) => {
	try {
		const userId = req.user.id;
		const { cartItem } = req.body;

		const cart = await Cart.findOne({ userId });

		if (cart) {
			const existingProduct = cart.products.find(
				(product) => product.cartItem.toString() === cartItem,
			);

			if (existingProduct) {
				existingProduct.quantity += 1;
			} else {
				cart.products.push({ cartItem, quantity: 1 });
			}

			await cart.save(); 
			return res.status(200).json("Product added to cart"); 
		} else {
			const newCart = new Cart({
				userId,
				products: [{ cartItem, quantity: 1 }],
			});

			await newCart.save(); 
			return res.status(200).json("Product added to cart");
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json(error); 
	}
};


const getCart = async () => {
   try {
      const userId = req.user.id;

      const cart = await Cart.find({ userId })
      res.status(200).json(cart); 

   } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
      res.status(500).json(error ); 
   }
}

const deleteCartItem = async (req, res) => {
	try {
		const cartItemId = req.params.cartItem;

		const updatedCart = await Cart.findOneAndUpdate(
			{ "products._id": cartItemId }, 
			{ $pull: { products: { _id: cartItemId } } }, 
			{ new: true }, 
		);

		if (!updatedCart) {
			return res.status(404).json({ message: "Cart item not found" }); 
		}

		return res.status(200).json({
			updatedCart,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" }); 
	}
};

module.exports = {
	addCart,
	getCart,
	deleteCartItem
};