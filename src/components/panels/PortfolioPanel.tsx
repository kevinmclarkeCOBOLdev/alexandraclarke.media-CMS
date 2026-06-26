"use client";

import { useState } from "react";

export default function PortfolioPanel() {
  const [selectedCategory, setSelectedCategory] = useState("short films");

  const categories = [
    "short films",
    "3d animations",
    "social media marketing",
  ];

  return (
    <div className="flex h-full w-full flex-col p-6 md:p-12 lg:p-16 overflow-y-auto no-scrollbar">
      {/* Top Bar / Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
        <div>
          <h3 className="font-editorial text-2xl md:text-3xl font-bold mt-1 text-foreground">
            PORTFOLIO
          </h3>
        </div>
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              data-cursor="pointer"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 font-sans text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 border ${
                selectedCategory === cat
                  ? "bg-accent text-background border-accent"
                  : "bg-transparent text-foreground/75 border-white/10 hover:border-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Showcase - Removed all projects content as requested */}
      <div className="flex-1 flex items-center justify-center min-h-[200px]" />
    </div>
  );
}
