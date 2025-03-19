import express from "express";
import * as serviceController from "../controllers/services-controller.js";

const router = express.Router();

router.route("/").get(serviceController.getAllServices);
router
  .route("/demo")
  .get(serviceController.getDemoData)
  .post(serviceController.sendDemoRequest);
export default router;
