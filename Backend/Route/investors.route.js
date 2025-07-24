import express from "express";
const Router = express.Router();
import investors from "../controller/addinvestor.controller.js";

Router.route("/").get(investors.getInvestors);
export default Router;
