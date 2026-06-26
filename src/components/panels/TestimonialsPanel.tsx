"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export default function TestimonialsPanel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      quote:
        "Alexandra Clarke is a visionary director. She captured our brand's heritage with breathtaking aesthetic choices and a cinematic narrative that exceeded all key metrics.",
      author: "Eleanor Sterling",
      role: "Global Creative Director",
      company: "Vogue Creative Lab",
    },
    {
      quote:
        "Her collaborative process, attention to technical details, and editorial eye resulted in the most successful commercial film campaign in our brand's history.",
      author: "Marcus Vance",
      role: "VP of Brand Marketing",
      company: "Aether Lifestyle Group",
    },
    {
      quote:
        "Alexandra doesn't just shoot films; she structures light and emotion. A master class in filmmaking and design direction.",
      author: "Dr. Julian Croft",
      role: "Festival Curator",
      company: "London Independent Film Gala",
    },
  ];

  const brands = [
    "Vogue",
    "Stella McCartney",
    "BMW Group",
    "ARRI Media",
    "Sotheby's",
    "BFI",
  ];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Scrollable Content Container (added padding bottom pb-28 md:pb-36 lg:pb-40 for clearance) */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-y-auto no-scrollbar p-6 pb-28 md:p-12 md:pb-36 lg:p-16 lg:pb-40">
        {/* Top Header */}
        <div>
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            Endorsements
          </span>
          <h3 className="font-editorial text-2xl md:text-3xl font-bold mt-1 text-foreground">
            WHAT CLIENTS SAY
          </h3>
        </div>

        {/* Center Slideshow */}
        <div className="my-8 relative flex-1 flex flex-col justify-center max-w-4xl">
          <Quote className="h-12 w-12 text-accent/25 absolute -top-6 -left-4" />
          <div className="relative z-10 transition-all duration-500">
            <p className="font-editorial text-lg md:text-2xl lg:text-3xl leading-relaxed text-foreground tracking-wide">
              &ldquo;{testimonials[activeIndex].quote}&rdquo;
            </p>
            <div className="mt-6">
              <h4 className="font-sans text-xs md:text-sm font-bold text-foreground">
                {testimonials[activeIndex].author}
              </h4>
              <p className="font-sans text-[10px] text-accent font-semibold uppercase tracking-widest mt-1">
                {testimonials[activeIndex].role} &bull; {testimonials[activeIndex].company}
              </p>
            </div>
          </div>

          {/* Slide Controls */}
          <div className="flex gap-3 mt-8">
            <button
              data-cursor="pointer"
              onClick={handlePrev}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-accent text-foreground transition-colors duration-300"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              data-cursor="pointer"
              onClick={handleNext}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 hover:border-accent text-foreground transition-colors duration-300"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Bottom Metrics and Client Logo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8 items-center">
          {/* Metric stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-neutral-dark rounded border border-white/5">
              <p className="font-sans text-xl md:text-2xl font-bold text-accent">98%</p>
              <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest mt-1">
                Client Satisfaction
              </p>
            </div>
            <div className="p-4 bg-neutral-dark rounded border border-white/5">
              <p className="font-sans text-xl md:text-2xl font-bold text-accent">250M+</p>
              <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest mt-1">
                Digital Video Impressions
              </p>
            </div>
          </div>

          {/* Agency Logo Grid */}
          <div>
            <p className="font-sans text-[9px] font-bold text-neutral-grey uppercase tracking-widest mb-3">
              Collaborators & Brands
            </p>
            <div className="grid grid-cols-3 gap-2">
              {brands.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center py-2 px-3 rounded bg-neutral-dark/50 border border-white/5"
                >
                  <span className="font-editorial text-xs font-bold text-neutral-grey tracking-widest text-center hover:text-accent transition-colors duration-300">
                    {brand}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Social Icons (bottom left - persistent and non-scrolling!) */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 z-20 flex flex-col gap-3">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/alexandra.lexi.clarke/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-[#FBAB3C] transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>

        {/* YouTube */}
        <a
          href="https://www.youtube.com/channel/UCrj_CL9J9GvSdUxoOE0Jzgg"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-[#FBAB3C] transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "22px", height: "22px" }}>
            <text x="50%" y="35%" textAnchor="middle" fontSize="6.5" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fill="#FBAB3C">You</text>
            <rect x="2" y="11" width="20" height="9" rx="1.5" fill="#FBAB3C"/>
            <text x="50%" y="17.5%" textAnchor="middle" fontSize="6" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" className="fill-[#1F1F1F] group-hover:fill-[#2F2F2F] transition-colors duration-300" transform="translate(0, 10)">Tube</text>
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@its.keeby.and.kirby"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-[#FBAB3C] transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.2 1.23 1.34 2.95 2.1 4.75 2.23-.01 1.29.01 2.58-.02 3.87-1.42-.02-2.81-.49-3.95-1.34-1.02-.79-1.75-1.92-2.09-3.17-.03.77-.02 1.54-.02 2.31v10.15c-.07 1.83-.81 3.61-2.17 4.79-1.57 1.4-3.83 2.06-5.96 1.74-2.31-.32-4.42-1.91-5.18-4.17-.89-2.58-.1-5.59 1.95-7.44 1.47-1.35 3.52-1.96 5.51-1.63.02 1.32.01 2.65.02 3.97-1.12-.22-2.33.09-3.13.88-.84.8-.97 2.1-.33 3.07.64.99 1.96 1.41 3.05 1.01 1.02-.34 1.74-1.37 1.76-2.45.02-4.23.01-8.47.01-12.7z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
