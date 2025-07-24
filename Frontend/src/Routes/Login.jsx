import React, { useState } from "react";
import axios from "axios";
import { User, Lock } from "lucide-react";
import ButtonAuth from "../components/ButtonAuth";
// import { SignIn } from "@clerk/clerk-react";

// import React from 'react'

// const Login = () => {
//   return <SignIn />;
// };

// export default Login;

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/login`, // Make sure this endpoint is correct
        formData
      );
      setSuccess(response.data.message || "Login successful!");
      // Store token in localStorage or use context
      localStorage.setItem("token", response.data.token);

      // Refresh the page after successful login
      setTimeout(() => (window.location.href = "/"), 1500);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-slate-300 font-inter p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-white font-poppins">
            Sign In To Your Account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              Create one now
            </a>
          </p>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-8 shadow-2xl shadow-black/20">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Success Message */}
            {success && (
              <div className="bg-green-500/10 border border-green-500/30 text-green-300 text-sm rounded-lg p-3 text-center">
                {success}
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-sm rounded-lg p-3 text-center">
                {error}
              </div>
            )}

            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                id="username"
                name="username"
                type="text"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Username or Email"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-slate-400"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-cyan-400 hover:text-cyan-300"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <ButtonAuth innerText="Sign In" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
