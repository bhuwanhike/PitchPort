import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Rocket, Lightbulb, Brain, Eye, Users, Zap } from "lucide-react";
import { AuthContext } from "../contexts/auth-context";

const About = () => {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <>
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0; /* Start hidden */
        }
        /* Staggered animation delays */
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
      `}</style>

      <div className="min-h-screen bg-[#0D1117] text-slate-300 font-inter overflow-x-hidden">
        {/* Header Section */}
        <div className="relative bg-slate-900/50 pt-24 pb-16 text-center animate-fadeIn">
          <div className="absolute inset-0 -z-10">
            <img
              src="https://kinsta.com/wp-content/uploads/2021/11/about-us-page.png"
              alt="Abstract network"
              className="w-full h-full object-cover opacity-10"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] to-transparent"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white font-poppins mb-4">
              Our Vision for the Future
            </h1>
            <p className="text-lg md:text-xl text-slate-400">
              We're building the definitive ecosystem where innovation meets
              investment, creating a launchpad for the next generation of
              world-changing ideas.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-20">
          {/* Mission & What We Do Section */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-20 items-center">
            <div className="animate-fadeInUp">
              <h2 className="text-3xl font-bold text-white font-poppins mb-4">
                Our Mission
              </h2>
              <p className="text-slate-400 leading-relaxed">
                We aim to bridge the gap between brilliant startups and
                visionary investors by using cutting-edge AI to make accurate,
                meaningful connections. The world is full of innovation — we
                make sure it doesn’t go unnoticed.
              </p>
            </div>
            <div className="animate-fadeInUp delay-200">
              <h2 className="text-3xl font-bold text-white font-poppins mb-4">
                What We Do
              </h2>
              <p className="text-slate-400 leading-relaxed">
                Our platform is a matchmaking ecosystem for founders and
                funders. Startups submit their ideas and goals; investors
                specify their preferences. Our AI engine then suggests perfect
                fits, saving time, money, and guesswork.
              </p>
            </div>
          </div>

          {/* Core Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            <FeatureCard
              icon={<Brain className="w-8 h-8 text-purple-400" />}
              title="Powered by AI"
              content="Our AI recommends matches and gives scoring insights based on profile compatibility, industry trends, and funding likelihood."
              className="animate-fadeInUp delay-400"
            />
            <FeatureCard
              icon={<Rocket className="w-8 h-8 text-cyan-400" />}
              title="Global Vision"
              content="We believe every innovative idea deserves a chance to grow. Our vision is to become the go-to platform where opportunity meets readiness—globally."
              className="animate-fadeInUp delay-600"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-yellow-400" />}
              title="Accelerating Growth"
              content="Beyond funding, we provide resources and mentorship opportunities to help startups navigate their journey from concept to market leader."
              className="animate-fadeInUp delay-800"
            />
          </div>

          {/* Join Us CTA */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-cyan-400/20 rounded-2xl p-10 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 max-w-4xl mx-auto animate-fadeInUp delay-800">
            <div>
              <h2 className="text-3xl font-bold text-white font-poppins mb-2">
                Ready to Join?
              </h2>
              <p className="text-slate-400 max-w-xl">
                Whether you're a founder seeking fuel for your fire or an
                investor hunting for the next big thing, you're in the right
                place.
              </p>
            </div>

            <Link
              to={isLoggedIn ? "/" : "/register"}
              className="flex-shrink-0 bg-cyan-400 text-slate-900 font-bold px-8 py-3 rounded-full hover:bg-cyan-300 transition-colors transform hover:scale-105 shadow-lg shadow-cyan-500/20"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, content, className }) => (
  <div
    className={`bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/80 transition-all duration-300 hover:border-cyan-400/50 hover:-translate-y-2 ${className}`}
  >
    <div className="mb-4 bg-slate-700/50 w-16 h-16 rounded-xl flex items-center justify-center">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-white font-poppins mb-3">{title}</h3>
    <p className="text-slate-400 leading-relaxed">{content}</p>
  </div>
);

export default About;
