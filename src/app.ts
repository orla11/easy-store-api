import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/connect";
import errorHandlerMiddleware from "./middleware/error-handler";
import notFoundMiddleware from "./middleware/not-found";
import productsRouter from "./routes/products";

import "express-async-errors";

dotenv.config();

const app: express.Application = express();
const port: any = process.env.PORT || 3000;

app.use(express.json());

// routes
app.get("/", (req: express.Request, res: express.Response) =>
	res.send("<h1>Store API</h1><a href='/api/v1/products'>product route</a>")
);

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server is listening on ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
