import mongoose, { mongo } from "mongoose";

const ProfileSettingSchema = new mongoose.Schema({
  fullname: {
    type: String,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  bio: {
    type: String,
  },
  location: {
    type: String,
  },
  website: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
});

const ProfileSettings = mongoose.model("ProfileSetting", ProfileSettingSchema);

export default ProfileSettings;
