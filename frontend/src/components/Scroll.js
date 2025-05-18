"use client";
import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";


const content = [
  {
    title: "Manage Your Expenses",
    description:
      "Track, categorize, and manage all your daily expenses in one place. With our intuitive dashboard, you can easily add, edit, or delete expenses and stay in control of your budget. Whether it’s groceries, bills, or travel, we’ve got you covered",
    content: (
      <div
        className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        Manage Your Expenses
      </div>
    ),
  },
  {
    title: "View Leaderboard",
    description:
      "See how your spending habits compare with friends, family, or colleagues. Our leaderboard lets you compete in a fun and healthy way to manage money better. Rank higher by spending smart and saving more",
    // content: (
    //   <div className="flex h-full w-full items-center justify-center text-white">
    //     <img
    //       src="/linear.webp"
    //       width={300}
    //       height={300}
    //       className="h-full w-full object-cover"
    //       alt="linear board demo" />
    //   </div>
    // ),

    content: (
      <div
        className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
        View Leaderboard
      </div>
    ),
 

  },
  {
    title: "Download Reports",
    description:
      "Get detailed reports of your monthly or yearly spending. You can download these reports as PDFs and analyze where your money goes. Perfect for personal reviews or submitting to finance departments.",
    content: (
      <div
        className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
    Download Reports
      </div>
    ),
  },
  {
    title: "   Visualize with Graphs",
    description:
      " Understand your spending trends through easy-to-read graphs. Whether it’s daily, weekly, or monthly views, our visualizations help you quickly see where you're overspending and where you can save more.",
    content: (
      <div
        className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
       Visualize with Graphs
      </div>
    ),
  },
];
export default function StickyScrollRevealDemo() {
  return (
    <div className="w-full py-4">
      <StickyScroll content={content} />
    </div>
  );
}

