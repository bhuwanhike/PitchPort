import React, {
  useState,
  useMemo,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Briefcase,
  MapPin,
  DollarSign,
  ChevronDown,
  X,
  PlusCircle,
  Linkedin,
  Twitter,
  Globe,
  User,
  Mail,
  Lightbulb,
  Send,
  Target,
  ShieldAlert,
  Wallet,
} from "lucide-react";
import { AuthContext } from "../contexts/auth-context";
import SearchBar from "../components/SearchBar";
import FilterContent from "../components/FilterContent";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { GetInvestorContext } from "../contexts/GetInvestor";

const Investor = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const { getInvestors, investorList, setInvestorList } =
    useContext(GetInvestorContext);

  const [filters, setFilters] = useState({
    industry: [],
    location: [],
    fundingStage: [],
  });
  // const locationOptions = [...new Set(allInvestors.map((i) => i.location))];
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("action") === "showInvestorForm") {
      setShowForm(true);
      searchParams.delete("action");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const newValues = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: newValues };
    });
  };

  // Add startup
  const addInvestor = useCallback(
    async (investorData) => {
      try {
        // Ensure multi-select fields are arrays

        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/addinvestor`,
          investorData
        );
        console.log(response.data);
        setInvestorList((prev) => [response.data, ...prev]);
        setShowForm(false); // Close modal on success
      } catch (error) {
        console.error(
          "Error adding investor:",
          error.response ? error.response.data : error.message
        );
      }
    },
    [] // No dependencies needed as it uses the functional form of setState
  );
  useEffect(() => {
    getInvestors();
  }, []);

  // const filteredStartups = useMemo(() => {
  //   return startupList.filter((startup) => {
  //     // FIX: Added a fallback to prevent crash if startup.name is undefined
  //     const searchMatch = (startup.startupName || "")
  //       .toLowerCase()
  //       .includes(searchTerm.toLowerCase());
  //     const industryMatch =
  //       filters.industry.length === 0 ||
  //       filters.industry.includes(startup.industry);
  //     const locationMatch =
  //       filters.location.length === 0 ||
  //       filters.location.includes(startup.location);
  //     const fundingStageMatch =
  //       filters.fundingStage.length === 0 ||
  //       filters.fundingStage.includes(startup.fundingStage);
  //     return searchMatch && industryMatch && locationMatch && fundingStageMatch;
  //   });
  // }, [filters, searchTerm, startupList]);

  const filteredInvestors = useMemo(() => {
    return investorList.filter((investor) => {
      const searchMatch = (investor.fullname || " ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const industryMatch =
        filters.industry.length === 0 ||
        filters.industry.includes(investor.industry);
      const locationMatch =
        filters.location.length === 0 ||
        filters.location.includes(investor.location);
      const stageMatch =
        filters.fundingStage.length === 0 ||
        filters.fundingStage.includes(investor.fundingStage);
      return searchMatch && industryMatch && locationMatch && stageMatch;
    });
  }, [getInvestors, filters, searchTerm, investorList]);

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-300 font-inter">
      {/* Header */}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        mainHeading={"Meet the Investors"}
        subHeading={
          "Find and connect with strategic investors ready to fuel the next big thing."
        }
        placeholderText={"Search by investor name..."}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <FilterContent
            startupList={investorList}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* Investors Grid */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInvestors.length > 0 ? (
                filteredInvestors.map((investor, index) => (
                  <div
                    key={index}
                    className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/80 p-6 transition-all duration-300  flex flex-col"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={`https://i.pravatar.cc/150?u=${investor.id}`}
                        alt={`${investor.fullname}`}
                        className="w-16 h-16 rounded-full border-2 border-slate-600"
                      />
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {investor.fullname}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {investor.location}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4 text-sm flex-grow">
                      {investor.bio || "No bio available."}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {investor.industry}
                    </div>

                    {/* Notable Investments */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-slate-200 mb-2">
                        Notable Investments
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {investor.notableInvestments || "No investments"}
                      </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-700/50">
                        <a
                          // href={investor.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                          // href={investor.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                        <a
                          // href={investor.socials.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-slate-400 hover:text-cyan-400"
                        >
                          <Globe className="w-5 h-5" />
                        </a>
                      </div>
                      <Link
                        to={`/investor/${index}`}
                        className="text-slate-400 mt-4 bg-cyan-400 rounded-md px-4 py-1 hover:bg-cyan-600/50 "
                      >
                        View
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-slate-400 lg:col-span-3">
                  No investors found matching your criteria.
                </p>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Add Investor Button */}
      <button
        onClick={() => {
          if (isLoggedIn) {
            setShowForm(true);
          } else {
            setShowLoginAlert(true);
          }
        }}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-5 py-3 rounded-full bg-cyan-400 text-white font-bold shadow-lg shadow-cyan-500/20 hover:scale-105 hover:bg-cyan-300 transition-all transform z-50 "
      >
        <PlusCircle className="w-5 h-5" />
        Become an Investor
      </button>

      {/* Investor Form Modal */}
      {showForm && (
        <SubmitInvestorForm
          onClose={() => setShowForm(false)}
          addInvestor={addInvestor}
        />
      )}

      {/* Login Alert */}
      {showLoginAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50">
          <Alert
            severity="warning"
            onClose={() => {
              setShowLoginAlert(false);
            }}
            className="max-w-md"
          >
            <AlertTitle>Login Required</AlertTitle>
            You need to be logged in to become an investor.
          </Alert>
        </div>
      )}
    </div>
  );
};

// --- SUBMIT INVESTOR FORM COMPONENT (Modal) ---
const SubmitInvestorForm = ({ onClose, addInvestor }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startupData = Object.fromEntries(formData.entries());
    // Convert fundingNeeded to a number
    // startupData.fundingNeeded = Number(startupData.fundingNeeded);
    addInvestor(startupData); // Pass form data to the addStartup function
    onClose();
    window.location.href = "/investors"; // Redirect to investors page after submission
  };

  const industryOptions = [
    "SaaS (Software as a Service)",
    "AI & Machine Learning",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Data Analytics & Big Data",
    "Enterprise Software",
    "Mobile Apps",
    "Web Development",
    "IT Services",
    "HealthTech",
    "BioTech",
    "MedTech (Medical Devices)",
    "Pharmaceuticals",
    "Mental Health",
    "Fitness & Wellness",
    "Telemedicine",
    "FinTech",
    "E-commerce",
    "Marketplace",
    "InsurTech (Insurance Tech)",
    "RegTech (Regulatory Tech)",
    "Cryptocurrency & Blockchain",
    "WealthTech",
    "Lending",
    "Gaming",
    "Social Media",
    "Content Creation",
    "Streaming Services",
    "AdTech (Advertising Tech)",
    "AR/VR (Augmented/Virtual Reality)",
    "Publishing",
    "FoodTech",
    "Fashion & Apparel",
    "Consumer Electronics",
    "Home Goods",
    "Travel & Hospitality",
    "EdTech (Education Tech)",
    "AgriTech (Agriculture Tech)",
    "Pet Tech",
    "CleanTech",
    "Renewable Energy",
    "ClimateTech",
    "EV (Electric Vehicles)",
    "Waste Management",
    "Sustainable Materials",
    "IoT (Internet of Things)",
    "Robotics",
    "3D Printing",
    "Aerospace",
    "Automotive",
    "Semiconductors",
    "Logistics & Supply Chain",
    "Real Estate Tech (PropTech)",
    "HR Tech",
    "Legal Tech",
    "Marketing Tech (MarTech)",
  ];

  const fundingStageOptions = [
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C",
    "Series D",
  ];
  const riskOptions = ["Low", "Medium", "High"];
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-3xl">
        {/* Glow Effect */}
        <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur-md opacity-60"></div>

        {/* Form Container */}
        <div className="relative bg-slate-800/80 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          <div className="flex items-center justify-between p-6 border-b border-slate-700/80 flex-shrink-0">
            <h2 className="text-2xl font-bold !text-white font-poppins">
              Become an Investor
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-red-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form Body */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 overflow-y-auto max-h-[80vh]"
          >
            {/* Section 1: Personal Information */}
            <section>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                Personal Information
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  icon={<User />}
                  label="Full Name"
                  name="fullname"
                  placeholder="e.g., Bhavya Tyagi"
                  required
                />
                <FormField
                  icon={<Mail />}
                  label="Contact Email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
                <FormField
                  icon={<MapPin />}
                  label="Location"
                  name="location"
                  placeholder="e.g., Bengaluru, India"
                  required
                />
              </div>
            </section>

            {/* Section 2: Investment Thesis */}
            <section>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                Investment Thesis
              </h3>
              <div className="space-y-5 ">
                <div className="grid md:grid-cols-2 gap-5">
                  {/* --- MODIFIED INDUSTRY FIELD --- */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Industry
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-slate-500 pointer-events-none">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <select
                        name="industry"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none" // `appearance-none` removes default OS styling
                        defaultValue=""
                      >
                        <option value="" className="text-slate-500">
                          Select an industry
                        </option>
                        {industryOptions.map((opt, index) => (
                          <option
                            key={index}
                            value={opt}
                            className="text-slate-300 "
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 text-slate-500 pointer-events-none">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  {/* --- MODIFIED FUNDING STAGE FIELD --- */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Current Funding Stage
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-slate-500 pointer-events-none">
                        <Target className="w-5 h-5" />
                      </div>
                      <select
                        name="fundingStage"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none " // `appearance-none` removes default OS styling
                        defaultValue=""
                      >
                        <option value="" className="text-slate-500">
                          Select Funding Stage
                        </option>
                        {fundingStageOptions.map((opt, index) => (
                          <option
                            key={index}
                            value={opt}
                            className="text-slate-300 "
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 text-slate-500 pointer-events-none">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-5">
                  {/* --- MODIFIED RISK FIELD --- */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Risk Tolerance
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-slate-500 pointer-events-none">
                        <ShieldAlert className="w-5 h-5" />
                      </div>
                      <select
                        name="risk"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none" // `appearance-none` removes default OS styling
                        defaultValue=""
                      >
                        <option value="" className="text-slate-500">
                          Select Risk Tolerance
                        </option>
                        {riskOptions.map((opt, index) => (
                          <option
                            key={index}
                            value={opt}
                            className="text-slate-300 "
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 text-slate-500 pointer-events-none">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  {/* --- PORTFOLIO SIZE FIELD --- */}
                  {/*<div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Portfolio Size
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-slate-500 pointer-events-none">
                        <Target className="w-5 h-5" />
                      </div>
                      <select
                        name="fundingStage"
                        required
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 appearance-none " // `appearance-none` removes default OS styling
                        defaultValue=""
                      >
                        <option value="" className="text-slate-500">
                          Select Funding Stage
                        </option>
                        {fundingStageOptions.map((opt, index) => (
                          <option
                            key={index}
                            value={opt}
                            className="text-slate-300 "
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 text-slate-500 pointer-events-none">
                        <ChevronDown className="w-5 h-5" />
                      </div>
                    </div>
                  </div>*/}

                  <FormField
                    icon={<Wallet />}
                    label="Portfolio Size"
                    isTextArea={false}
                    name="portfolioSize"
                    placeholder="Your portfolio size..."
                  />
                </div>
                <FormField
                  icon={<Lightbulb />}
                  label="Investment Philosophy"
                  isTextArea={true}
                  name="investmentThesis"
                  placeholder="Briefly describe your investment strategy and what you look for in a startup..."
                />
              </div>
            </section>

            {/* Footer & Submit Button */}
            <div className="text-right pt-4 border-t border-slate-700/50">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-white font-bold px-8 py-2.5 rounded-lg shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Reusable Form Field Component for cleaner code
const FormField = ({
  icon,
  label,
  name,
  placeholder,
  type = "text",
  isTextArea = false,
  required = false,
}) => {
  const inputClasses =
    "w-full bg-slate-900 border border-slate-700 rounded-lg py-2.5 pl-10 pr-4 text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500";
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        {label}
      </label>
      <div className="relative flex items-center">
        <div className="absolute left-3 text-slate-500 pointer-events-none">
          {React.cloneElement(icon, { className: "w-5 h-5" })}
        </div>
        {isTextArea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            rows="3"
            required={required}
            className={inputClasses}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            required={required}
            className={inputClasses}
          />
        )}
      </div>
    </div>
  );
};

export default Investor;
