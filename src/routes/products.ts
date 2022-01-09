import express, { Router } from "express";
import { getAllProductsStatic, getAllProducts } from "../controllers/products";

const router: Router = Router();

router.route("/").get(getAllProducts);
router.route("/static").get(getAllProductsStatic);

export default router;
