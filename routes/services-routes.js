import express from "express";
import * as serviceController from "../controllers/services-controller.js";

const router = express.Router();


router
  .route("/demo")
  .get(serviceController.getDemoData)
  .post(serviceController.sendDemoRequest);

router
  .route("/categories/:id/services")
  .get(serviceController.getServiceFromCategory);
export default router;
