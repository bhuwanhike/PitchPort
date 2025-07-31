import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";

// You can use your SVG logo component here if you have one, or an <img> tag
const Logo = () => (
  <div className="flex items-center space-x-2">
    <img src="/pp.svg" alt="PitchPort Logo" className="h-10 w-10" />
    <span className="text-2xl font-bold text-white font-poppins">
      PitchPort
    </span>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-slate-900/80 backdrop-blur-sm border-t border-slate-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo and Mission */}
          <div className="lg:col-span-2 mb-6 md:mb-0">
            <Logo />
            <p className="mt-4 text-sm max-w-xs">
              Our mission is to bridge the gap between brilliant startups and
              visionary investors using cutting-edge AI.
            </p>
          </div>

          {/* Column 2: Platform Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Platform
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterLink to="/startups">For Startups</FooterLink>
              </li>
              <li>
                <FooterLink to="/investors">For Investors</FooterLink>
              </li>
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterLink to="/blog">Blog</FooterLink>
              </li>
              <li>
                <FooterLink to="/help">Help Center</FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal Links */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </li>
              <li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright and Socials */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} PitchPort, Inc. All rights
            reserved.
          </p>
          <div className="flex space-x-5 mt-4 sm:mt-0">
            <SocialLink href="#">
              <Twitter className="w-5 h-5" />
            </SocialLink>
            <SocialLink href="#">
              <Linkedin className="w-5 h-5" />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Reusable Link components for the footer to keep code clean
const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
  >
    {children}
  </Link>
);

const SocialLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-500 hover:text-cyan-400 transition-colors"
  >
    {children}
  </a>
);

export default Footer;
