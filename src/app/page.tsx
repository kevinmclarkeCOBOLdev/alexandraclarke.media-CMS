"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Panel from "@/components/Panel";
import HomePanel from "@/components/panels/HomePanel";
import AboutPanel from "@/components/panels/AboutPanel";
import PortfolioPanel from "@/components/panels/PortfolioPanel";
import TestimonialsPanel from "@/components/panels/TestimonialsPanel";
import ContactPanel from "@/components/panels/ContactPanel";

const PANELS = [
  { id: "home", title: "Home", index: "01", bgImage: "" },
  { id: "about", title: "About", index: "02", bgImage: "/alex-intro-image-ylo-bg.webp" },
  { id: "portfolio", title: "Portfolio", index: "03", bgImage: "/portfolio-fashion.png" },
  { id: "testimonials", title: "Testimonials", index: "04", bgImage: "/portfolio-commercial.png" },
  { id: "contact", title: "Contact", index: "05", bgImage: "/portfolio-fashion.png" },
];

export default function Page() {
  const [activePanel, setActivePanel] = useState("home");
  const [isClient, setIsClient] = useState(false);
  const lastScrollTime = useRef(0);
  const touchStart = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update hash state
  const handlePanelChange = useCallback((id: string) => {
    setActivePanel(id);
    if (typeof window !== "undefined") {
      window.history.pushState(null, "", `#${id}`);
    }
  }, []);

  // Sync state with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (PANELS.some((p) => p.id === hash)) {
        setActivePanel(hash);
      }
    };

    if (typeof window !== "undefined") {
      if (window.location.hash) {
        handleHashChange();
      }
      window.addEventListener("hashchange", handleHashChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("hashchange", handleHashChange);
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const currentIndex = PANELS.findIndex((p) => p.id === activePanel);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (currentIndex < PANELS.length - 1) {
          handlePanelChange(PANELS[currentIndex + 1].id);
        }
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (currentIndex > 0) {
          handlePanelChange(PANELS[currentIndex - 1].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePanel, handlePanelChange]);

  // Mouse wheel scroll navigation (debounced to prevent rapid skipping)
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      // Prevent scroll-based transitions on desktop
      if (typeof window !== "undefined" && window.innerWidth >= 1024) return;

      const now = Date.now();
      if (now - lastScrollTime.current < 1000) return; // 1 second cooldown

      // Ensure we are not scrolling inside scrollable container elements
      const target = e.target as HTMLElement;
      const scrollable = target.closest(".overflow-y-auto");
      if (scrollable) {
        // If the inner container is scrollable and we haven't reached the bounds, don't trigger panel change
        const scrollTop = scrollable.scrollTop;
        const scrollHeight = scrollable.scrollHeight;
        const clientHeight = scrollable.clientHeight;
        
        if (e.deltaY > 0 && scrollTop + clientHeight < scrollHeight - 10) return;
        if (e.deltaY < 0 && scrollTop > 10) return;
      }

      const currentIndex = PANELS.findIndex((p) => p.id === activePanel);

      if (e.deltaY > 50) {
        if (currentIndex < PANELS.length - 1) {
          lastScrollTime.current = now;
          handlePanelChange(PANELS[currentIndex + 1].id);
        }
      } else if (e.deltaY < -50) {
        if (currentIndex > 0) {
          lastScrollTime.current = now;
          handlePanelChange(PANELS[currentIndex - 1].id);
        }
      }
    },
    [activePanel, handlePanelChange]
  );

  // Swipe gestural navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = touchStart.current.x - e.changedTouches[0].clientX;
    const deltaY = touchStart.current.y - e.changedTouches[0].clientY;
    const currentIndex = PANELS.findIndex((p) => p.id === activePanel);

    // Detect horizontal swipes for desktop or vertical accordion card swipes
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe) {
      if (deltaX > 80 && currentIndex < PANELS.length - 1) {
        handlePanelChange(PANELS[currentIndex + 1].id);
      } else if (deltaX < -80 && currentIndex > 0) {
        handlePanelChange(PANELS[currentIndex - 1].id);
      }
    } else {
      if (deltaY > 80 && currentIndex < PANELS.length - 1) {
        handlePanelChange(PANELS[currentIndex + 1].id);
      } else if (deltaY < -80 && currentIndex > 0) {
        handlePanelChange(PANELS[currentIndex - 1].id);
      }
    }
  };

  return (
    <div
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col h-screen w-screen overflow-hidden bg-background text-foreground"
    >
      {/* Panels Container */}
      <main className="flex flex-col lg:flex-row h-full w-full">
        {PANELS.map((panel, idx) => {
          // Defer rendering of inactive panels until client mount to avoid layout pulses
          if (panel.id !== "home" && !isClient) return null;

          return (
            <Panel
              key={panel.id}
              id={panel.id}
              title={panel.title}
              isActive={activePanel === panel.id}
              onClick={() => handlePanelChange(panel.id)}
              index={idx}
            >
              {panel.id === "home" && (
                <HomePanel />
              )}
              {panel.id === "about" && <AboutPanel />}
              {panel.id === "portfolio" && <PortfolioPanel />}
              {panel.id === "testimonials" && <TestimonialsPanel />}
              {panel.id === "contact" && <ContactPanel />}
            </Panel>
          );
        })}
      </main>
    </div>
  );
}
