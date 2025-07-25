import express from "express";
const Router = express.Router();
import {
  loginController,
  getLoggedInUser,
} from "../controller/login.controller.js";

Router.route("/").post(loginController).get(getLoggedInUser);

export default Router;
