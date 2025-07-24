import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";

const Settings = () => {
  return (
    <div className="min-h-screen flex bg-[#0D1117] text-slate-300 font-inter">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 bg-slate-900/80 backdrop-blur-sm border-r border-slate-800 flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <SettingsIcon className="w-7 h-7 text-cyan-400" />
          <h1 className="text-2xl font-bold text-white font-poppins">
            Settings
          </h1>
        </div>

        <nav className="flex flex-col space-y-2">
          <SettingsLink to="/settings/profile" icon={<User />}>
            Profile
          </SettingsLink>
          <SettingsLink to="/settings/dashboard" icon={<User />}>
            Dashboard
          </SettingsLink>
          <SettingsLink to="/settings/security" icon={<Shield />}>
            Security
          </SettingsLink>
          <SettingsLink to="/settings/notifications" icon={<Bell />}>
            Notifications
          </SettingsLink>
          <SettingsLink to="/settings/billing" icon={<CreditCard />}>
            Billing
          </SettingsLink>
        </nav>

        <div className="mt-auto">
          <NavLink
            to="/logout" // Assuming you have a route that handles logout
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-semibold">Log Out</span>
          </NavLink>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-8 md:p-10">
        {/* The Outlet will render the component for the active nested route */}
        <Outlet />
      </main>
    </div>
  );
};

// A reusable NavLink component for the settings sidebar to keep the code clean
const SettingsLink = ({ to, icon, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-base ${
          isActive
            ? "bg-cyan-500/10 text-cyan-400 font-semibold"
            : "text-slate-400 hover:bg-slate-700/50 hover:text-slate-200"
        }`
      }
    >
      {React.cloneElement(icon, { className: "w-5 h-5" })}
      <span>{children}</span>
    </NavLink>
  );
};

export default Settings;
