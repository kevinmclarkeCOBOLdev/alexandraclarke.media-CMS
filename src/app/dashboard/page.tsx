"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, ArrowRight } from "lucide-react";
import Image from "next/image";
import { PortfolioItem, PORTFOLIO_ITEMS } from "@/components/panels/PortfolioPanel";

export default function DashboardPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isEditHomeOpen, setIsEditHomeOpen] = useState(false);
  const [isEditAboutOpen, setIsEditAboutOpen] = useState(false);
  const [isEditPortfolioOpen, setIsEditPortfolioOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [newItemTitle, setNewItemTitle] = useState("");
  const [newItemYoutubeUrl, setNewItemYoutubeUrl] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<"short films" | "3d animations" | "marketing">("short films");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [showreelUrlInput, setShowreelUrlInput] = useState("");
  const [yearInput, setYearInput] = useState("");
  const [biographyInput, setBiographyInput] = useState("");
  const [experienceInput, setExperienceInput] = useState("");
  const [skillsInput, setSkillsInput] = useState("");
  const [cvUrlInput, setCvUrlInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isDeletePortfolioOpen, setIsDeletePortfolioOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [deletingItem, setDeletingItem] = useState<PortfolioItem | null>(null);
  const [isUpdatePortfolioOpen, setIsUpdatePortfolioOpen] = useState(false);
  const [isUpdateItemOpen, setIsUpdateItemOpen] = useState(false);
  const [updatingItem, setUpdatingItem] = useState<PortfolioItem | null>(null);
  const [updateItemTitle, setUpdateItemTitle] = useState("");
  const [updateItemCategory, setUpdateItemCategory] = useState<"short films" | "3d animations" | "marketing">("short films");

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

  useEffect(() => {
    if (isEditAboutOpen && typeof window !== "undefined") {
      const savedBio = localStorage.getItem("about_biography") || 
        "A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews & social media content). Possessing strong problem-solving skills and a naturally outgoing personality, I communicate effectively with a diverse clientele for projects.\n\nI am committed to maintaining high standards of quality and efficiency in all of my projects.";
      setBiographyInput(savedBio);

      const savedExp = localStorage.getItem("about_experience");
      if (savedExp) {
        try {
          const parsed = JSON.parse(savedExp);
          if (Array.isArray(parsed)) {
            const formatted = parsed.map((exp: { company?: string; period?: string; role?: string }) => `${exp.company || ""} | ${exp.period || ""} | ${exp.role || ""}`).join("\n");
            setExperienceInput(formatted);
          } else {
            setExperienceInput("The Mad & Merry Men Theatre Company, Prague | 2024 – 2026 | Social Media Manager & Photographer\nSad Man’s Tongue Restaurant, Prague | 2023 – 2024 | Host & Waitress");
          }
        } catch {
          setExperienceInput("The Mad & Merry Men Theatre Company, Prague | 2024 – 2026 | Social Media Manager & Photographer\nSad Man’s Tongue Restaurant, Prague | 2023 – 2024 | Host & Waitress");
        }
      } else {
        setExperienceInput("The Mad & Merry Men Theatre Company, Prague | 2024 – 2026 | Social Media Manager & Photographer\nSad Man’s Tongue Restaurant, Prague | 2023 – 2024 | Host & Waitress");
      }
      const savedSkills = localStorage.getItem("about_skills");
      if (savedSkills) {
        try {
          const parsed = JSON.parse(savedSkills);
          if (Array.isArray(parsed)) {
            const formatted = parsed.map((skill: { category?: string; items?: string }) => `${skill.category || ""} | ${skill.items || ""}`).join("\n");
            setSkillsInput(formatted);
          } else {
            setSkillsInput("Filmmaking & Creative | Filmmaking (directing, editing, script writing, acting) • 3D Modelling + 3D Animation • Problem solving • Teamwork • Time management • Effective communication\nSoftware & Tools | DaVinci Resolve (film editing) • Blender (3D modelling) • Photoshop (photo editing)");
          }
        } catch {
          setSkillsInput("Filmmaking & Creative | Filmmaking (directing, editing, script writing, acting) • 3D Modelling + 3D Animation • Problem solving • Teamwork • Time management • Effective communication\nSoftware & Tools | DaVinci Resolve (film editing) • Blender (3D modelling) • Photoshop (photo editing)");
        }
      } else {
        setSkillsInput("Filmmaking & Creative | Filmmaking (directing, editing, script writing, acting) • 3D Modelling + 3D Animation • Problem solving • Teamwork • Time management • Effective communication\nSoftware & Tools | DaVinci Resolve (film editing) • Blender (3D modelling) • Photoshop (photo editing)");
      }
      const savedCvUrl = localStorage.getItem("about_cv_url") || "/Alexandra-Clarke-CV-English-v2.pdf";
      setCvUrlInput(savedCvUrl);
    }
  }, [isEditAboutOpen]);

  const extractYouTubeId = (url: string): string => {
    if (!url) return "BoUrWXaQUQQ";
    if (url.length === 11 && !url.includes("/") && !url.includes(".")) {
      return url;
    }
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "BoUrWXaQUQQ";
  };

  const getThumbnailUrl = (item: PortfolioItem) => {
    if (item.videoUrl) {
      return `https://img.youtube.com/vi/${item.videoUrl}/hqdefault.jpg`;
    }
    return item.image || "/placeholder-thumbnail.webp";
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

  const handleSaveAbout = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("about_biography", biographyInput);

      const lines = experienceInput.split("\n").filter(line => line.trim());
      const parsedExp = lines.map(line => {
        const parts = line.split("|");
        return {
          company: (parts[0] || "").trim(),
          period: (parts[1] || "").trim(),
          role: (parts[2] || "").trim()
        };
      });
      localStorage.setItem("about_experience", JSON.stringify(parsedExp));

      const skillLines = skillsInput.split("\n").filter(line => line.trim());
      const parsedSkills = skillLines.map(line => {
        const parts = line.split("|");
        return {
          category: (parts[0] || "").trim(),
          items: (parts[1] || "").trim()
        };
      });
      localStorage.setItem("about_skills", JSON.stringify(parsedSkills));
      localStorage.setItem("about_cv_url", cvUrlInput);
    }
    setIsEditAboutOpen(false);
  };

  const handleSavePortfolioItem = () => {
    if (!newItemTitle.trim() || !newItemYoutubeUrl.trim()) {
      alert("Please fill in all fields.");
      return;
    }

    if (typeof window !== "undefined") {
      const savedItems = localStorage.getItem("portfolio_items");
      let itemsList: PortfolioItem[] = [];

      if (savedItems) {
        try {
          itemsList = JSON.parse(savedItems);
        } catch {
          itemsList = [...PORTFOLIO_ITEMS];
        }
      } else {
        itemsList = [...PORTFOLIO_ITEMS];
      }

      const videoId = extractYouTubeId(newItemYoutubeUrl);
      const maxId = itemsList.reduce((max, item) => (item.id > max ? item.id : max), 0);
      
      const newItem = {
        id: maxId + 1,
        title: newItemTitle.trim(),
        category: newItemCategory,
        image: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        year: "",
        videoUrl: videoId,
      };

      itemsList.push(newItem);
      localStorage.setItem("portfolio_items", JSON.stringify(itemsList));
      setPortfolioItems(itemsList);

      setNewItemTitle("");
      setNewItemYoutubeUrl("");
      setNewItemCategory("short films");
      setIsAddItemOpen(false);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      const updated = portfolioItems.filter((item) => item.id !== deletingItem.id);
      setPortfolioItems(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_items", JSON.stringify(updated));
      }
      setIsConfirmDeleteOpen(false);
      setDeletingItem(null);
    }
  };

  const handleApplyUpdate = () => {
    if (!updateItemTitle.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (updatingItem) {
      const updated = portfolioItems.map((item) => {
        if (item.id === updatingItem.id) {
          return {
            ...item,
            title: updateItemTitle.trim(),
            category: updateItemCategory,
          };
        }
        return item;
      });

      setPortfolioItems(updated);
      if (typeof window !== "undefined") {
        localStorage.setItem("portfolio_items", JSON.stringify(updated));
      }
      setIsUpdateItemOpen(false);
      setUpdatingItem(null);
      setUpdateItemTitle("");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload CV file");
      }

      const data = await response.json();
      if (data.success && data.url) {
        setCvUrlInput(data.url);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Something went wrong during file upload";
      setUploadError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    // Simple client-side auth check
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("lexi_cms_session");
      if (!session) {
        router.push("/lexilogin");
      }

      const savedItems = localStorage.getItem("portfolio_items");
      if (savedItems) {
        try {
          setPortfolioItems(JSON.parse(savedItems));
        } catch {
          setPortfolioItems(PORTFOLIO_ITEMS);
        }
      } else {
        setPortfolioItems(PORTFOLIO_ITEMS);
        localStorage.setItem("portfolio_items", JSON.stringify(PORTFOLIO_ITEMS));
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
          className="w-full bg-[#151515]/65 backdrop-blur-md border border-[#FBAB3C]/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 min-h-[360px] text-center"
          style={{ padding: "15px" }}
        >
          <div className="mb-6 flex flex-col items-center" style={{ marginBottom: "30px" }}>
            <h2 className="font-sans text-xl font-medium tracking-wider text-[#FBAB3C] uppercase mb-2">
              What do you want to do?
            </h2>
            <div className="h-[1px] w-24 bg-[#FBAB3C]/30" style={{ marginTop: "15px", marginLeft: "auto", marginRight: "auto" }} />
          </div>

          <div className="flex flex-col gap-3 my-6" style={{ gap: "15px", marginTop: "30px", marginBottom: "30px" }}>
            {panels.map((panel) => (
              <a
                key={panel}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (panel === "Home") {
                    setIsEditHomeOpen(true);
                  } else if (panel === "About") {
                    setIsEditAboutOpen(true);
                  } else if (panel === "Portfolio") {
                    setIsEditPortfolioOpen(true);
                  }
                }}
                className="group relative flex items-center justify-center w-full h-[50px] bg-[#0A0A0A] border border-[#FBAB3C]/15 rounded-lg px-6 font-sans text-sm font-semibold uppercase tracking-[1.5px] text-neutral-grey hover:text-[#FBAB3C] hover:border-[#FBAB3C]/40 transition-all duration-300"
              >
                <span>Edit {panel} Panel</span>
                <ArrowRight className="absolute right-6 w-4 h-4 text-neutral-grey/50 group-hover:text-[#FBAB3C] group-hover:translate-x-1 transition-all duration-300" />
              </a>
            ))}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
              }}
              className="group relative flex items-center justify-center w-full h-[50px] bg-[#0A0A0A] border border-[#FBAB3C]/15 rounded-lg px-6 font-sans text-sm font-semibold uppercase tracking-[1.5px] text-neutral-grey hover:text-[#FBAB3C] hover:border-[#FBAB3C]/40 transition-all duration-300"
            >
              <span>Edit Social Media Icons</span>
              <ArrowRight className="absolute right-6 w-4 h-4 text-neutral-grey/50 group-hover:text-[#FBAB3C] group-hover:translate-x-1 transition-all duration-300" />
            </a>
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
      {/* Edit About Panel Modal */}
      {isEditAboutOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "10px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "10px" }}
            >
              EDIT ABOUT PANEL
            </h3>
            
            <div>
              {/* Biography Text Area */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Biography
                </label>
                <textarea
                  value={biographyInput}
                  onChange={(e) => setBiographyInput(e.target.value)}
                  rows={6}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Biography text..."
                />
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Edit Work Experience Text Area */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Work Experience
                </label>
                <textarea
                  value={experienceInput}
                  onChange={(e) => setExperienceInput(e.target.value)}
                  rows={6}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Company Name | Period | Role"
                />
                <span className="block font-sans text-[9px] text-neutral-grey/60 mt-1 text-left uppercase tracking-wider">
                  Format: Company Name | Period | Role (one entry per line)
                </span>
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* Edit Skills & Software Text Area */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Skills &amp; Software
                </label>
                <textarea
                  value={skillsInput}
                  onChange={(e) => setSkillsInput(e.target.value)}
                  rows={6}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-y font-sans"
                  placeholder="Category Name | Skills & Tools"
                />
                <span className="block font-sans text-[9px] text-neutral-grey/60 mt-1 text-left uppercase tracking-wider">
                  Format: Category Name | Skills &amp; Tools (one entry per line)
                </span>
              </div>

              {/* Spacer 10px */}
              <div style={{ height: "10px" }} />

              {/* CV File Upload Field */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "10px", display: "block" }}
                >
                  Upload New CV (PDF)
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center justify-center border border-[#FBAB3C]/20 hover:border-[#FBAB3C] bg-[#1A1A1A] hover:bg-[#252525] text-[#FBAB3C] rounded px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer whitespace-nowrap">
                    Choose File
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <span className="font-sans text-xs text-neutral-grey truncate max-w-[250px]">
                    {isUploading ? "Uploading..." : cvUrlInput.replace(/^\//, "")}
                  </span>
                </div>
                {uploadError && (
                  <span className="block font-sans text-[10px] text-red-500 mt-1 text-left">
                    {uploadError}
                  </span>
                )}
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
                onClick={() => setIsEditAboutOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveAbout}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px" }}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Edit Portfolio Panel Modal */}
      {isEditPortfolioOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              EDIT PORTFOLIO
            </h3>
            
            <div className="flex flex-col gap-4" style={{ marginBottom: "20px" }}>
              <button
                type="button"
                onClick={() => setIsAddItemOpen(true)}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                ADD ITEM
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditPortfolioOpen(false);
                  setIsUpdatePortfolioOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                UPDATE ITEM
              </button>
              
              <button
                type="button"
                onClick={() => {
                  setIsEditPortfolioOpen(false);
                  setIsDeletePortfolioOpen(true);
                }}
                className="w-full h-[50px] bg-[#0A0A0A] hover:bg-[#1A1A1A] border border-[#FBAB3C]/20 hover:border-[#FBAB3C]/40 rounded-lg font-sans text-sm font-semibold uppercase tracking-wider text-[#FBAB3C] transition-all duration-300 cursor-pointer"
              >
                DELETE ITEM
              </button>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsEditPortfolioOpen(false)}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Portfolio Item Tertiary Modal */}
      {isAddItemOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              ADD PORTFOLIO ITEM
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Title */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Item Title
                </label>
                <input
                  type="text"
                  value={newItemTitle}
                  onChange={(e) => setNewItemTitle(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Enter item title..."
                />
              </div>

              {/* Field 2: YouTube URL */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  YouTube URL
                </label>
                <input
                  type="text"
                  value={newItemYoutubeUrl}
                  onChange={(e) => setNewItemYoutubeUrl(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="https://www.youtube.com/watch?v=..."
                />
              </div>

              {/* Field 3: Category Dropdown */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Category
                </label>
                <select
                  value={newItemCategory}
                  onChange={(e) => setNewItemCategory(e.target.value as "short films" | "3d animations" | "marketing")}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors cursor-pointer"
                >
                  <option value="short films">SHORT FILM</option>
                  <option value="3d animations">3D ANIMATION</option>
                  <option value="marketing">MARKETING</option>
                </select>
              </div>
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsAddItemOpen(false);
                  // Reset fields
                  setNewItemTitle("");
                  setNewItemYoutubeUrl("");
                  setNewItemCategory("short films");
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePortfolioItem}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Save Item
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Portfolio Item Panel */}
      {isDeletePortfolioOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              DELETE PORTFOLIO ITEM
            </h3>
            
            {/* Rows list, scrollable if there are many items */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {portfolioItems.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No portfolio items found.
                </div>
              ) : (
                portfolioItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="relative w-16 h-10 md:w-20 md:h-12 flex-shrink-0 bg-neutral-900 rounded overflow-hidden border border-white/10">
                        <Image 
                          src={getThumbnailUrl(item)} 
                          alt={item.title} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                          {item.title}
                        </span>
                        <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setDeletingItem(item);
                        setIsConfirmDeleteOpen(true);
                      }}
                      className="px-4 py-2 border border-red-500/20 hover:border-red-500 hover:bg-red-500/10 text-red-500 hover:text-white rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsDeletePortfolioOpen(false);
                  setIsEditPortfolioOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isConfirmDeleteOpen && deletingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[70] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[450px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative text-center"
            style={{ padding: "25px" }}
          >
            <h4 
              className="font-sans text-sm font-bold tracking-widest text-[#FBAB3C] uppercase"
              style={{ marginBottom: "15px" }}
            >
              CONFIRM DELETION
            </h4>
            
            <p className="font-sans text-sm text-white/90 leading-relaxed mb-6">
              Are You Sure You Want To Delete {deletingItem.title}
            </p>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsConfirmDeleteOpen(false);
                  setIsDeletePortfolioOpen(false);
                  setIsEditPortfolioOpen(true);
                  setDeletingItem(null);
                }}
                className="w-[100px] py-2.5 border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
              >
                No
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="w-[100px] py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Portfolio Item Panel */}
      {isUpdatePortfolioOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[600px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative flex flex-col"
            style={{ padding: "20px", maxHeight: "80vh" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              UPDATE PORTFOLIO ITEM
            </h3>
            
            {/* Rows list, scrollable if there are many items */}
            <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-3" style={{ maxHeight: "50vh" }}>
              {portfolioItems.length === 0 ? (
                <div className="text-center py-8 text-neutral-500 font-sans text-sm">
                  No portfolio items found.
                </div>
              ) : (
                portfolioItems.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between gap-4 p-3 bg-[#0A0A0A] border border-white/5 rounded-lg hover:border-[#FBAB3C]/10 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="relative w-16 h-10 md:w-20 md:h-12 flex-shrink-0 bg-neutral-900 rounded overflow-hidden border border-white/10">
                        <Image 
                          src={getThumbnailUrl(item)} 
                          alt={item.title} 
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 64px, 80px"
                        />
                      </div>
                      <div className="min-w-0 flex-1 text-left">
                        <span className="font-sans text-xs md:text-sm text-white font-medium block truncate">
                          {item.title}
                        </span>
                        <span className="font-sans text-[10px] text-neutral-grey uppercase tracking-wider block mt-0.5">
                          {item.category}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setUpdatingItem(item);
                        setUpdateItemTitle(item.title);
                        setUpdateItemCategory(item.category);
                        setIsUpdateItemOpen(true);
                      }}
                      className="px-4 py-2 border border-[#FBAB3C]/20 hover:border-[#FBAB3C] hover:bg-[#FBAB3C]/10 text-[#FBAB3C] rounded-[50px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap"
                    >
                      UPDATE
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setIsUpdatePortfolioOpen(false);
                  setIsEditPortfolioOpen(true);
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Back to Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Portfolio Item Details Tertiary Modal */}
      {isUpdateItemOpen && updatingItem && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
          <div 
            className="w-full max-w-[500px] bg-[#151515] border border-[#FBAB3C]/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative"
            style={{ padding: "20px" }}
          >
            <h3 
              className="font-editorial text-2xl md:text-3xl font-bold tracking-wider text-[#FBAB3C] uppercase text-center"
              style={{ marginBottom: "20px" }}
            >
              UPDATE ITEM DETAILS
            </h3>
            
            <div className="flex flex-col gap-4">
              {/* Field 1: Title */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Item Title
                </label>
                <input
                  type="text"
                  value={updateItemTitle}
                  onChange={(e) => setUpdateItemTitle(e.target.value)}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  placeholder="Enter item title..."
                />
              </div>

              {/* Field 2: Category Dropdown */}
              <div>
                <label 
                  className="font-sans text-[11px] font-bold text-neutral-grey uppercase tracking-widest text-left"
                  style={{ marginBottom: "8px", display: "block" }}
                >
                  Category
                </label>
                <select
                  value={updateItemCategory}
                  onChange={(e) => setUpdateItemCategory(e.target.value as "short films" | "3d animations" | "marketing")}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground focus:outline-none focus:border-[#FBAB3C] transition-colors cursor-pointer"
                >
                  <option value="short films">SHORT FILM</option>
                  <option value="3d animations">3D ANIMATION</option>
                  <option value="marketing">MARKETING</option>
                </select>
              </div>
            </div>

            {/* Spacer */}
            <div style={{ height: "20px" }} />

            <div 
              className="flex justify-end"
              style={{ gap: "10px" }}
            >
              <button
                type="button"
                onClick={() => {
                  setIsUpdateItemOpen(false);
                  setUpdatingItem(null);
                  setUpdateItemTitle("");
                  setUpdateItemCategory("short films");
                }}
                className="border border-white/10 rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider text-white hover:border-[#FBAB3C] transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApplyUpdate}
                className="bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                style={{ padding: "10px 20px" }}
              >
                APPLY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
