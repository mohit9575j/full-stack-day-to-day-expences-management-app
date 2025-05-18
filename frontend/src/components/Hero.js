import React from "react";
import BackgroundLines from "../ui/HeroUi";

export default function BackgroundLinesDemo() {
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
      💼 Expense Management, <br/><br/> 👨‍💻By it's me Mohit   
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
      A day-to-day expense management project built for Sharpener Tech,
      allowing users to track and manage their daily expenses efficiently
      </p>
    </BackgroundLines>
  );
}

