import express from "express";
const Router = express.Router();
import startup from "../controller/addstartup.controller.js";

Router.route("/").post(startup.addStartupController).get(startup.getStartups);
export default Router;
