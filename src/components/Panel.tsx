"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PanelProps {
  id: string;
  title: string;
  index: string;
  isActive: boolean;
  bgImage: string;
  onClick: () => void;
  children: React.ReactNode;
}

export default function Panel({
  id,
  title,
  index,
  isActive,
  bgImage,
  onClick,
  children,
}: PanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    const titleEl = titleRef.current;
    if (!panel || !content || !titleEl) return;

    // Detect screen width
    const isDesktop = window.innerWidth >= 1024;

    if (isDesktop) {
      if (isActive) {
        // Animate panel width to active state
        gsap.to(panel, {
          width: "76%",
          duration: 0.8,
          ease: "power3.inOut",
        });
        // Fade in content
        gsap.to(content, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
        });
        // Fade out collapsed title
        gsap.to(titleEl, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // Animate panel width to inactive state
        gsap.to(panel, {
          width: "6%",
          duration: 0.8,
          ease: "power3.inOut",
        });
        // Fade out content
        gsap.to(content, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.3,
          ease: "power2.out",
        });
        // Fade in collapsed title
        gsap.to(titleEl, {
          opacity: 1,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
        });
      }
    } else {
      // Mobile/Tablet Vertical Accordion
      if (isActive) {
        gsap.to(panel, {
          height: "calc(100vh - 240px)",
          minHeight: "450px",
          duration: 0.6,
          ease: "power3.inOut",
        });
        gsap.to(content, {
          opacity: 1,
          pointerEvents: "auto",
          duration: 0.4,
          delay: 0.1,
        });
        gsap.to(titleEl, {
          opacity: 0,
          duration: 0.2,
        });
      } else {
        gsap.to(panel, {
          height: "60px",
          minHeight: "60px",
          duration: 0.6,
          ease: "power3.inOut",
        });
        gsap.to(content, {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.2,
        });
        gsap.to(titleEl, {
          opacity: 1,
          duration: 0.4,
        });
      }
    }
  }, [isActive]);

  return (
    <div
      id={id}
      ref={panelRef}
      className={`relative overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 bg-background transition-all duration-300 ${
        isActive ? "z-10" : "z-0"
      } ${
        isActive
          ? "w-full h-[calc(100vh-240px)] min-h-[450px] lg:w-[76%] lg:h-full"
          : "w-full h-[60px] min-h-[60px] lg:w-[6%] lg:h-full"
      }`}
    >
      {/* Background Image Preview (low opacity when inactive, fades out when active) */}
      <div
        className={`absolute inset-0 bg-neutral-dark transition-opacity duration-700 pointer-events-none ${
          isActive ? "opacity-0" : "opacity-15 group-hover:opacity-25"
        }`}
      >
        <Image
          src={bgImage}
          alt=""
          fill
          className="object-cover filter grayscale contrast-125"
          sizes="20vw"
        />
      </div>

      {/* Click Trigger Area for Inactive State */}
      {!isActive && (
        <button
          onClick={onClick}
          data-cursor="pointer"
          className="absolute inset-0 z-20 h-full w-full bg-transparent text-left focus:outline-none"
          aria-label={`Expand ${title}`}
        />
      )}

      {/* Collapsed Preview Title (Desktop: Vertical text, Mobile: Horizontal header) */}
      <div
        ref={titleRef}
        className="absolute inset-0 flex flex-row lg:flex-col items-center justify-between p-4 lg:py-8 lg:px-0 pointer-events-none select-none z-10 transition-opacity"
      >
        <span className="font-sans text-[10px] font-bold text-accent tracking-widest uppercase lg:rotate-90 lg:my-4">
          {index}
        </span>
        <div className="h-1.5 w-1.5 rounded-full bg-accent/40 lg:my-4 hidden lg:block" />
      </div>

      {/* Expanded Panel Content */}
      <div
        ref={contentRef}
        className="absolute inset-0 h-full w-full opacity-0 pointer-events-none overflow-hidden"
      >
        {children}
      </div>
    </div>
  );
}
