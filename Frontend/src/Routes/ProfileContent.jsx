import React, { useState, useEffect } from "react";
import { User, Mail, Globe, Linkedin, Twitter, Camera } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
// Reusable component for a settings section - Professional & Clean
import axios from "axios";
const SettingsCard = ({ title, description, children }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg ">
    {" "}
    {/* Cleaner background, sharper corners, classic shadow */}
    <div className="p-8 border-b border-slate-700">
      {" "}
      {/* Generous padding */}
      <h2 className="text-2xl font-semibold text-white">{title}</h2>{" "}
      {/* Professional heading */}
      <p className="text-sm text-slate-400 mt-2">{description}</p>
    </div>
    <div className="p-8 space-y-6">{children}</div>{" "}
    {/* Consistent internal spacing */}
  </div>
);

// Reusable component for a form field - LABELS ALIGNED SIDE-BY-SIDE
const FormField = ({ label, children }) => (
  <div className="flex   items-center w-[80%] gap-15 pl-5 pr-5">
    <label className="text-lg font-medium text-slate-200 w-[15%]">
      {" "}
      {/* Label for left column, right aligned */}
      {label}
    </label>
    <div className="w-[85%]">{children}</div>{" "}
    {/* This div contains the input, takes remaining space */}
  </div>
);

const ProfileContent = () => {
  const [profile, setProfile] = useState({
    // fullName: "Bhavya Tyagi",
    username: "bhavyatyagi",
    email: "bhavya.tyagi@example.com",
    // bio: "Founder & CEO at InnovateX. Passionate about building the future of FinTech and supporting early-stage startups. Committed to leveraging AI for social impact and fostering collaborative ecosystems. Always eager to connect with like-minded innovators.",
    // location: "Bengaluru, India",
    // website: "https://innovatex.com",
    // linkedin: "https://linkedin.com/in/bhavyatyagi",
    // twitter: "https://twitter.com/bhavyatyagi",
    // avatar: "https://avatars.githubusercontent.com/u/81063625?v=4", // Using a GitHub placeholder for demo
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // const getRegisterUserInfo = async () => {
  //   const response = await axios.get(
  //     `${import.meta.env.VITE_BACKEND_API_URL}/register`
  //   );
  //   console.log(response);
  //   // return response.data;
  // };

  const { getLoggedInUser } = useContext(AuthContext);
  // const getLoggedInUser = async () => {
  //   const response = await axios.get(
  //     `${import.meta.env.VITE_BACKEND_API_URL}/login`
  //   );
  //   console.log(response);
  //   // return response.data;
  // };
  // getRegisterUserInfo();
  async function getUser() {
    const loggedInUser = await getLoggedInUser();
    setProfile(loggedInUser);
  }

  useEffect(() => {
    getUser();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
    // In a real app: Send data to backend, show success/error feedback
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, avatar: reader.result }));
        // In a real app, upload this file to your server (e.g., Cloudinary, S3)
      };
      reader.readAsDataURL(file);
    }
  };
  // const { getRegisterUserInfo } = useContext(AuthContext);
  // const result = getRegisterUserInfo();
  // console.log(result);
  return (
    // Max-width, centering, and generous top/bottom padding for the main content
    <div className="space-y-12 animate-fadeInforProfile max-w-8xl mx-auto py-8">
      <div>
        <h1 className="text-3xl font-bold text-white font-poppins">
          Profile Settings
        </h1>
        <p className="text-slate-400 mt-1">Update your profile information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12 ">
        <div className="flex gap-12">
          {/* Avatar Section */}
          <SettingsCard
            title="Profile Picture"
            description="Update your profile picture."
          >
            <div className="flex flex-col w-100 h-100 items-center gap-y-4 md:gap-x-8">
              <div className="flex flex-col items-center gap-15">
                <div className="relative w-80  group">
                  {/* Larger avatar */}

                  {profile.avatar ? (
                    <img
                      src={`https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg`}
                      alt="Profile Avatar"
                      className="w-80 h-80 rounded-full object-cover border-4 border-slate-700"
                    />
                  ) : (
                    <div className="w-80 h-80 flex items-center justify-center rounded-full border-4 border-slate-700 !text-8xl font-bold text-white">
                      {profile.username.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <label
                    htmlFor="avatar-upload"
                    className="absolute inset-0 bg-black/70 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    title="Click to upload"
                  >
                    <Camera className="w-8 h-8 text-white" />
                  </label>
                  <input
                    type="file"
                    id="avatar-upload"
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                    onChange={handleAvatarUpload}
                  />
                </div>
                <button className="text-sm text-swhite">Upload Photo</button>
              </div>
            </div>
          </SettingsCard>
          {/* Personal Information Section */}
          <div className="w-[70%] h-full">
            <SettingsCard
              title="Personal Information"
              description="Edit your personal details."
            >
              <FormField label="Full Name">
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="input-field "
                  placeholder="Full Name"
                />
                {console.log(profile.username)}
              </FormField>
              <FormField label="Username">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 text-lg">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="input-field !pl-10" // Adjusted padding for icon
                    placeholder="yourusername"
                  />
                </div>
              </FormField>
              <FormField label="Email">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={profile.email}
                    onChange={handleChange}
                    className="input-field " // Adjusted padding for icon
                    placeholder="your email"
                  />
                </div>
              </FormField>
              <FormField label="Location">
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="input-field "
                  placeholder="City, Country"
                />
              </FormField>
              <FormField label="Bio">
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  rows="6"
                  className="input-field "
                  placeholder="Tell us about yourself and your passion..."
                ></textarea>
              </FormField>
            </SettingsCard>
          </div>
        </div>
        {/* Online Presence Section */}
        <SettingsCard
          title="Online Presence"
          description="Add links to your website and social profiles."
        >
          <FormField label="Website">
            <div className="relative ">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500" />
              <input
                type="url"
                name="website"
                value={profile.website}
                onChange={handleChange}
                className="input-field !pl-12" // Adjusted padding for icon
                placeholder="https://your-website.com"
              />
            </div>
          </FormField>
          <FormField label="LinkedIn">
            <div className="relative">
              <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500" />
              <input
                type="url"
                name="linkedin"
                value={profile.linkedin}
                onChange={handleChange}
                className="input-field !pl-12"
                placeholder="https://linkedin.com/in/your-profile"
              />
            </div>
          </FormField>
          <FormField label="Twitter">
            <div className="relative">
              <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500" />
              <input
                type="url"
                name="twitter"
                value={profile.twitter}
                onChange={handleChange}
                className="input-field !pl-12"
                placeholder="https://twitter.com/your-handle"
              />
            </div>
          </FormField>
        </SettingsCard>

        {/* Save Button */}
        <div className="mt-12 pt-8 flex justify-start ml-10 border-t border-slate-700">
          {" "}
          {/* Increased top margin and padding */}
          <button
            type="submit"
            className="
              bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
              text-white font-bold px-10 py-3.5 rounded-lg shadow-lg
              transition-all duration-300 hover:brightness-110
              focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-60
            "
          >
            Update Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileContent;
