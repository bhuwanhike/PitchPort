import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Settings, LogOut } from "lucide-react";
import { AuthContext } from "../contexts/auth-context";
import ButtonAuth from "./ButtonAuth";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const { isLoggedIn, Fletter, logout } = useContext(AuthContext);

  const settingsRef = useRef(null);

  // Close settings dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const closeAllMenus = () => {
    setMobileMenuOpen(false);
    setSettingsOpen(false);
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-sm px-6 py-3 sticky top-0 z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Logo */}
          <img src="/pp.svg" alt="" className="w-8 h-8" />
          <Link
            to="/"
            className="flex items-center space-x-2 font-semibold"
            onClick={closeAllMenus}
          >
            <span className="logo-animation text-3xl font-bold !text-pink-600 font-poppins">
              PitchPort
            </span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 !text-slate-300 font-semibold items-center text-[1.1rem]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `transition-colors nav-link !text-cyan-400 ${
                isActive ? "active" : ""
              }`
            }
          >
            Explore
          </NavLink>
          <NavLink
            to="/startups"
            className={({ isActive }) =>
              `transition-colors nav-link !text-cyan-400 ${
                isActive ? "active" : ""
              }`
            }
          >
            Startups
          </NavLink>
          <NavLink
            to="/investors"
            className={({ isActive }) =>
              `transition-colors nav-link !text-cyan-400 ${
                isActive ? "active" : ""
              }`
            }
          >
            Investors
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `transition-colors nav-link !text-cyan-400 ${
                isActive ? "active" : ""
              }`
            }
          >
            About
          </NavLink>
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <Link to="/login">
              <ButtonAuth innerText="Login / Signup" />
            </Link>
          ) : (
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setSettingsOpen(!isSettingsOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold bg-gradient-to-br from-purple-600 to-cyan-500 ring-2 ring-offset-2 ring-offset-slate-900 ring-cyan-500 hover:scale-105 transition-transform"
              >
                {Fletter}
              </button>
              {isSettingsOpen && (
                <div className="absolute top-14 right-0 w-48 bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-lg shadow-2xl py-2 z-50">
                  <Link
                    to="/settings/profile"
                    onClick={closeAllMenus}
                    className="flex items-center px-4 py-2 text-sm text-slate-300 hover:bg-slate-700/50"
                  >
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeAllMenus();
                    }}
                    className="w-full flex items-center px-4 py-2 text-sm text-red-400 hover:bg-slate-700/50"
                  >
                    <LogOut size={16} className="mr-2" />
                    Log out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-slate-300 hover:text-white focus:outline-none"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800">
          <div className="flex flex-col space-y-4 text-lg text-center">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-slate-700/50"
              onClick={closeAllMenus}
            >
              Explore
            </Link>
            <Link
              to="/startups"
              className="block px-4 py-2 hover:bg-slate-700/50"
              onClick={closeAllMenus}
            >
              Startups
            </Link>
            <Link
              to="/investors"
              className="block px-4 py-2 hover:bg-slate-700/50"
              onClick={closeAllMenus}
            >
              Investors
            </Link>
            <Link
              to="/about"
              className="block px-4 py-2 hover:bg-slate-700/50"
              onClick={closeAllMenus}
            >
              About
            </Link>
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                onClick={closeAllMenus}
              >
                Login / Signup
              </Link>
            ) : (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/settings/profile"
                  className="block px-4 py-2 hover:bg-slate-700/50"
                  onClick={closeAllMenus}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    closeAllMenus();
                  }}
                  className="block px-4 py-2 text-red-400 hover:bg-slate-700/50"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
