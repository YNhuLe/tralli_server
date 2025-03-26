import express from "express";
import * as userController from "../controllers/users-controller.js";

const router = express.Router();

router.route("/user").get(userController.getUser);
router.route("/newUser").post(userController.addUser);
router.route("/google-signup").post(userController.googleSignup);
router.route("/additional-data").post(userController.addNewUserFromGoogle);
router.route("/categories/user/:uid").get(userController.getSingleUser);
export default router;