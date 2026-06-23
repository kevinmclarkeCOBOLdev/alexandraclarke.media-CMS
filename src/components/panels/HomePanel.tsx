"use client";

import { useState } from "react";

export default function HomePanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative flex h-full w-full flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden">
      {/* Background Video Player */}
      <div className="absolute inset-0 overflow-hidden z-0 bg-black pointer-events-auto">
        <iframe
          className="absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          src="https://www.youtube.com/embed/jEye9YVJ7q4?autoplay=1&mute=1&controls=1&rel=0&playsinline=1"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          title="Background Showreel"
        ></iframe>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start">
        <div>
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            ALEXANDRA CLARKE
          </h2>
          <p className="font-sans text-lg md:text-xl font-medium text-white mt-2 tracking-wide">
            filmmaker, 3d-modeller, animator, & social media manager
          </p>
        </div>
      </div>

      {/* Social Icons (bottom left) */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 z-10 flex flex-col gap-3">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/alexandra.lexi.clarke/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
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
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "22px", height: "22px" }}>
            <text x="50%" y="35%" textAnchor="middle" fontSize="6.5" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fill="white">You</text>
            <rect x="2" y="11" width="20" height="9" rx="1.5" fill="white"/>
            <text x="50%" y="17.5%" textAnchor="middle" fontSize="6" fontWeight="900" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" className="fill-[#1F1F1F] group-hover:fill-[#2F2F2F] transition-colors duration-300" transform="translate(0, 10)">Tube</text>
          </svg>
        </a>

        {/* TikTok */}
        <a
          href="https://www.tiktok.com/@its.keeby.and.kirby"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.2 1.23 1.34 2.95 2.1 4.75 2.23-.01 1.29.01 2.58-.02 3.87-1.42-.02-2.81-.49-3.95-1.34-1.02-.79-1.75-1.92-2.09-3.17-.03.77-.02 1.54-.02 2.31v10.15c-.07 1.83-.81 3.61-2.17 4.79-1.57 1.4-3.83 2.06-5.96 1.74-2.31-.32-4.42-1.91-5.18-4.17-.89-2.58-.1-5.59 1.95-7.44 1.47-1.35 3.52-1.96 5.51-1.63.02 1.32.01 2.65.02 3.97-1.12-.22-2.33.09-3.13.88-.84.8-.97 2.1-.33 3.07.64.99 1.96 1.41 3.05 1.01 1.02-.34 1.74-1.37 1.76-2.45.02-4.23.01-8.47.01-12.7z"/>
          </svg>
        </a>
      </div>

      {/* Play Showreel Button (Centered, level with TikTok icon) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-12 lg:bottom-16 z-10">
        <button
          onClick={() => setIsModalOpen(true)}
          data-cursor="pointer"
          className="flex h-12 w-[190px] items-center justify-center bg-[#1F1F1F] hover:bg-[#2F2F2F] text-white rounded-[50px] font-sans text-xs md:text-sm font-semibold tracking-wider transition-all duration-300 hover:scale-105 shadow-lg border border-white/5 cursor-pointer"
        >
          Play Showreel
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-2.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      {/* Immersive Video Modal Popup (90% of screen dimensions) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-[90vw] h-[90vh] bg-black border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center shadow-2xl">
            {/* Close Button 'X' at top right */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center bg-black/60 hover:bg-black/90 text-white rounded-full p-2 border border-white/10 transition-all duration-300 hover:scale-110 cursor-pointer"
              title="Close Modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Video Iframe (Unmuted showreel playback) */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/jEye9YVJ7q4?autoplay=1&controls=1&rel=0&playsinline=1"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="Showreel Video Player"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}
