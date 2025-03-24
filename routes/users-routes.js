import express from "express";
import * as userController from "../controllers/users-controller.js";

const router = express.Router();

router.route("/user").get(userController.getUser);
router.route("/newUser").post(userController.addUser);
router.route("/categories/user/:uid").get(userController.getSingleUser);
export default router;