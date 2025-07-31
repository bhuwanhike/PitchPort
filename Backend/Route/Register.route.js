import express from "express";
const Router = express.Router();
import {
  registerController,
  getRegisterUserInfo,
} from "../controller/register.controller.js";

Router.route("/").post(registerController).get(getRegisterUserInfo);

export default Router;
