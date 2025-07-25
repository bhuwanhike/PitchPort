import React, { useState, useContext } from "react";
import axios from "axios";
import { User, Mail, Lock, Briefcase } from "lucide-react";
import ButtonAuth from "../components/ButtonAuth";
import { AuthContext } from "../contexts/auth-context";

const Register = () => {
  const { role } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "startup",
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
    window.location.href = "/login";
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_URL}/register`, // Make sure this endpoint is correct
        formData
      );
      setSuccess(response.data.message || "Registration successful!");
      // Optionally, handle token and redirect
      // localStorage.setItem("token", response.data.token);
      // setTimeout(() => window.location.href = "/", 2000);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An unknown error occurred. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0D1117] text-slate-300 font-inter p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl md:text-4xl font-extrabold text-white font-poppins">
            Create Your Account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-cyan-400 hover:text-cyan-300"
            >
              Sign In
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
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
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

            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

              <select
                id="role"
                name="role"
                required
                className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm"
                value={formData.role}
                onChange={handleChange}
              >
                {role === "startup" ? (
                  <>
                    <option value="startup">Startup</option>
                    <option value="investor">Investor</option>
                  </>
                ) : (
                  <>
                    <option value="investor">Investor</option>
                    <option value="startup">Startup</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <ButtonAuth innerText="Create Account" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
