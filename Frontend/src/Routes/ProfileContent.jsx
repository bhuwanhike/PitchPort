import React, { useState } from "react";
import { User, Mail, Globe, Linkedin, Twitter, Camera } from "lucide-react";

// Reusable component for a settings section
const SettingsCard = ({ title, description, children }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl">
    <div className="p-6 border-b border-slate-700/80">
      <h2 className="text-xl font-bold text-white">{title}</h2>
      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
    <div className="p-6 space-y-4">{children}</div>
  </div>
);

// Reusable component for a form field
const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      {label}
    </label>
    {children}
  </div>
);

const ProfileContent = () => {
  // Dummy state for demonstration
  const [profile, setProfile] = useState({
    fullName: "Bhavya Tyagi",
    username: "bhavyatyagi",
    email: "bhavya.tyagi@example.com",
    bio: "Founder & CEO at InnovateX. Passionate about building the future of FinTech and supporting early-stage startups.",
    location: "Bengaluru, India",
    website: "https://innovatex.com",
    linkedin: "linkedin.com/in/bhavyatyagi",
    twitter: "twitter.com/bhavyatyagi",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", // Placeholder avatar
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Profile updated:", profile);
    // You would typically show a success toast message here
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white font-poppins">
          Public Profile
        </h1>
        <p className="text-slate-400 mt-1">
          This information will be displayed publicly on your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Picture Section */}
        <SettingsCard
          title="Profile Picture"
          description="Update your profile picture."
        >
          <div className="flex items-center gap-5">
            <div className="relative w-24 h-24">
              <img
                src={profile.avatar}
                alt="Profile Avatar"
                className="w-full h-full rounded-full object-cover"
              />
              <label
                htmlFor="avatar-upload"
                className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
              >
                <Camera className="w-6 h-6 text-white" />
              </label>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
              />
            </div>
            <div>
              <button
                type="button"
                className="bg-slate-700/80 text-slate-300 border border-slate-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-700 hover:border-slate-500 transition-all"
              >
                Upload New Picture
              </button>
              <p className="text-xs text-slate-500 mt-2">
                PNG, JPG, GIF up to 10MB.
              </p>
            </div>
          </div>
        </SettingsCard>

        {/* Personal Information Section */}
        <div className="mt-8">
          <SettingsCard
            title="Personal Information"
            description="Edit your personal details."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField label="Full Name">
                <input
                  type="text"
                  name="fullName"
                  value={profile.fullName}
                  onChange={handleChange}
                  className="input-field"
                />
              </FormField>
              <FormField label="Username">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                    @
                  </span>
                  <input
                    type="text"
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    className="input-field pl-7"
                  />
                </div>
              </FormField>
            </div>
            <FormField label="Bio">
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleChange}
                rows="4"
                className="input-field"
              ></textarea>
            </FormField>
          </SettingsCard>
        </div>

        {/* Online Presence Section */}
        <div className="mt-8">
          <SettingsCard
            title="Online Presence"
            description="Add links to your website and social profiles."
          >
            <FormField label="Website">
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="https://your-website.com"
                />
              </div>
            </FormField>
            <FormField label="LinkedIn">
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="linkedin.com/in/your-profile"
                />
              </div>
            </FormField>
            <FormField label="Twitter">
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  name="twitter"
                  value={profile.twitter}
                  onChange={handleChange}
                  className="input-field pl-10"
                  placeholder="twitter.com/your-handle"
                />
              </div>
            </FormField>
          </SettingsCard>
        </div>

        {/* Save Button */}
        <div className="mt-8 pt-5 flex justify-end border-t border-slate-800">
          <button
            type="submit"
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors"
          >
            Update Profile
          </button>
        </div>
      </form>

      {/* Local styles for this component */}
      <style jsx>{`
        .input-field {
          @apply w-full bg-slate-800 border border-slate-700 rounded-lg py-2.5 px-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ProfileContent;
