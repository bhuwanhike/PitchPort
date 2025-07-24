import React, { useContext, useEffect } from "react";
import { MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";
import { GetInvestorContext } from "../contexts/GetInvestor";
import { useParams } from "react-router-dom";

const InvestorDetailPage = () => {
  const { investorId } = useParams();
  const { getInvestors, investorList } = useContext(GetInvestorContext);
  useEffect(() => {
    getInvestors();
  }, []);
  const containerClasses =
    "min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 pt-16 pb-8 box-border"; // Added pt-16 for header space

  // Card styling: Matches the startup cards on the listing page.
  const cardClasses = `
    bg-gray-800 rounded-xl p-8 max-w-4xl mx-auto shadow-2xl text-gray-200 font-sans
    border border-gray-700 
  `; // shadow-2xl for more depth, border for subtle definition
  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <img
            src={`https://logo.clearbit.com/${investorList[investorId].fullname
              .toLowerCase()
              .replace(/\s/g, "")}.com`}
            alt={`Investor Name Logo`}
            className="w-45 h-45 rounded-lg bg-slate-700 object-contain p-1"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/64x64/1e293b/94a3b8?text=" +
                "I".charAt(0);
            }}
          />
          <div className=" w-140 flex flex-col gap-4">
            <div>
              <h3 className="text-4xl font-bold text-white font-poppins">
                {investorList[investorId].fullname}
              </h3>
              <p className="text-md text-slate-400">
                {investorList[investorId].industry}
              </p>
            </div>

            <div className="text-xs text-slate-400 space-y-2">
              <p className="flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2 text-cyan-400" />{" "}
                {"Location : " + investorList[investorId].location}
              </p>
              <p className="flex items-center text-lg ">
                <DollarSign className="w-5 h-5 mr-2 text-cyan-400" />{" "}
                {"Funding Stage : " + investorList[investorId].fundingStage}
              </p>
            </div>
          </div>
        </div>
        {/* <p className="text-slate-300 mb-4 h-12">{""}</p> */}
        <div
          className="flex flex-col gap-10
  mt-8 p-6 bg-gray-900 rounded-xl shadow-inner text-gray-300
  border border-gray-700
"
        >
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Investor Bio
            </h2>
            <p className="text-base leading-relaxed">
              {investorList[investorId].bio}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Notable Investments
            </h2>
            <p className="text-base leading-relaxed">
              {investorList[investorId].notableInvestments}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Funding Details
            </h2>
            <p className="text-base leading-relaxed">
              {investorList[investorId].fundingDetails}
            </p>
          </div>
        </div>
        <div className="buttons flex justify-end mr-8">
          <Link
            to={`/startup/${"Investor ID"}`} // Use _id from MongoDB
            className="mt-6 block w-40  text-center bg-cyan-500 !text-yellow-50 font-semibold py-2 rounded-lg hover:bg-cyan-800  transition-colors"
          >
            Connect
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InvestorDetailPage;
