import React, { useState, useEffect, useContext } from "react";
import { User, Mail, Globe, Linkedin, Twitter, Camera } from "lucide-react";
import { AuthContext } from "../contexts/auth-context"; // Your actual AuthContext
import { useNavigate } from "react-router-dom"; // Assuming you use react-router-dom for navigation

// Reusable component for a settings section
const SettingsCard = ({ title, description, children }) => (
  <div className="bg-slate-800 border border-slate-700 rounded-xl shadow-lg">
    <div className="p-8 border-b border-slate-700">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      <p className="text-sm text-slate-400 mt-2">{description}</p>
    </div>
    <div className="p-8 space-y-6">{children}</div>
  </div>
);

// Reusable component for a form field - LABELS ALIGNED SIDE-BY-SIDE
const FormField = ({ label, children }) => (
  <div className="flex items-center w-full gap-2 pl-5 pr-5">
    <label className="text-lg font-medium text-slate-200 w-[25%]">
      {label}
    </label>
    <div className="w-[90%]">{children}</div>
  </div>
);

const ProfileContent = () => {
  const { getLoggedInUser } = useContext(AuthContext); // Assuming AuthContext provides this
  const navigate = useNavigate();

  // State to hold the user's profile data, initialized with empty strings
  const [profile, setProfile] = useState({
    fullname: "",
    username: "",
    profilePicture: "", // URL of the profile picture
    email: "",
    bio: "",
    location: "",
    website: "",
    linkedin: "",
    twitter: "",
  });

  const [loading, setLoading] = useState(true); // Set to true initially for fetching
  const [error, setError] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // State for success message

  useEffect(() => {
    const fetchOrCreateUserProfile = async () => {
      setLoading(true);
      setError(null);
      try {
        const loggedInUser = await getLoggedInUser();

        if (!loggedInUser || !loggedInUser.email) {
          navigate("/login"); // Redirect if no user or email
          return;
        }

        // Attempt to fetch existing profile
        const fetchResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_API_URL}/profileSettings?email=${
            loggedInUser.email
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Include Authorization header if your backend requires it for fetching
              // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (fetchResponse.ok) {
          const fetchedProfile = await fetchResponse.json();
          setProfile(fetchedProfile); // Set profile from fetched data
        } else if (fetchResponse.status === 404) {
          // Profile not found, create a new one
          console.log("Profile not found, creating new one...");
          const newProfileData = {
            fullname: loggedInUser.fullname || "",
            username: loggedInUser.username || "",
            profilePicture: loggedInUser.profilePicture || "",
            email: loggedInUser.email, // Email is crucial for initial creation
            bio: loggedInUser.bio || "",
            location: loggedInUser.location || "",
            website: loggedInUser.website || "",
            linkedin: loggedInUser.linkedin || "",
            twitter: loggedInUser.twitter || "",
          };

          const createResponse = await fetch(
            `${import.meta.env.VITE_BACKEND_API_URL}/profileSettings`,
            {
              method: "POST", // Use POST for creating
              headers: {
                "Content-Type": "application/json",
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify(newProfileData),
            }
          );

          if (createResponse.ok) {
            const createdProfile = await createResponse.json();
            setProfile(createdProfile);
            console.log("Profile created successfully.");
          } else {
            const errorData = await createResponse.json();
            throw new Error(
              errorData.message || "Failed to create profile on login."
            );
          }
        } else {
          const errorData = await fetchResponse.json();
          throw new Error(
            errorData.message || "Failed to fetch profile settings."
          );
        }
      } catch (err) {
        console.error("Error in fetchOrCreateUserProfile:", err);
        setError(err.message || "Failed to load profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateUserProfile();
  }, [getLoggedInUser, navigate]); // Depend on getLoggedInUser and navigate

  const onChangeData = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handles form submission to update user profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setIsUpdating(true); // Set updating state
    setError(null); // Clear previous errors
    setShowSuccess(false); // Hide previous success message

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Ensure the email is present for the update, likely from the current profile state
      if (!profile.email) {
        throw new Error("User email is missing for profile update.");
      }

      // Send a PUT request to update the profile
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_API_URL}/profileSettings`,
        {
          method: "PUT", // Use PUT for updating an existing resource
          headers: {
            "Content-Type": "application/json",
            // 'Authorization': `Bearer ${token}`, // Include JWT token for authentication
          },
          body: JSON.stringify({
            // Send all updatable fields, including email for identification
            email: profile.email, // IMPORTANT: Send email to identify which profile to update
            fullname: profile.fullname,
            username: profile.username,
            profilePicture: profile.profilePicture, // Send updated picture URL if any
            bio: profile.bio,
            location: profile.location,
            website: profile.website,
            linkedin: profile.linkedin,
            twitter: profile.twitter,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update profile");
      }

      const updatedData = await response.json();
      setProfile(updatedData); // Update state with the data returned from the backend
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false); // Reset updating state
    }
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading profile...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 animate-fadeInforProfile max-w-8xl mx-auto py-8 px-18">
      <div>
        <h1 className="text-3xl font-bold text-white font-poppins">
          Profile Settings
        </h1>
        <p className="text-slate-400 mt-1">Update your profile information.</p>
      </div>

      <form onSubmit={handleUpdateProfile} className="space-y-12">
        <div className="flex gap-12">
          {/* Avatar Section */}
          <SettingsCard
            title="Profile Picture"
            description="Update your profile picture."
          >
            <div className="flex flex-col w-100 h-80 items-center gap-y-4 md:gap-x-8">
              <div className="flex flex-col items-center gap-15">
                <div className="relative w-80 group">
                  {/* Display profile picture or initial */}
                  {profile.profilePicture ? (
                    <img
                      src={profile.profilePicture}
                      alt="Profile Avatar"
                      className="w-80 h-80 rounded-full object-cover border-4 border-slate-700"
                    />
                  ) : (
                    <div className="w-80 h-80 flex items-center justify-center rounded-full border-4 border-slate-700 !text-8xl font-bold text-white">
                      {profile.username
                        ? profile.username.charAt(0).toUpperCase()
                        : "U"}
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
                {/* The "Upload Photo" button now triggers the hidden file input */}
                <button
                  type="button" // Important: type="button" to prevent form submission
                  onClick={() =>
                    document.getElementById("avatar-upload").click()
                  }
                  className="text-sm text-white"
                >
                  Upload Photo
                </button>
              </div>
            </div>
          </SettingsCard>
          {/* Personal Information Section */}
          <div className="w-[70%]">
            <SettingsCard
              title="Personal Information"
              description="Edit your personal details."
            >
              <FormField label="Full Name">
                <input
                  type="text"
                  name="fullname"
                  value={profile.fullname}
                  onChange={onChangeData}
                  className="input-field"
                  placeholder="Full Name"
                />
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
                    onChange={onChangeData}
                    className="input-field !pl-8"
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
                    onChange={onChangeData}
                    className="input-field"
                    placeholder="your email"
                    disabled // Disable email field as it's usually not changeable directly
                  />
                </div>
              </FormField>
              <FormField label="Location">
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={onChangeData}
                  className="input-field"
                  placeholder="City, Country"
                />
              </FormField>
              <FormField label="Bio">
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={onChangeData}
                  rows="6"
                  className="input-field"
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
            <div className="relative">
              <Globe className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-500" />
              <input
                type="url"
                name="website"
                value={profile.website}
                onChange={onChangeData}
                className="input-field !pl-12"
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
                onChange={onChangeData}
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
                onChange={onChangeData}
                className="input-field !pl-12"
                placeholder="https://twitter.com/your-handle"
              />
            </div>
          </FormField>
        </SettingsCard>

        {/* Save Button and Messages */}
        <div className="mt-12 pt-8 flex justify-start ml-10 border-t border-slate-700 items-center gap-4">
          <button
            type="submit"
            className="
              bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500
              text-white font-bold px-10 py-3.5 rounded-lg shadow-lg
              transition-all duration-300 hover:brightness-110
              focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-opacity-60
            "
            disabled={isUpdating} // Disable button while updating
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
          {showSuccess && (
            <p className="text-green-500 text-sm">
              Profile updated successfully!
            </p>
          )}
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
      </form>
    </div>
  );
};

export default ProfileContent;
