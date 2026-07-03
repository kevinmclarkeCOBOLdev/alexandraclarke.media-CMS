"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditHomeOpen, setIsEditHomeOpen] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [showreelUrlInput, setShowreelUrlInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  useEffect(() => {
    if (isEditHomeOpen && typeof window !== "undefined") {
      const savedUrl = localStorage.getItem("home_bg_video_url") || "https://www.youtube.com/watch?v=BoUrWXaQUQQ";
      const savedShowreelUrl = localStorage.getItem("home_showreel_video_url") || "https://www.youtube.com/watch?v=BoUrWXaQUQQ";
      const savedYear = localStorage.getItem("copyright_year") || "2026";
      setVideoUrlInput(savedUrl);
      setShowreelUrlInput(savedShowreelUrl);
      setYearInput(savedYear);
    }
  }, [isEditHomeOpen]);

  const extractYouTubeId = (url: string): string => {
    if (!url) return "BoUrWXaQUQQ";
    if (url.length === 11 && !url.includes("/") && !url.includes(".")) {
      return url;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "BoUrWXaQUQQ";
  };

  const handleSave = () => {
    if (typeof window !== "undefined") {
      const videoId = extractYouTubeId(videoUrlInput);
      const showreelId = extractYouTubeId(showreelUrlInput);
      localStorage.setItem("home_bg_video_url", videoUrlInput);
      localStorage.setItem("home_bg_video_id", videoId);
      localStorage.setItem("home_showreel_video_url", showreelUrlInput);
      localStorage.setItem("home_showreel_video_id", showreelId);
      localStorage.setItem("copyright_year", yearInput);
    }
    setIsEditHomeOpen(false);
  };

  useEffect(() => {
    setIsMounted(true);
    // Simple client-side auth check
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("lexi_cms_session");
      if (!session) {
        router.push("/lexilogin");
      }
    }
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("lexi_cms_session");
      localStorage.removeItem("lexi_cms_user");
    }
    router.push("/lexilogin");
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen w-screen bg-[#151515] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FBAB3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const panels = ["Home", "About", "Portfolio", "Testimonials", "Contact"];

  return (
    <div className="relative min-h-screen w-screen bg-[#151515] flex flex-col justify-center items-center py-8 md:py-12 px-4 overflow-y-auto select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[500px] md:h-[500px] bg-[#FBAB3C]/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[10%] w-[250px] h-[250px] bg-[#FBAB3C]/3 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Structured / Themed Background Pattern (Subtle) */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-10"
        style={{ 
          backgroundImage: "url('/textured-overlay.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      />

      {/* Top Header - Same size as Home Panel - Positioned absolutely at the top on desktop */}
      <div className="relative md:absolute md:top-8 left-0 right-0 z-10 w-full flex flex-col items-center text-center mt-4 md:mt-0">
        <h1 className="font-editorial text-[43.4px] md:text-[85.8px] lg:text-[80.4px] font-bold tracking-tight stroked-title leading-none uppercase">
          ALEXANDRA CLARKE{" "}
          <span
            className="inline-block font-editorial text-[#FBAB3C]"
            style={{
              fontSize: "0.5em",
              WebkitTextFillColor: "#FBAB3C",
              WebkitTextStroke: "0px",
            }}
          >
            B.A.
          </span>
        </h1>
        <div className="flex items-center justify-center gap-2 mt-4">
          <span className="h-[1px] w-8 bg-[#FBAB3C]/40" />
          <span className="font-sans text-xs md:text-sm font-semibold uppercase tracking-[4px] text-[#FBAB3C]">
            CMS PORTAL / DEV
          </span>
          <span className="h-[1px] w-8 bg-[#FBAB3C]/40" />
        </div>
      </div>

      {/* Dashboard Card Container - Same styling/sizing as login card */}
      <div className="relative z-10 w-full max-w-[660px] my-6 flex flex-col items-center">
        <div 
          className="w-full bg-[#151515]/65 backdrop-blur-md border border-[#FBAB3C]/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 min-h-[270px] text-center"
          style={{ padding: "15px" }}
        >
          <div className="mb-6">
            <h2 className="font-sans text-xl font-medium tracking-wider text-[#FBAB3C] uppercase mb-2">
              What do you want to do?
            </h2>
            <div className="h-[1px] w-12 bg-[#FBAB3C]/30 mx-auto mt-3" />
          </div>

          <div className="flex flex-col gap-3 my-6">
            {panels.map((panel) => (
              <a
                key={panel}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (panel === "Home") {
                    setIsEditHomeOpen(true);
                  }
                }}
                className="group relative flex items-center justify-center w-full h-[50px] bg-[#0A0A0A] border border-[#FBAB3C]/15 rounded-lg px-6 font-sans text-sm font-semibold uppercase tracking-[1.5px] text-neutral-grey hover:text-[#FBAB3C] hover:border-[#FBAB3C]/40 transition-all duration-300"
              >
                <span>Edit {panel} Panel</span>
                <ArrowRight className="absolute right-6 w-4 h-4 text-neutral-grey/50 group-hover:text-[#FBAB3C] group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
          </div>
        </div>

        {/* 25px Spacer between dashboard box and logout button */}
        <div style={{ height: "25px" }} />

        {/* Logout Button with rounded-[50px] border-radius and halved width, centered */}
        <button
          onClick={handleLogout}
          className="relative w-1/2 h-[58px] flex items-center justify-center bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-sm font-semibold uppercase tracking-[2px] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(251,171,60,0.25)] cursor-pointer"
        >
          <span className="flex items-center gap-2">
            Log Out <LogOut className="w-5 h-5" />
          </span>
        </button>
      </div>
      {/* Edit Home Panel Modal */}
      {isEditHomeOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "10px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "10px" }}
            >
              EDIT HOME PANEL
            </h3>
            
            <div>
              {/* Field 1 */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Change the background video with another YouTube video
                </label>
                <input
                  type="text"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Field 2 */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Change the showreel video with another YouTube video
                </label>
                <input
                  type="text"
                  value={showreelUrlInput}
                  onChange={(e) => setShowreelUrlInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Field 3 */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Year
                </label>
                <input
                  type="text"
                  value={yearInput}
                  onChange={(e) => setYearInput(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="2026"
                />
              </div>
            </div>

            {/* Spacer 10px */}
            <div style={{ height: "10px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => setIsEditHomeOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
