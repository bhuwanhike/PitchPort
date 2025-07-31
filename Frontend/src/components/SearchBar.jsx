import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  mainHeading,
  subHeading,
  placeholderText,
}) => {
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white font-poppins mb-4">
          {mainHeading}
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-8">
          {subHeading}{" "}
        </p>
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder={placeholderText}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-full py-3 pl-12 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
