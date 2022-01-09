import dotenv from "dotenv";
import connectDB from "./db/connect";
import Product from "./models/Product";
import jsonProducts from "../products.json";

dotenv.config();

const start: Function = async (): Promise<void> => {
	try {
		await connectDB(process.env.MONGO_URI);
		await Product.deleteMany();
		await Product.create(jsonProducts);
		console.log("Migration completed");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
