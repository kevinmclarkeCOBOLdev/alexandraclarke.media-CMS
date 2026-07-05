"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import gsap from "gsap";

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
}

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote:
      "Alexandra Clarke’s work as a videographer has earned my theater group a first-rate reputation in Prague’s theater scene for our promotional materials—so much so that other groups ask us for help with their own campaigns.\n\nWithout her work, our season—in which every single performance is sold out—would not have nearly the same success.\n\nOriginal, unique, standout: What Alexandra Clarke has created with her interviews, clips, and trailers for the various plays by “The Mad and Merry Men” has a distinct visual identity that sets us apart from the pool of English theater groups.",
    author: "Gordon L. Schmitz",
    title: "Artistic Director • The Mad and Merry Men, Prague",
  },
  {
    id: 2,
    quote:
      "Collaborating with Alexandra on our annual fashion showcase was an incredible experience. Her cinematography captured the textures, motion, and essence of our collection in a way that static photography never could. The final brand film exceeded all expectations and received high praise from critics and viewers alike.",
    author: "Elena Rostova",
    title: "Lead Fashion Designer • Rostova Haute Couture",
  },
  {
    id: 3,
    quote:
      "Alexandra's documentary work brought our non-profit's mission to life with sensitivity and depth. She has a rare gift for making interview subjects feel entirely at ease, resulting in authentic, powerful moments that resonated deeply with our donors. The engagement on our campaign increased threefold after launching her series.",
    author: "Marcus Vance",
    title: "Executive Director • The Horizon Foundation",
  },
];

export default function TestimonialsPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("testimonial_items");
      if (saved) {
        try {
          setTestimonials(JSON.parse(saved));
        } catch {
          setTestimonials(DEFAULT_TESTIMONIALS);
        }
      } else {
        setTestimonials(DEFAULT_TESTIMONIALS);
        localStorage.setItem("testimonial_items", JSON.stringify(DEFAULT_TESTIMONIALS));
      }
    }
  }, []);

  useEffect(() => {
    if (cardRef.current && testimonials.length > 0) {
      gsap.killTweensOf(cardRef.current);
      gsap.fromTo(
        cardRef.current,
        { x: 150, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      );
    }
  }, [activeIndex, testimonials]);

  const handleNext = () => {
    if (testimonials.length > 0) {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/textured-overlay.jpg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Black overlay with opacity of 75% */}
        <div className="absolute inset-0 bg-black/75" />
      </div>
      {/* Scrollable Content Container (added padding bottom pb-28 md:pb-36 lg:pb-40 for clearance) */}
      <div className="relative z-10 flex h-full w-full flex-col justify-between overflow-y-auto no-scrollbar p-6 pb-28 md:p-12 md:pb-36 lg:p-16 lg:pb-40">
        {/* Giant Quote Mark */}
        <div className="hidden md:block absolute md:right-6 md:bottom-6 md:top-auto md:translate-y-0 2xl:-right-16 2xl:top-1/2 2xl:-translate-y-1/2 2xl:bottom-auto pointer-events-none select-none z-0">
          <Quote className="h-[15vh] lg:h-[20vh] 2xl:h-[66vh] w-auto transform rotate-180" style={{ color: "#FBAB3C" }} />
        </div>

        {/* Top Header */}
        <div className="border-b border-white/10 pb-6">
          <h3 className="font-editorial text-[32px] md:text-6xl font-bold mt-1 stroked-title">
            TESTIMONIALS
          </h3>
        </div>

        {/* Center Testimonial Area */}
        <div className="flex-grow flex flex-col justify-center items-center w-full max-w-4xl mx-auto relative z-10 my-auto py-4">
          {testimonials.length > 0 ? (
            <>
              <div
                ref={cardRef}
                className="w-full border-t border-b border-[#FBAB3C] flex flex-col gap-[10px] bg-transparent"
                style={{ paddingTop: "10px", paddingBottom: "10px" }}
              >
                {/* 1. Small quotes */}
                <div className="flex items-center">
                  <Quote className="h-4 w-4 md:h-5 md:w-5 text-[#FBAB3C]" />
                </div>

                {/* 2. Testimonial text */}
                <p className="font-sans text-xs md:text-sm leading-relaxed text-white/95 whitespace-pre-line">
                  {testimonials[activeIndex]?.quote}
                </p>

                {/* 3. Person's name */}
                <h4 className="font-sans text-[11px] md:text-xs font-bold text-white uppercase tracking-wider">
                  {testimonials[activeIndex]?.author}
                </h4>

                {/* 4. Title */}
                <p className="font-sans text-[9px] md:text-[10px] font-semibold uppercase tracking-widest" style={{ color: "#FBAB3C" }}>
                  {testimonials[activeIndex]?.title}
                </p>
              </div>

              {/* Large '>' Next Button */}
              {testimonials.length > 1 && (
                <button
                  onClick={handleNext}
                  data-cursor="pointer"
                  className="mt-8 text-6xl md:text-7xl font-sans font-extralight text-[#FBAB3C] hover:text-[#FBAB3C]/80 hover:scale-110 active:scale-95 transition-all duration-300 select-none cursor-pointer focus:outline-none"
                  aria-label="Next Testimonial"
                >
                  &gt;
                </button>
              )}
            </>
          ) : (
            <div className="text-center text-white/50 font-sans py-12">
              No testimonials available.
            </div>
          )}
        </div>
      </div>

      {/* Social Icons (bottom left - persistent and non-scrolling!) */}
      <div className="hidden md:flex absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 z-20 flex-col gap-3">
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
            <rect x="2" y="11" width="20" height="9" rx="1.5" fill="#FBAB3C" />
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
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.2 1.23 1.34 2.95 2.1 4.75 2.23-.01 1.29.01 2.58-.02 3.87-1.42-.02-2.81-.49-3.95-1.34-1.02-.79-1.75-1.92-2.09-3.17-.03.77-.02 1.54-.02 2.31v10.15c-.07 1.83-.81 3.61-2.17 4.79-1.57 1.4-3.83 2.06-5.96 1.74-2.31-.32-4.42-1.91-5.18-4.17-.89-2.58-.1-5.59 1.95-7.44 1.47-1.35 3.52-1.96 5.51-1.63.02 1.32.01 2.65.02 3.97-1.12-.22-2.33.09-3.13.88-.84.8-.97 2.1-.33 3.07.64.99 1.96 1.41 3.05 1.01 1.02-.34 1.74-1.37 1.76-2.45.02-4.23.01-8.47.01-12.7z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
