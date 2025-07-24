import React, { useEffect, useState } from "react";
import { MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

// import { useParams } from "react-router-dom"; // Import useParams hook

const StartupDetailPage = () => {
  //   const { startupId } = useParams(); // Get the dynamic ID from the URL
  const [startupData, setStartupData] = useState(null);
  //   const [loading, setLoading] = useState(true);
  //   const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const fetchStartupDetails = async () => {
  //       setLoading(true);
  //       setError(null);
  //       try {
  //         // --- IMPORTANT: Replace with your actual API endpoint ---
  //         // This is where you'd fetch the specific startup's data using its ID
  //         const response = await fetch(
  //           `http://localhost:5000/startups/${startupId}`
  //         );
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! status: ${response.status}`);
  //         }
  //         const data = await response.json();
  //         setStartupData(data);
  //       } catch (e) {
  //         setError(e.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     if (startupId) {
  //       // Only fetch if startupId is available
  //       fetchStartupDetails();
  //     }
  //   }, [startupId]); // Re-run effect if startupId changes

  //   if (loading) {
  //     return <div>Loading startup details...</div>;
  //   }

  //   if (error) {
  //     return <div>Error loading startup: {error}</div>;
  //   }

  //   if (!startupData) {
  //     return <div>Startup not found.</div>;
  //   }
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
            src={`https://logo.clearbit.com/${"Startup Name"
              .toLowerCase()
              .replace(/\s/g, "")}.com`}
            alt={`Startup Name Logo`}
            className="w-45 h-45 rounded-lg bg-slate-700 object-contain p-1"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/64x64/1e293b/94a3b8?text=" +
                "S".charAt(0);
            }}
          />
          <div className=" w-140 flex flex-col gap-4">
            <div>
              <h3 className="text-4xl font-bold text-white font-poppins">
                {"Startup Name"}
              </h3>
              <p className="text-md text-slate-400">{"Industry"}</p>
            </div>

            <div className="text-xs text-slate-400 space-y-2">
              <p className="flex items-center text-lg">
                <MapPin className="w-5 h-5 mr-2 text-cyan-400" />{" "}
                {"Location : "}
              </p>
              <p className="flex items-center text-lg ">
                <DollarSign className="w-5 h-5 mr-2 text-cyan-400" />{" "}
                {"Funding Amount : "}
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
              Startup Idea
            </h2>
            <p className="text-base leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              eligendi suscipit laudantium temporibus quos vitae unde, corrupti
              similique dolores, in aspernatur? Beatae iure reprehenderit
              placeat architecto sapiente maxime quaerat repellendus. Ex, quas
              sed atque odio quisquam qui? Recusandae sequi voluptatum veritatis
              consequatur, cum ipsum dolores atque, ab at doloribus tempora.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Team Info</h2>
            <p className="text-base leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              eligendi suscipit laudantium temporibus quos vitae unde, corrupti
              similique dolores, in aspernatur? Beatae iure reprehenderit
              placeat architecto sapiente maxime quaerat repellendus. Ex, quas
              sed atque odio quisquam qui? Recusandae sequi voluptatum veritatis
              consequatur, cum ipsum dolores atque, ab at doloribus tempora.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">
              Funding Details
            </h2>
            <p className="text-base leading-relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil
              eligendi suscipit laudantium temporibus quos vitae unde, corrupti
              similique dolores, in aspernatur? Beatae iure reprehenderit
              placeat architecto sapiente maxime quaerat repellendus. Ex, quas
              sed atque odio quisquam qui? Recusandae sequi voluptatum veritatis
              consequatur, cum ipsum dolores atque, ab at doloribus tempora.
            </p>
          </div>
        </div>
        <div className="buttons flex justify-around">
          <Link
            to={`/startup/${"Startup ID"}`} // Use _id from MongoDB
            className="mt-6 block w-40  text-center bg-pink-600 !text-yellow-50 font-semibold py-2 rounded-lg hover:bg-pink-800  transition-colors"
          >
            Add to Porfolio
          </Link>
          <Link
            to={`/startup/${"Startup ID"}`} // Use _id from MongoDB
            className="mt-6 block w-40 text-center bg-cyan-400 !text-slate-900 font-semibold py-2 rounded-lg hover:bg-cyan-600 transition-colors "
          >
            Invest Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartupDetailPage;
