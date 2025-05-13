import React from "react";

const Menu = () => {
  return (
    <div className="bg-gray-900 text-white p-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <img
          src="https://cdn.textstudio.com/output/sample/normal/8/7/0/8/mohit-logo-275-28078.png"
          alt="Logo"
          className="h-10 w-auto"
        />

        {/* Horizontal Menu */}
        <nav className="flex gap-6">
          <a href="#hero" className="hover:text-blue-400">Hero</a>
          <a href="#dashboard" className="hover:text-blue-400">Dashboard</a>
          <a href="#tab" className="hover:text-blue-400">Tab</a>
          <a href="#chart" className="hover:text-blue-400">Charts</a>
          <a href="#report" className="hover:text-blue-400">Reports</a>
        </nav>
      </div>
    </div>
  );
};

export default Menu;
