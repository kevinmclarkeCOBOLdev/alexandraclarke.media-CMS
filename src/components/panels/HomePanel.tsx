"use client";

import { Play } from "lucide-react";

interface HomePanelProps {
  onNavigate: (section: string) => void;
}

export default function HomePanel({ onNavigate }: HomePanelProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between p-6 md:p-12 lg:p-16">
      {/* Top Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-editorial text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground">
            ALEXANDRA CLARKE
          </h2>
          <p className="font-sans text-xs md:text-sm text-neutral-grey mt-2 tracking-wide">
            Creative Director, Filmmaker & Visual Storyteller
          </p>
        </div>
      </div>

      {/* Showreel Card / Center content */}
      <div className="my-8 flex-1 flex flex-col justify-center">
        <div
          data-cursor="badge"
          data-cursor-text="PLAY"
          className="group relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-neutral-dark border border-white/5 cursor-pointer shadow-2xl"
        >
          {/* Background Cinematic Overlay */}
          <div className="absolute inset-0 bg-[url('/portfolio-commercial.png')] bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-85" />
          
          {/* Showreel Controls / Info */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-background shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Play className="h-5 w-5 fill-background ml-0.5" />
              </div>
              <div>
                <p className="font-sans text-sm font-bold tracking-wide text-foreground">
                  CRAFTING STORIES
                </p>
                <p className="font-sans text-[10px] text-accent font-semibold tracking-wider uppercase">
                  Play Showreel &bull; 2:14
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-background/80 border border-white/5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="font-sans text-[9px] font-bold tracking-widest text-foreground">LIVE REEL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="flex justify-end border-t border-white/10 pt-6">
        <div className="flex gap-4">
          <button
            data-cursor="pointer"
            onClick={() => onNavigate("portfolio")}
            className="px-6 py-3 bg-accent text-background font-sans text-xs font-bold tracking-widest uppercase hover:bg-accent-muted transition-colors duration-300"
          >
            Explore Work
          </button>
          <button
            data-cursor="pointer"
            onClick={() => onNavigate("contact")}
            className="px-6 py-3 border border-white/20 hover:border-accent text-foreground font-sans text-xs font-bold tracking-widest uppercase transition-colors duration-300"
          >
            Get In Touch
          </button>
        </div>
      </div>
    </div>
  );
}
