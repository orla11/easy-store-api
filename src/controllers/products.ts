import { Request, Response, NextFunction } from "express";
import Product from "../models/Product";
import { IProductQuery } from "../interfaces/IProduct";

/* TODO: move logic into services in order to separate
business logic from the controllers */

const getAllProductsStatic = async (
	req: Request,
	res: Response
): Promise<void> => {
	const products = await Product.find({}).sort("createdAt");
	res.status(200).json({ products, nbHits: products.length });
};

// TODO: refactor
const getAllProducts = async (req: Request, res: Response) => {
	//const productQuery: IProductQuery = req.query;
	const { featured, company, name, sort, fields, numericFilters } = req.query;
	const queryObject: any = {};

	if (featured) queryObject.featured = featured === "true" ? true : false;
	if (company) queryObject.company = company;
	if (name) queryObject.name = { $regex: name, $options: "i" };

	if (numericFilters) {
		const operatorMap: {} = {
			">": "$gt",
			"<": "$lt",
			"<=": "$lte",
			">=": "$gte",
			"=": "$eq",
		};
		const operatorRegEx = /\b(>=|<|>|=|<=)\b/g;
		const filters: string = (numericFilters as string).replace(
			operatorRegEx,
			(match) => `-${operatorMap[match]}-`
		);

		const options: string[] = ["price", "rating"];

		filters.split(",").forEach((el) => {
			const [field, operator, value] = el.split("-");
			if (options.includes(field)) queryObject[field] = { [operator]: +value };
		});
	}

	const result = Product.find(queryObject);

	if (sort) {
		const sortParams: string = (sort as string).split(",").join(" ");
		result.sort(sortParams);
	} else result.sort("createdAt");

	if (fields) {
		const fieldParams: string = (fields as string).split(",").join(" ");
		result.select(fieldParams);
	}

	console.log(queryObject);

	const page: number = parseInt(req.query.page as string) || 1;
	const limit: number = parseInt(req.query.limit as string) || 10;
	const skip: number = (page - 1) * limit;

	result.skip(skip).limit(limit);

	const products = await result;
	res
		.status(200)
		.json({ nbHits: products.length, page, limit, data: products });
};

export { getAllProductsStatic, getAllProducts };
