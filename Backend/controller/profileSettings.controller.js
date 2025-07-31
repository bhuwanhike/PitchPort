import ProfileSettings from "../schema/profileSettings.schema.js";
import User from "../schema/register.schema.js"; // Assuming this is your user registration schema

// Controller to GET a user's profile settings
const getProfileSettings = async (req, res) => {
  try {
    const { email } = req.query; // Use req.query for GET requests
    if (!email) {
      return res.status(400).json({ message: "Email is required to fetch profile." });
    }

    const profile = await ProfileSettings.findOne({ email });

    if (!profile) {
      // If profile doesn't exist, respond with 404
      return res.status(404).json({ message: "Profile settings not found for this user." });
    }

    res.status(200).json({
      fullname: profile.fullname || "",
      username: profile.username || "",
      profilePicture: profile.profilePicture || "",
      email: profile.email || "",
      bio: profile.bio || "",
      location: profile.location || "",
      website: profile.website || "",
      linkedin: profile.linkedin || "",
      twitter: profile.twitter || "",
    });
  } catch (error) {
    console.error("Error fetching profile settings:", error);
    res.status(500).json({ message: "Server error while fetching profile." });
  }
};

// Controller to CREATE a user's profile settings (first-time login/profile page load)
const createProfileSettings = async (req, res) => {
  try {
    const {
      email,
      fullname,
      username,
      profilePicture,
      bio,
      location,
      website,
      linkedin,
      twitter,
    } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required to create profile." });
    }

    // Check if a profile already exists for this email
    const existingProfile = await ProfileSettings.findOne({ email });
    if (existingProfile) {
      return res.status(200).json({ message: "Profile already exists, returning existing.", ...existingProfile.toObject() });
      // Or 409 Conflict if you want to strictly prevent duplicate creation attempts
      // return res.status(409).json({ message: "Profile already exists for this email." });
    }

    // You might want to also verify if the user exists in your main User schema
    // const userExists = await User.findOne({ email });
    // if (!userExists) {
    //   return res.status(404).json({ message: "User not found in main user database." });
    // }

    const newProfile = await ProfileSettings.create({
      email,
      fullname,
      username,
      profilePicture,
      bio,
      location,
      website,
      linkedin,
      twitter,
    });

    res.status(201).json({ // 201 Created for successful resource creation
      fullname: newProfile.fullname || "",
      username: newProfile.username || "",
      profilePicture: newProfile.profilePicture || "",
      email: newProfile.email || "",
      bio: newProfile.bio || "",
      location: newProfile.location || "",
      website: newProfile.website || "",
      linkedin: newProfile.linkedin || "",
      twitter: newProfile.twitter || "",
    });
  } catch (error) {
    console.error("Error creating profile settings:", error);
    res.status(500).json({ message: "Server error while creating profile." });
  }
};

// Controller to UPDATE a user's profile settings
const updateProfileSettings = async (req, res) => {
  try {
    const {
      email, // Use email to find the profile to update
      fullname,
      username,
      profilePicture,
      bio,
      location,
      website,
      linkedin,
      twitter,
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required to update profile." });
    }

    const updatedProfile = await ProfileSettings.findOneAndUpdate(
      { email }, // Find by email
      {
        fullname,
        username,
        profilePicture,
        bio,
        location,
        website,
        linkedin,
        twitter,
      },
      { new: true, runValidators: true } // `new: true` returns the updated document, `runValidators` runs schema validators
    );

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile settings not found for this user." });
    }

    res.status(200).json({
      fullname: updatedProfile.fullname || "",
      username: updatedProfile.username || "",
      profilePicture: updatedProfile.profilePicture || "",
      email: updatedProfile.email || "",
      bio: updatedProfile.bio || "",
      location: updatedProfile.location || "",
      website: updatedProfile.website || "",
      linkedin: updatedProfile.linkedin || "",
      twitter: updatedProfile.twitter || "",
    });
  } catch (error) {
    console.error("Error updating profile settings:", error);
    res.status(500).json({ message: "Server error while updating profile." });
  }
};

export { getProfileSettings, createProfileSettings, updateProfileSettings };