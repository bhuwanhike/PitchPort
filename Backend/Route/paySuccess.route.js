import express from "express";
import { paymentSuccessController } from "../controller/paymentGateway.controller.js";
const Router = express.Router();

Router.route("/").post(paymentSuccessController);

export default Router;
