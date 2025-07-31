import express from "express";
const Router = express.Router();
import investors from "../controller/addinvestor.controller.js";

Router.route("/")
  .post(investors.addInvestorController)
  .get(investors.getInvestors);

export default Router;
