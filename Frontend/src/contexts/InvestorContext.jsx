import axios from "axios";
import { useState, useMemo } from "react";
import { GetInvestorContext } from "./GetInvestor";

export const InvestorProvider = ({ children }) => {
  // --- DUMMY DATA ---
  const allInvestors = useMemo(
    () => [
      {
        id: 1,
        fullname: "Kunal Shah",
        location: "Mumbai",
        industry: ["FinTech", "SaaS", "Consumer"],
        fundingStage: ["Seed", "Series A"],
        bio: "Founder of CRED. Passionate about building high-trust ecosystems and backing disruptive ideas in tech.",
        notableInvestments: ["Razorpay", "Meesho", "Unacademy"],
        socials: { linkedin: "#", twitter: "#", website: "#" },
      },
      {
        id: 2,
        fullname: "Anupam Mittal",
        location: "Mumbai",
        industry: ["Consumer", "HealthTech", "FinTech"],
        fundingStage: ["Pre-Seed", "Seed"],
        bio: "Founder of People Group (Shaadi.com). Early-stage investor focused on scalable consumer internet businesses.",
        notableInvestments: ["Ola Cabs", "Druva", "Whatfix"],
        socials: { linkedin: "#", twitter: "#", website: "#" },
      },
      {
        id: 3,
        fullname: "Rajan Anandan",
        location: "Bengaluru",
        industry: ["SaaS", "AI", "HealthTech"],
        fundingStage: ["Pre-Seed", "Seed", "Series A"],
        bio: "Managing Director at Sequoia Capital. Formerly at Google. Deep expertise in scaling technology companies in India.",
        notableInvestments: ["Dunzo", "Practo", "OYO"],
        socials: { linkedin: "#", twitter: "#", website: "#" },
      },
      {
        id: 4,
        fullname: "Binny Bansal",
        location: "Bengaluru",
        industry: ["E-commerce", "Logistics", "SaaS"],
        fundingStage: ["Seed", "Series A", "Series B"],
        bio: "Co-founder of Flipkart. Now investing in and mentoring the next wave of entrepreneurs through 021 Capital.",
        notableInvestments: ["Acko", "Cure.fit", "Rupeek"],
        socials: { linkedin: "#", twitter: "#", website: "#" },
      },
      {
        id: 5,
        fullname: "Vani Kola",
        location: "Bengaluru",
        industry: ["FinTech", "HealthTech", "Consumer"],
        fundingStage: ["Seed", "Series A"],
        bio: "Managing Director at Kalaari Capital. A visionary investor known for identifying and nurturing category-defining companies.",
        notableInvestments: ["Myntra", "Dream11", "Urban Ladder"],
        socials: { linkedin: "#", twitter: "#", website: "#" },
      },
      {
        id: 6,
        fullname: "Girish Mathrubootham",
        location: "Chennai",
        industry: ["SaaS", "DeepTech"],
        fundingStage: ["Pre-Seed", "Seed"],
        bio: "Founder of Freshworks. Actively invests in and mentors early-stage SaaS founders from India building for the world.",
        notableInvestments: ["Chargebee", "Kissflow", "Whatfix"],
        socials: { linkedin: "#", twitter: "#", website: "#" },
      },
    ],
    []
  );

  const [investorList, setInvestorList] = useState(allInvestors);
  // Fetch startups from the database when the component mounts

  const getInvestors = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_API_URL}/investors`
      );
      if (response.data.length > 0) {
        setInvestorList(response.data);
      } else {
        setInvestorList(allInvestors);
      }
    } catch (error) {
      console.error("Error fetching investors:", error);
      setInvestorList(allInvestors);
    }
  };

  return (
    <GetInvestorContext.Provider
      value={{ getInvestors, investorList, setInvestorList }}
    >
      {children}
    </GetInvestorContext.Provider>
  );
};
