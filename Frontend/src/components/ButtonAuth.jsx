import React from "react";

const ButtonAuth = ({ innerText }) => {
  return (
    <button
      type="submit"
      className="group relative w-full flex justify-center  border border-transparent  bg-gradient-to-r from-cyan-400 to-purple-600 !text-white font-bold px-12 py-5 rounded-full hover:opacity-90 transition-opacity transform hover:scale-105 shadow-2xl shadow-purple-500/20 text-xl font-poppins tracking-wide"
    >
      {innerText}
    </button>
  );
};

export default ButtonAuth;
