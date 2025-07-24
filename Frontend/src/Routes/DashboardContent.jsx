import React from "react";
import {
  DollarSign,
  Zap,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  MessageSquare,
  Plus,
} from "lucide-react";

// --- DUMMY DATA ---
const dashboardData = {
  stats: {
    totalInvestments: 28,
    portfolioValue: 42500000,
    avgDealSize: 1517857,
  },
  portfolioPerformance: [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 45 },
    { month: "Mar", value: 40 },
    { month: "Apr", value: 60 },
    { month: "May", value: 75 },
    { month: "Jun", value: 85 },
  ],
  investments: [
    { name: "InnovateX", stage: "Series A", amount: 2500000, status: "Active" },
    {
      name: "GreenEnergy Co.",
      stage: "Seed",
      amount: 500000,
      status: "Active",
    },
    {
      name: "SynthWave Labs",
      stage: "Series A",
      amount: 3000000,
      status: "Exited",
    },
    { name: "DataDrive", stage: "Seed", amount: 750000, status: "Active" },
    { name: "Aura AI", stage: "Pre-Seed", amount: 200000, status: "Failed" },
  ],
  recentActivity: [
    {
      type: "New Investment",
      details: "Joined the Seed round for GreenEnergy Co.",
      time: "2 days ago",
      icon: <Plus />,
    },
    {
      type: "Exit",
      details: "Successful exit from SynthWave Labs with a 5x return.",
      time: "1 week ago",
      icon: <DollarSign />,
    },
    {
      type: "Update",
      details: "InnovateX has launched their new AI platform.",
      time: "2 weeks ago",
      icon: <Briefcase />,
    },
    {
      type: "Message",
      details: 'You have a new pitch from "QuantumLeap".',
      time: "3 weeks ago",
      icon: <MessageSquare />,
    },
  ],
};

// --- HELPER COMPONENTS ---

const StatCard = ({ icon, title, value }) => (
  <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  </div>
);

const ChartPlaceholder = ({ data }) => {
  const maxValue = Math.max(...data.map((d) => d.value));
  return (
    <div className="w-full h-64 flex items-end justify-between px-4 pt-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="relative flex-1 flex flex-col items-center justify-end group"
        >
          <div
            className="w-1/2 bg-gradient-to-t from-cyan-500/50 to-cyan-400/80 rounded-t-md transition-all duration-300 group-hover:from-cyan-400 group-hover:to-cyan-300"
            style={{ height: `${(item.value / maxValue) * 100}%` }}
          ></div>
          <span className="text-xs text-slate-500 mt-2">{item.month}</span>
        </div>
      ))}
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---

const DashboardContent = () => {
  const { stats, portfolioPerformance, investments, recentActivity } =
    dashboardData;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white font-poppins">
          Investor Dashboard
        </h1>
        <p className="text-slate-400 mt-1">
          Welcome back, here's a summary of your investment activities.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          icon={<Zap className="w-6 h-6 text-cyan-400" />}
          title="Total Investments"
          value={stats.totalInvestments}
        />
        <StatCard
          icon={<DollarSign className="w-6 h-6 text-green-400" />}
          title="Portfolio Value"
          value={`$${(stats.portfolioValue / 1000000).toFixed(1)}M`}
        />
        <StatCard
          icon={<Target className="w-6 h-6 text-purple-400" />}
          title="Average Deal Size"
          value={`$${(stats.avgDealSize / 1000000).toFixed(2)}M`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Portfolio Performance Chart */}
        <div className="lg:col-span-2 bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            Portfolio Performance
          </h2>
          <ChartPlaceholder data={portfolioPerformance} />
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-1 bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 flex-shrink-0 rounded-full bg-slate-700/50 flex items-center justify-center text-cyan-400">
                  {activity.icon}
                </div>
                <div>
                  <p className="text-sm text-slate-300 font-semibold">
                    {activity.type}
                  </p>
                  <p className="text-xs text-slate-400">{activity.details}</p>
                  <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Investments Table */}
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/80 rounded-2xl">
        <div className="p-6">
          <h2 className="text-xl font-bold text-white">Current Investments</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="border-b border-slate-700/80 text-xs text-slate-400 uppercase">
              <tr>
                <th className="px-6 py-3">Startup</th>
                <th className="px-6 py-3">Stage</th>
                <th className="px-6 py-3">Amount Invested</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {investments.map((investment, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-800 hover:bg-slate-700/30"
                >
                  <td className="px-6 py-4 font-medium text-white">
                    {investment.name}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    {investment.stage}
                  </td>
                  <td className="px-6 py-4 text-slate-300">
                    ${investment.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        investment.status === "Active"
                          ? "bg-green-500/10 text-green-400"
                          : investment.status === "Exited"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {investment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DashboardContent;
