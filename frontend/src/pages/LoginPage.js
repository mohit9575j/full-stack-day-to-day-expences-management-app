import React from 'react';
import Dashboard from '../components/Dashboard';
import LeadDashboard from '../components/leadDashboard';
import ExpensePieChart from '../components/Charts.js';
import Report from '../components/Reports';
import Hero from '../components/Hero';
import  ScrollInfo  from '../components/Scroll.js';
import Tab from '../components/Tab';
import Footer from '../components/Footer.js';
import Menu from '../components/Menu.js';

 function SignInPage() {
  return<div>

  
      <div id="menu"  >
        <Menu />
      </div>
 

      <div id="hero">
        <Hero />
      </div>

      <div id="dashboard">
        <Dashboard />
      </div>

      <div id="tab" className="bg-gradient-to-r h-screen overflow-y-auto from-gray-900 via-gray-800 to-black py-10">
        <Tab />
      </div>

      
         <div id="lead">
        <LeadDashboard />
      </div>

      <div id="scroll">
        <ScrollInfo />
      </div>

      <div id="chart">
        <ExpensePieChart />
      </div>

      <div id="report">
        <Report />
      </div>

      <div id="footer">
        <Footer />
      </div>
    </div>
 // JSX me component ko tag ke form me return karo
}

export default SignInPage;
