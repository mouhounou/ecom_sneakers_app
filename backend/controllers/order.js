const Order = require("../models/order");

const getUserOrders = async (req, res) => {
   try {
      const userId = req.user.id 

      const userOrders = await Order.find({ userId }).populate({
			path: "productId",
			select: "-sizes -oldPrice -description -category",
      });
      
      res.status(200).json(userOrders)
   } catch (error) {
      console.log('====================================');
      console.log(error);
      console.log('====================================');
   }
}

module.exports = { getUserOrders };