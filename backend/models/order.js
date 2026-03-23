const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		customerId: { type: String, required: true },
		productId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
		quantity: { type: Number, required: true },
		subTotal: { type: Number, required: true },
		delivery_status: { type: String, default: "pending" },
		payment_status: { type: String, required: true },
		total: { type: Number, required: true },
	},
	{ timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
