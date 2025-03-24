import express from "express";
import * as userControllers from "../controllers/categories-controller.js";
const router = express.Router();

router.route("/").get(userControllers.getAllCategories);
router.route("/categories").get(userControllers.getAllCategories);

export default router;