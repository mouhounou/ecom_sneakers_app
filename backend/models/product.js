const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		title: { type: String, required: true },
		category: { type: String, required: true },
		imageUrl: { type: [String], required: true },
		oldPrice: { type: String, required: true },
		sizes: {
			type: [
				{
					size: {
						type: String,
						required: true,
					},
					isSelected: {
						type: Boolean,
						default: false,
					},
				},
			],
			require: true,
		},
		price: { type: String, required: true },
		description: { type: String, required: true },
	},
	{ timestamps: true },
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
