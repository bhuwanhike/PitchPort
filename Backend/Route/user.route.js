import express from "express";
const Router = express.Router();
import userController from "../controller/user.controller.js";

Router.route("/").get(userController);

export default Router;
