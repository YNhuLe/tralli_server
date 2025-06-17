import express from "express";
import * as providerController from "../controllers/providers-controller.js";
const router = express.Router();

router.route("/categories/:id/provider").get(providerController.getProvider);
export default router;
