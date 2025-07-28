import ProfileSettings from "../schema/profileSettings.schema.js";
import User from "../schema/register.schema.js";

const profileSettingsController = async (req, res) => {
  try {
    const {
      fullname,
      username,
      profilePicture,
      email,
      password,
      bio,
      location,
      website,
      linkedin,
      twitter,
    } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      const user = await ProfileSettings.create({
        fullname,
        username,
        profilePicture,
        email,
        password,
        bio,
        location,
        website,
        linkedin,
        twitter,
      });
      //   const updatedUser = await User.findOneAndUpdate(
      //     { email },
      //     { $set: { username, role, email } },
      //     { new: true }
      //   );
      // const token = await user.generateToken();
      res
        .status(201)
        .json({ message: "User registered successfully"});
    } else {
      console.log("invalid credentials from the profileSettings Controller");
    }
  } catch (error) {
    console.log("error from profile setting controller", error);
  }
};

const getProfileSettings = async (req, res) => {
  try {
    const userSettings = await ProfileSettings.findOne();
    res.status(200).json(userSettings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export { profileSettingsController, getProfileSettings };
