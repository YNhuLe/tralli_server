import express from "express";
import * as userController from "../controllers/users-controller.js";

const router = express.Router();

router.route("/user").get(userController.getUser);
router.route("/newUser").post(userController.addUser);
router.route("/user/:uid").get(userController.getSingleUser);
// router.route("/google-signup").post(userController.googleSignup);
router.route("/check-user/:uid").get(userController.checkUser);
router.route("/additional-data").post(userController.addNewUserFromGoogle);
router.route("/categories/user/:uid").get(userController.getSingleUser);
export default router;