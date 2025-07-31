import mongoose from "mongoose";

const AddInvestorSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
    enum: [
      // Technology & Software
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
      // Health & Wellness
      "HealthTech",
      "BioTech",
      "MedTech (Medical Devices)",
      "Pharmaceuticals",
      "Mental Health",
      "Fitness & Wellness",
      "Telemedicine",
      // Finance & Commerce
      "FinTech",
      "E-commerce",
      "Marketplace",
      "InsurTech (Insurance Tech)",
      "RegTech (Regulatory Tech)",
      "Cryptocurrency & Blockchain",
      "WealthTech",
      "Lending",
      // Media & Entertainment
      "Gaming",
      "Social Media",
      "Content Creation",
      "Streaming Services",
      "AdTech (Advertising Tech)",
      "AR/VR (Augmented/Virtual Reality)",
      "Publishing",
      // Consumer Goods & Services
      "FoodTech",
      "Fashion & Apparel",
      "Consumer Electronics",
      "Home Goods",
      "Travel & Hospitality",
      "EdTech (Education Tech)",
      "AgriTech (Agriculture Tech)",
      "Pet Tech",
      // Sustainability & Energy
      "CleanTech",
      "Renewable Energy",
      "ClimateTech",
      "EV (Electric Vehicles)",
      "Waste Management",
      "Sustainable Materials",
      // Hardware & Manufacturing
      "IoT (Internet of Things)",
      "Robotics",
      "3D Printing",
      "Aerospace",
      "Automotive",
      "Semiconductors",
      // Professional Services & B2B
      "Logistics & Supply Chain",
      "Real Estate Tech (PropTech)",
      "HR Tech",
      "Legal Tech",
      "Marketing Tech (MarTech)",
    ],
  },
  fundingStage: {
    type: String,
    enum: ["Pre-Seed", "Seed", "Series A", "Series B", "Series C", "Series D"],
    required: true,
  },
  risk: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  portfolioSize: {
    type: String,
    required: true,
  },
});

const AddInvestor = mongoose.model("Investor", AddInvestorSchema);

export default AddInvestor;
