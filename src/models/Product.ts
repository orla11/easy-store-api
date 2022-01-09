import mongoose, { Schema } from "mongoose";
import { IProduct } from "../interfaces/IProduct";

const Product: Schema = new Schema({
	name: {
		type: String,
		required: [true, "Product name must be provided"],
	},
	price: {
		type: Number,
		required: [true, "Product price must be provided"],
	},
	featured: {
		type: Boolean,
		default: false,
	},
	rating: {
		type: Number,
		default: 4.5,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	company: {
		type: String,
		enum: {
			values: ["ikea", "liddy", "caressa", "marcos"],
			message: "{VALUE} is not supported",
		},
		//enum: ["ikea", "liddy", "caressa", "marcos"],
	},
});

export default mongoose.model<IProduct & mongoose.Document>("Product", Product);
