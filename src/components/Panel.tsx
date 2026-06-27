"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface PanelProps {
  id: string;
  title: string;
  isActive: boolean;
  onClick: () => void;
  children: React.ReactNode;
  index: number;
}

export default function Panel({
  id,
  title,
  isActive,
  onClick,
  children,
  index,
}: PanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const panel = panelRef.current;
    const content = contentRef.current;
    const titleEl = titleRef.current;
    if (!panel || !content || !titleEl) return;

    // Detect screen width
    const isDesktop = window.innerWidth >= 1024;


    if (isInitialRender.current) {
      if (!isActive) {
        if (isDesktop) {
          gsap.fromTo(panel,
            { x: "100vw", opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 1.2,
              delay: (index - 1) * 0.15 + 0.3,
              ease: "power4.out",
              onComplete: () => setHasEntered(true),
            }
          );
        } else {
          gsap.fromTo(panel,
            { y: "100vh", opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1.0,
              delay: (index - 1) * 0.12 + 0.2,
              ease: "power4.out",
              onComplete: () => setHasEntered(true),
            }
          );
        }
      } else {
        setHasEntered(true);
      }
    }

    const isInitial = isInitialRender.current;

    if (isDesktop) {
      if (isActive) {
        // Animate panel width to active state
        gsap.to(panel, {
          width: "76%",
          duration: isInitial ? 0 : 1.0,
          ease: "power4.out",
        });
        // Fade in content
        gsap.to(content, {
          opacity: 1,
          pointerEvents: "auto",
          duration: isInitial ? 0 : 0.8,
          delay: isInitial ? 0 : 0.15,
          ease: "power2.out",
        });
        // Fade out collapsed title
        gsap.to(titleEl, {
          opacity: 0,
          duration: isInitial ? 0 : 0.3,
          ease: "power2.out",
        });
      } else {
        // Animate panel width to inactive state
        gsap.to(panel, {
          width: "6%",
          duration: isInitial ? 0 : 1.0,
          ease: "power4.out",
        });
        // Fade out content
        gsap.to(content, {
          opacity: 0,
          pointerEvents: "none",
          duration: isInitial ? 0 : 0.4,
          ease: "power2.out",
        });
        // Fade in collapsed title
        gsap.to(titleEl, {
          opacity: 1,
          duration: isInitial ? 0 : 0.6,
          delay: isInitial ? 0 : 0.1,
          ease: "power2.out",
        });
      }
    } else {
      // Mobile/Tablet Vertical Accordion
      if (isActive) {
        gsap.to(panel, {
          height: "calc(100vh - 240px)",
          minHeight: "450px",
          duration: isInitial ? 0 : 0.8,
          ease: "power4.out",
        });
        gsap.to(content, {
          opacity: 1,
          pointerEvents: "auto",
          duration: isInitial ? 0 : 0.6,
          delay: isInitial ? 0 : 0.1,
          ease: "power2.out",
        });
        gsap.to(titleEl, {
          opacity: 0,
          duration: isInitial ? 0 : 0.2,
        });
      } else {
        gsap.to(panel, {
          height: "60px",
          minHeight: "60px",
          duration: isInitial ? 0 : 0.8,
          ease: "power4.out",
        });
        gsap.to(content, {
          opacity: 0,
          pointerEvents: "none",
          duration: isInitial ? 0 : 0.3,
          ease: "power2.out",
        });
        gsap.to(titleEl, {
          opacity: 1,
          duration: isInitial ? 0 : 0.5,
        });
      }
    }

    isInitialRender.current = false;
  }, [isActive, id, index]);

  return (
    <div
      id={id}
      ref={panelRef}
      className={`relative overflow-hidden border-b lg:border-b-0 ${
        isActive ? "" : "lg:border-r"
      } border-white/10 bg-background transition-colors duration-300 ${
        isActive ? "z-10" : "z-0"
      } ${
        isActive
          ? "w-full h-[calc(100vh-240px)] min-h-[450px] lg:w-[76%] lg:h-full"
          : "w-full h-[60px] min-h-[60px] lg:w-[6%] lg:h-full"
      } ${
        !isActive && !hasEntered
          ? "opacity-0 translate-y-full lg:translate-y-0 lg:translate-x-full"
          : ""
      }`}
    >
      {/* Background Image Preview (fades out when active) */}
      <div
        className={`absolute inset-0 bg-neutral-dark transition-opacity duration-700 pointer-events-none ${
          isActive ? "opacity-0" : "opacity-100"
        }`}
      >
        <Image
          src="/textured-overlay.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="20vw"
          priority
        />
        {/* Black overlay with opacity 0.75 */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Click Trigger Area for Inactive State */}
      {!isActive && (
        <button
          onClick={onClick}
          data-cursor="pointer"
          className="absolute inset-0 z-20 h-full w-full bg-transparent text-left focus:outline-none cursor-pointer"
          aria-label={`Expand ${title}`}
        />
      )}

      {/* Collapsed Preview Title (Desktop: Vertical text, Mobile: Horizontal header) */}
      <div
        ref={titleRef}
        className={`absolute inset-0 flex flex-row lg:flex-col items-center justify-center p-4 lg:py-8 lg:px-0 pointer-events-none select-none z-10 transition-opacity ${
          isActive ? "opacity-0 pointer-events-none" : ""
        }`}
      >
        <h2 className="font-editorial text-4xl lg:text-5xl font-bold tracking-widest uppercase stroked-title lg:rotate-90 transform whitespace-nowrap">
          {title}
        </h2>
      </div>

      {/* Expanded Panel Content */}
      <div
        ref={contentRef}
        className={`absolute inset-0 h-full w-full overflow-hidden ${
          id === "home" && isActive ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
