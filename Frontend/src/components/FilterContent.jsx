import React, { useMemo } from "react";
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

const FilterSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  return (
    <div className="py-4 border-b border-slate-700/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <h3 className="font-semibold text-white">{title}</h3>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-4 space-y-2">{children}</div>}
    </div>
  );
};

const Checkbox = ({ id, label, checked, onChange }) => (
  <label htmlFor={id} className="flex items-center space-x-3 cursor-pointer">
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 rounded bg-slate-700 border-slate-600 text-cyan-500 focus:ring-cyan-600 focus:ring-offset-slate-800"
    />
    <span className="text-slate-300">{label}</span>
  </label>
);

const FilterContent = ({ startupList, filters, onFilterChange }) => {
  const locations = useMemo(
    () => [...new Set(startupList.map((s) => s.location))],
    [startupList]
  );

  const fundingStages = [
    "Pre-Seed",
    "Seed",
    "Series A",
    "Series B",
    "Series C",
    "Series D",
  ]; // This can remain static or be generated too

  const industryOptions2 = [
    "SaaS",
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

  return (
    <aside className="lg:col-span-1 lg:sticky lg:top-24 bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6">
      <h2 className="text-xl font-bold text-white mb-4">Filters</h2>
      <FilterSection title="Industry">
        {industryOptions2.map((industry, index) => (
          <Checkbox
            key={index}
            id={`industry-${industry}`}
            label={industry}
            checked={filters.industry.includes(industry)}
            onChange={() => onFilterChange("industry", industry)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Location">
        {locations.map((location, index) => (
          <Checkbox
            key={index}
            id={`location-${location}`}
            label={location}
            checked={filters.location.includes(location)}
            onChange={() => onFilterChange("location", location)}
          />
        ))}
      </FilterSection>
      <FilterSection title="Funding Stage">
        {fundingStages.map((stage, index) => (
          <Checkbox
            key={index}
            id={`stage-${stage}`}
            label={stage}
            checked={filters.fundingStage.includes(stage)}
            onChange={() => onFilterChange("fundingStage", stage)}
          />
        ))}
      </FilterSection>
    </aside>
  );
};

export default FilterContent;
