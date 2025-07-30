import express from "express";
import {
  getProfileSettings,
  createProfileSettings, // Import the new create function
  updateProfileSettings,
} from "../controller/profileSettings.controller.js";

const Router = express.Router();

// Route for fetching a profile (GET)
Router.route("/").get(getProfileSettings);

// Route for creating a profile (POST)
Router.route("/").post(createProfileSettings);

// Route for updating a profile (PUT)
Router.route("/").put(updateProfileSettings);

export default Router;
