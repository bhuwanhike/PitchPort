import express from "express";
import { profileSettingsController } from "../controller/profileSettings.controller.js";

const Router = express.Router();

Router.route("/").post(profileSettingsController);

export default Router;
