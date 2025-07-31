import express from "express";
import { paymentIntentController } from "../controller/paymentGateway.controller.js";
const Router = express.Router();

Router.route("/").post(paymentIntentController);
export default Router;
