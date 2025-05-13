import React from "react";
import { FaGithub, FaEnvelope, FaTools } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white p-20 md:p-30 lg:p-30">
      <div className="container mx-auto px-12 flex flex-col md:flex-row items-start justify-between">
        {/* Logo and description on the left */}
        <div className="mb-6 md:mb-0 flex flex-col justify-between">
          <div>
            <img
              src="https://cdn.textstudio.com/output/sample/normal/8/7/0/8/mohit-logo-275-28078.png" // Replace with your actual logo path
              alt="Logo"
              className="h-24 w-auto mb-2" // Increased logo size (h-16)
            />
            <p className="text-sm max-w-xs mb-4">
Expense management app that helps users easily track their income, monitor daily spending, manage budgets, and analyze finances through real-time charts and detailed reports.            </p>
          </div>
        </div>

        {/* Vertical Menu in the center */}
        <ul className="flex flex-col gap-1 mb-6 md:mb-0"> {/* Reduced gap here */}
        <a href="#hero" className="hover:text-blue-400">Hero</a>
        <a href="#dashboard" className="hover:text-blue-400">Dashboard</a>
         <a href="#tab" className="hover:text-blue-400">tab</a>
         <a href="#chart" className="hover:text-blue-400">Charts</a>
         <a href="#report" className="hover:text-blue-400">Reports</a>
         </ul>

        {/* Footer icons on the right */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end">
          <div className="flex justify-center md:justify-end gap-4 mb-2">
            <a href="mailto:joshimohit8130@email.com" className="hover:text-gray-400" title="Contact">
              <FaEnvelope size={20} />
            </a>
            <a href="https://github.com/mohit9575j" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400" title="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://www.sharpener.tech/" className="hover:text-gray-400" title="Sharpner Tech">
              <FaTools size={20} />
            </a>
          </div>
          <p className="text-sm mt-4">&copy; {new Date().getFullYear()} Mohit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
