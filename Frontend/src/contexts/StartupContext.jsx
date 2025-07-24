import axios from "axios";
import { useState } from "react";
import { GetStartupContext } from "./GetStartup";

export const StartupProvider = ({ children }) => {
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
  const [startupList, setStartupList] = useState(allStartups);
  const getStartups = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/startups`
      );
      
      console.log(response.data);
      if (response.data.length > 0) {
        setStartupList(response.data);
      } else {
        setStartupList(allStartups);
      }
    } catch (error) {
      console.error("Error fetching startups:", error);
    }
  };

  return (
    <GetStartupContext.Provider
      value={{ getStartups, startupList, setStartupList }}
    >
      {children}
    </GetStartupContext.Provider>
  );
};
