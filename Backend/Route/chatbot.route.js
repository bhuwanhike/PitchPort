import express from "express";
import chatbotController from "../controller/chatbot.controller.js";

const Router = express.Router();

Router.route("/").post(chatbotController);

export default Router;
