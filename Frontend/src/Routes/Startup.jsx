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
  Building,
  Mail,
  Lightbulb,
  Target,
  Users,
  Send,
} from "lucide-react";
import axios from "axios";
import FilterContent from "../components/FilterContent";
import { AuthContext } from "../contexts/auth-context";
import SearchBar from "../components/SearchBar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Startup = () => {
  const allStartups = [
    {
      id: 1,
      startupName: "InnovateX",
      industry: "FinTech",
      location: "Bengaluru",
      fundingStage: "Series A",
      fundingAmount: 2500000,
      idea: "AI-driven platform for personal finance management.",
    },
    {
      id: 2,
      startupName: "GreenEnergy Co.",
      industry: "ClimateTech",
      location: "New Delhi",
      fundingStage: "Seed",
      fundingAmount: 500000,
      idea: "Developing next-gen solar panel technology.",
    },
    {
      id: 3,
      startupName: "HealthConnect AI",
      industry: "HealthTech",
      location: "Mumbai",
      fundingStage: "Series B",
      fundingAmount: 10000000,
      idea: "Connecting patients with doctors via telemedicine.",
    },
    {
      id: 4,
      startupName: "CarbonCraft",
      industry: "ClimateTech",
      location: "Bengaluru",
      fundingStage: "Pre-Seed",
      fundingAmount: 150000,
      idea: "Creating building materials from captured carbon.",
    },
    {
      id: 5,
      startupName: "DataDrive",
      industry: "SaaS",
      location: "Pune",
      fundingStage: "Seed",
      fundingAmount: 750000,
      idea: "Cloud-based data analytics for small businesses.",
    },
    {
      id: 6,
      startupName: "Groww",
      industry: "FinTech",
      location: "Bengaluru",
      fundingStage: "Series E",
      fundingAmount: 393000000,
      idea: "User-friendly platform for stocks and mutual funds.",
    },
    {
      id: 7,
      startupName: "Licious",
      industry: "FoodTech",
      location: "Bengaluru",
      fundingStage: "Series F",
      fundingAmount: 490000000,
      idea: "Online delivery of fresh meat and seafood.",
    },
    {
      id: 8,
      startupName: "CureBay",
      industry: "HealthTech",
      location: "Bhubaneswar",
      fundingStage: "Seed",
      fundingAmount: 6000000,
      idea: "Hybrid healthcare for rural India.",
    },
    {
      id: 9,
      startupName: "SynthWave Labs",
      industry: "SaaS",
      location: "Mumbai",
      fundingStage: "Series A",
      fundingAmount: 3000000,
      idea: "AI-powered music composition tools for creators.",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoggedIn } = useContext(AuthContext);
  const [filters, setFilters] = useState({
    industry: [],
    location: [],
    fundingStage: [],
  });

  const [startupList, setStartupList] = useState(allStartups);

  const [showForm, setShowForm] = useState(false);
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (category, value) => {
    setFilters((prev) => {
      const newValues = prev[category].includes(value)
        ? prev[category].filter((item) => item !== value)
        : [...prev[category], value];
      return { ...prev, [category]: newValues };
    });
  };

  // Add startup
  const addStartup = useCallback(
    async (startupData) => {
      try {
        // Assuming the backend returns the newly created startup with an _id
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_API_URL}/addstartup`,
          startupData
        );
        // Add the new startup to the list
        setStartupList((prev) => [response.data, ...prev]);
        setShowForm(false); // Close the modal on success
      } catch (error) {
        console.error("Error adding startup:", error);
        // Optionally, show an error message to the user
      }
    },
    [] // No dependencies needed as it uses the functional form of setState
  );

  // Fetch startups from the database when the component mounts
  useEffect(() => {
    const getStartups = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API_URL}/startups`
        );
        if (response.data.length > 0) {
          setStartupList(response.data);
        } else {
          setStartupList(allStartups);
        }
      } catch (error) {
        console.error("Error fetching startups:", error);
        setStartupList(allStartups);
      }
    };
    getStartups();
  }, []); // Empty dependency array ensures this runs only once on mount

  // Check for the action to show the form when the component mounts
  useEffect(() => {
    if (searchParams.get("action") === "showForm") {
      setShowForm(true);
      searchParams.delete("action");
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  // Dynamically generate filter options from the fetched startupList

  // Filter the startups based on state. This now correctly depends on startupList.

  const filteredStartups = useMemo(() => {
    return startupList.filter((startup) => {
      // FIX: Added a fallback to prevent crash if startup.name is undefined
      const searchMatch = (startup.startupName || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const industryMatch =
        filters.industry.length === 0 ||
        filters.industry.includes(startup.industry);
      const locationMatch =
        filters.location.length === 0 ||
        filters.location.includes(startup.location);
      const fundingStageMatch =
        filters.fundingStage.length === 0 ||
        filters.fundingStage.includes(startup.fundingStage);
      return searchMatch && industryMatch && locationMatch && fundingStageMatch;
    });
  }, [filters, searchTerm, startupList]);

  return (
    <div className="min-h-screen bg-[#0D1117] text-slate-300 font-inter">
      {/* Header */}

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        mainHeading="Explore Opportunities"
        subHeading="Discover and connect with the next generation of innovative startups."
        placeholderText="Search by startup name..."
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
          {/* Filters Sidebar */}
          <FilterContent
            startupList={startupList}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          {/* Startups Grid */}
          <main className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStartups.length > 0 ? (
                filteredStartups.map((startup) => (
                  <div
                    key={startup._id || startup.id} // Use _id from MongoDB
                    className="group bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/80 p-6 transition-all duration-300 hover:bg-slate-700/50 hover:border-cyan-400/50 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <img
                        src={`https://logo.clearbit.com/${(
                          startup.startupName || ""
                        )
                          .toLowerCase()
                          .replace(/\s/g, "")}.com`}
                        alt={`${startup.startupName} Logo`}
                        className="w-16 h-16 rounded-lg bg-slate-700 object-contain p-1"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/64x64/1e293b/94a3b8?text=" +
                            (startup.startupName || "S").charAt(0);
                        }}
                      />
                      <div>
                        <h3 className="text-xl font-bold text-white font-poppins">
                          {startup.startupName || "Unnamed Startup"}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {startup.industry || "No Industry"}
                        </p>
                      </div>
                    </div>
                    <p className="text-slate-300 mb-4 h-12">
                      {startup.idea || "No summary available."}
                    </p>
                    <div className="text-xs text-slate-400 space-y-2">
                      <p className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 mr-2 text-cyan-400" />{" "}
                        {startup.location || "No Location"}
                      </p>
                      <p className="flex items-center">
                        <DollarSign className="w-3.5 h-3.5 mr-2 text-cyan-400" />{" "}
                        ${(startup.fundingAmount || 0).toLocaleString()} (
                        {startup.fundingStage || "N/A"})
                      </p>
                    </div>
                    <Link
                      to={`/startup/${startup._id}`} // Use _id from MongoDB
                      className="mt-6 block w-full text-center bg-slate-700/80 text-cyan-400 font-semibold py-2 rounded-lg hover:bg-slate-700 transition-colors"
                    >
                      View Pitch
                    </Link>
                  </div>
                ))
              ) : (
                <div className="md:col-span-2 text-center py-16">
                  <p className="text-slate-400 text-lg">
                    No startups match your criteria.
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Submit Startup Button */}
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
        Submit Startup
      </button>

      {/* Submit Form Modal */}
      {showForm && (
        <SubmitStartupForm
          onClose={() => setShowForm(false)}
          addStartup={addStartup}
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
            You need to be logged in to submit a startup.
          </Alert>
        </div>
      )}
    </div>
  );
};

// --- SUBMIT STARTUP FORM COMPONENT (Modal) ---
const SubmitStartupForm = ({ onClose, addStartup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const startupData = Object.fromEntries(formData.entries());
    // Convert fundingNeeded to a number
    // startupData.fundingNeeded = Number(startupData.fundingNeeded);
    addStartup(startupData); // Pass form data to the addStartup function
    onClose();
    window.location.href = "/startups"; // Close the form on submit
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

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative w-full max-w-3xl">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-2xl blur-md opacity-60"></div>
        <div className="relative bg-slate-800/80 backdrop-blur-lg border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-slideUp">
          <div className="flex items-center justify-between p-6 border-b border-slate-700/80 flex-shrink-0">
            <h2 className="text-2xl font-bold !text-white font-poppins">
              Submit Your Startup
            </h2>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-red-400"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-6 overflow-y-auto max-h-[80vh]"
          >
            <section>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                Core Details
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
                <FormField
                  icon={<Building />}
                  label="Startup Name"
                  name="startupName"
                  placeholder="e.g., InnovateX"
                  required
                />
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
                <FormField
                  icon={<MapPin />}
                  label="Location"
                  name="location"
                  placeholder="e.g., Bengaluru, India"
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
              </div>
              <div className="mt-5">
                <FormField
                  icon={<Lightbulb />}
                  label="Core Idea"
                  isTextArea={true}
                  name="idea"
                  placeholder="Describe your startup's mission and solution..."
                  required
                />
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                Funding
              </h3>
              <div className="grid md:grid-cols-2 gap-5">
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

                <FormField
                  icon={<DollarSign />}
                  label="Funding Amount Needed ($)"
                  type="number"
                  name="fundingAmount"
                  placeholder="e.g., 500000"
                  required
                />
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold text-cyan-400 mb-4">
                The Team
              </h3>
              <FormField
                icon={<Users />}
                label="Founding Team"
                isTextArea={true}
                name="team"
                placeholder="Tell us about the founders and key team members..."
              />
            </section>
            <div className="text-right pt-4 border-t border-slate-700/50">
              <button
                type="submit"
                className="inline-flex items-center gap-2 bg-cyan-400 hover:bg-cyan-300 text-white font-bold px-8 py-2.5 rounded-lg shadow-md transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit for Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

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

export default Startup;
