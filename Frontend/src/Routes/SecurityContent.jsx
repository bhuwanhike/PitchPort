import React, { useState, useMemo } from "react";
import {
  KeyRound,
  Smartphone,
  ShieldCheck,
  Monitor,
  LogOut,
  ShieldAlert,
  Wifi,
  WifiOff,
} from "lucide-react";

// --- DUMMY DATA ---
const loginSessions = [
  {
    id: 1,
    browser: "Chrome on Windows",
    location: "Ghaziabad, India",
    time: "Active now",
    isCurrent: true,
  },
  {
    id: 2,
    browser: "Safari on iPhone",
    location: "Mumbai, India",
    time: "2 hours ago",
    isCurrent: false,
  },
  {
    id: 3,
    browser: "Firefox on macOS",
    location: "Bengaluru, India",
    time: "1 day ago",
    isCurrent: false,
  },
];

// --- HELPER COMPONENTS ---

const SettingsCard = ({
  title,
  description,
  children,
  footer,
  isDangerZone = false,
}) => (
  <div
    className={`bg-slate-800/50 backdrop-blur-sm border rounded-2xl ${
      isDangerZone ? "border-red-500/30" : "border-slate-700/80"
    }`}
  >
    <div className="p-6 border-b border-slate-700/80">
      <h2
        className={`text-xl font-bold ${
          isDangerZone ? "text-red-400" : "text-white"
        }`}
      >
        {title}
      </h2>
      <p className="text-sm text-slate-400 mt-1">{description}</p>
    </div>
    <div className="p-6">{children}</div>
    {footer && (
      <div
        className={`p-6 bg-slate-800/30 border-t rounded-b-2xl flex justify-end ${
          isDangerZone ? "border-red-500/20" : "border-slate-700/80"
        }`}
      >
        {footer}
      </div>
    )}
  </div>
);

const FormField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">
      {label}
    </label>
    {children}
  </div>
);

const PasswordStrengthMeter = ({ password }) => {
  const getStrength = useMemo(() => {
    let score = 0;
    if (!password) return score;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const strength = getStrength;
  const colors = [
    "bg-red-500",
    "bg-red-500",
    "bg-orange-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-green-500",
  ];
  const labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"];

  return (
    <div className="flex items-center gap-3 mt-2">
      <div className="w-full bg-slate-700 rounded-full h-2 flex gap-1">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full ${
              strength > i ? colors[strength] : ""
            }`}
          ></div>
        ))}
      </div>
      <span className="text-xs font-semibold text-slate-400 w-20 text-right">
        {labels[strength]}
      </span>
    </div>
  );
};

// --- MAIN SECURITY PAGE COMPONENT ---

const SecurityContent = () => {
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="space-y-8 animate-fadeIn py-8 px-18">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white font-poppins">
          Security Settings
        </h1>
        <p className="text-slate-400 mt-1">
          Manage your account's security settings and keep it safe.
        </p>
      </div>

      {/* Change Password Section */}

      <SettingsCard
        title="Password"
        description="Change your password regularly to keep your account secure."
        footer={
          <button2
            type="button"
            className="bg-cyan-400 hover:bg-cyan-300 text-slate-900 font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors"
          >
            Update Password
          </button2>
        }
      >
        <form className="space-y-4">
          <FormField label="Current Password">
            <input
              type="password"
              name="currentPassword"
              placeholder="••••••••"
              className="input-field"
            />
          </FormField>
          <FormField label="New Password">
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="••••••••"
              className="input-field"
            />
            <PasswordStrengthMeter password={newPassword} />
          </FormField>
        </form>
      </SettingsCard>

      {/* Danger Zone */}

      <SettingsCard
        title="Danger Zone"
        description="These actions are permanent and cannot be undone."
        isDangerZone={true}
        footer={
          <button
            type="button"
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold px-6 py-2.5 rounded-lg shadow-md transition-colors"
          >
            Delete My Account
          </button>
        }
      ></SettingsCard>

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

export default SecurityContent;
