import express from "express";
import { paymentHistoryController } from "../controller/paymentGateway.controller.js";
const Router = express.Router();

Router.route("/:userId").get(paymentHistoryController);
export default Router;
