"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PortfolioItem {
  id: number;
  title: string;
  category: "short films" | "3d animations" | "marketing";
  image: string;
  year: string;
  length?: string;
  videoUrl?: string;
  embedHtml?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 1,
    title: "JUST ANOTHER ASEXUAL FILM",
    category: "short films",
    image: "/portfolio/just-another-asexual-film-thumb.webp",
    year: "2024",
    length: "17:58",
    videoUrl: "oJklZVMczpg",
  },
  {
    id: 2,
    title: "CABBAGE - THE TRAILER",
    category: "3d animations",
    image: "/portfolio/cabbage-thumb.webp",
    year: "2024",
    length: "0:47",
    videoUrl: "WPLEGkbvzPg",
  },
  {
    id: 3,
    title: "THE CASUAL LIVES OF YOUR EVERYDAY TRANSGENDERS - A SHORT TRANS DOCUMENTARY",
    category: "short films",
    image: "/portfolio/casual-lives-trans-documentary-thumb.webp",
    year: "2024",
    length: "11:42",
    videoUrl: "V_BiZEc6YSo",
  },
];

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export default function PortfolioPanel() {
  const settings = useQuery(api.settings.get);
  const portfolioItemsDb = useQuery(api.portfolio.list);

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalVideoId, setModalVideoId] = useState<string>("");
  const [modalEmbedHtml, setModalEmbedHtml] = useState<string>("");
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [instagramUrl, setInstagramUrl] = useState("https://www.instagram.com/alexandra.lexi.clarke/");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/channel/UCrj_CL9J9GvSdUxoOE0Jzgg");
  const [tiktokUrl, setTiktokUrl] = useState("https://www.tiktok.com/@its.keeby.and.kirby");

  useEffect(() => {
    if (settings) {
      if (settings.instagramUrl) setInstagramUrl(settings.instagramUrl);
      if (settings.youtubeUrl) setYoutubeUrl(settings.youtubeUrl);
      if (settings.tiktokUrl) setTiktokUrl(settings.tiktokUrl);
    }
  }, [settings]);

  useEffect(() => {
    if (portfolioItemsDb) {
      const mapped = portfolioItemsDb.map((item, index) => ({
        ...item,
        id: index + 1,
      }));
      setPortfolioItems(mapped);
    }
  }, [portfolioItemsDb]);

  const getInstagramShortcode = (embedHtml?: string) => {
    if (!embedHtml) return null;
    const match = embedHtml.match(/instagram\.com\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (item: PortfolioItem) => {
    if (item.videoUrl) {
      return imageErrors[item.videoUrl]
        ? `https://img.youtube.com/vi/${item.videoUrl}/hqdefault.jpg`
        : `https://img.youtube.com/vi/${item.videoUrl}/maxresdefault.jpg`;
    }
    const instagramShortcode = getInstagramShortcode(item.embedHtml);
    if (instagramShortcode) {
      return imageErrors[instagramShortcode]
        ? item.image
        : `https://www.instagram.com/p/${instagramShortcode}/media/?size=l`;
    }
    return item.image;
  };

  const handleImageError = (item: PortfolioItem) => {
    if (item.videoUrl) {
      setImageErrors((prev) => ({ ...prev, [item.videoUrl!]: true }));
    } else {
      const instagramShortcode = getInstagramShortcode(item.embedHtml);
      if (instagramShortcode) {
        setImageErrors((prev) => ({ ...prev, [instagramShortcode]: true }));
      }
    }
  };

  const categories = [
    "all",
    "short films",
    "3d animations",
    "marketing",
  ];

  const filteredItems = selectedCategory === "all"
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === selectedCategory);

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setActiveIndex(0);
  };

  const handlePrev = () => {
    if (filteredItems.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  };

  const handleNext = () => {
    if (filteredItems.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const getPositionClass = (index: number, active: number, length: number) => {
    if (index === active) return "flow-slide-active";
    if (length === 2) {
      if (active === 0 && index === 1) return "flow-slide-next";
      if (active === 1 && index === 0) return "flow-slide-prev";
    }
    if (length > 2) {
      if (index === (active - 1 + length) % length) return "flow-slide-prev";
      if (index === (active + 1) % length) return "flow-slide-next";
    }
    return "flow-slide-hidden";
  };

  const handleSlideClick = (item: PortfolioItem, index: number, isActive: boolean) => {
    if (!isActive) {
      setActiveIndex(index);
    } else if (item.videoUrl || item.embedHtml) {
      if (item.videoUrl) setModalVideoId(item.videoUrl);
      if (item.embedHtml) setModalEmbedHtml(item.embedHtml);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Scrollable Content Container (added padding bottom pb-28 md:pb-36 lg:pb-40 for clearance) */}
      <div className="relative z-10 flex h-full w-full flex-col overflow-y-auto no-scrollbar p-6 pb-28 md:p-12 md:pb-36 lg:p-16 lg:pb-40">
        {/* Top Bar / Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
          <div>
            <h3 className="font-editorial text-[32px] md:text-6xl font-bold mt-1 stroked-title">
              PORTFOLIO
            </h3>
          </div>
          
          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                data-cursor="pointer"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 border ${
                  selectedCategory === cat
                    ? "bg-[#FBAB3C] text-black border-[#FBAB3C]"
                    : "bg-transparent text-foreground/75 border-white/10 hover:border-[#FBAB3C]"
                }`}
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Flow Gallery Area */}
        <div className="flex-1 flex flex-col justify-center items-center py-8 min-h-[500px]">
          {filteredItems.length > 0 ? (
            <div className="relative w-full max-w-[850px] flex flex-col items-center">
              {/* Slider 3D Box */}
              <div className="relative w-full h-[300px] md:h-[420px] flex items-center justify-center overflow-visible flow-perspective">
                {/* Left Navigation Arrow */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={handlePrev}
                    data-cursor="pointer"
                    className="absolute left-2 md:left-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-accent border border-white/10 transition-all duration-300 hover:scale-115 active:scale-95"
                    aria-label="Previous Project"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                )}

                {/* Slides */}
                {filteredItems.map((item, index) => {
                  const positionClass = getPositionClass(index, activeIndex, filteredItems.length);
                  const isActive = index === activeIndex;
                  
                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSlideClick(item, index, isActive)}
                      className={`absolute w-[80%] md:w-[75%] max-w-[650px] aspect-[16/10] flow-slide rounded-xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-dark ${positionClass} ${
                        isActive && !item.videoUrl && !item.embedHtml ? "cursor-default" : "cursor-pointer"
                      }`}
                    >
                      {/* Slide Image */}
                      <div className="absolute inset-0 w-full h-full bg-black">
                        {item.embedHtml && imageErrors[getInstagramShortcode(item.embedHtml) || ""] ? (
                          <div 
                            className="w-full h-full flex items-center justify-center bg-black overflow-hidden pointer-events-none"
                            dangerouslySetInnerHTML={{ __html: item.embedHtml }}
                          />
                        ) : (
                          <Image
                            src={getThumbnailUrl(item)}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 85vw, 650px"
                            priority={isActive}
                            onError={() => handleImageError(item)}
                          />
                        )}
                      </div>
                      
                      {/* Shadow overlay gradient at bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                      {/* Play Button Overlay for Active Slide with Video */}
                      {isActive && (item.videoUrl || item.embedHtml) && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/35 group-hover:bg-black/45 transition-colors duration-300">
                          <div className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-full bg-[#FBAB3C] text-black shadow-lg hover:scale-110 active:scale-95 transition-transform duration-300">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6 ml-1">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Right Navigation Arrow */}
                {filteredItems.length > 1 && (
                  <button
                    onClick={handleNext}
                    data-cursor="pointer"
                    className="absolute right-2 md:right-6 z-30 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-black/90 text-accent border border-white/10 transition-all duration-300 hover:scale-115 active:scale-95"
                    aria-label="Next Project"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Active Item Details */}
              <div className="text-center mt-6 min-h-[70px]">
                <span className="text-[11px] font-bold tracking-[2px] text-[#FBAB3C] uppercase" style={{ fontFamily: "var(--font-poppins)" }}>
                  {filteredItems[activeIndex]?.category}
                  {filteredItems[activeIndex]?.year ? ` • ${filteredItems[activeIndex].year}` : ""}
                  {filteredItems[activeIndex]?.length ? ` • ${filteredItems[activeIndex].length}` : ""}
                </span>
                <h4 className="font-editorial text-[18px] md:text-[22.5px] font-bold text-foreground mt-1 uppercase tracking-wide">
                  {filteredItems[activeIndex]?.title}
                </h4>
              </div>

              {/* Thumbnail Preview Icons */}
              <div className="flex justify-center flex-wrap gap-3 mt-4">
                {filteredItems.map((item, index) => (
                  <button
                    key={item.id}
                    data-cursor="pointer"
                    onClick={() => setActiveIndex(index)}
                    className={`relative w-28 md:w-36 aspect-[16/10] rounded-lg overflow-hidden border transition-all duration-300 ${
                      activeIndex === index
                        ? "border-accent scale-110 shadow-lg shadow-accent/10 opacity-100"
                        : "border-white/10 opacity-40 hover:opacity-70 hover:scale-105"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    {item.embedHtml && imageErrors[getInstagramShortcode(item.embedHtml) || ""] ? (
                      <div className="absolute inset-0 w-full h-full pointer-events-none bg-black overflow-hidden">
                        <iframe
                          src={`https://www.instagram.com/reel/${getInstagramShortcode(item.embedHtml)}/embed`}
                          style={{
                            position: "absolute",
                            top: "-55%",
                            left: 0,
                            width: "100%",
                            height: "165%",
                            border: "none",
                          }}
                          scrolling="no"
                          allowTransparency={true}
                        />
                      </div>
                    ) : (
                      <Image
                        src={getThumbnailUrl(item)}
                        alt={item.title}
                        fill
                        className="object-cover"
                        sizes="160px"
                        onError={() => handleImageError(item)}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-foreground/50 font-sans text-sm">
              No projects found in this category.
            </div>
          )}
        </div>
      </div>

      {/* Social Icons (bottom left - persistent and non-scrolling!) */}
      <div className="hidden md:flex absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 z-20 flex-col gap-3">
        {/* Instagram */}
        <a
          href={instagramUrl}
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
          href={youtubeUrl}
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
          href={tiktokUrl}
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

      {/* Immersive Video Modal Popup (90% of screen dimensions) */}
      {isModalOpen && (modalVideoId || modalEmbedHtml) && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-[90vw] h-[90vh] bg-black border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center shadow-2xl">
            {/* Close Button 'X' at top right */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setModalVideoId("");
                setModalEmbedHtml("");
              }}
              className="absolute top-4 right-4 z-10 flex items-center justify-center bg-black/60 hover:bg-black/90 text-white rounded-full p-2 border border-white/10 transition-all duration-300 hover:scale-110 cursor-pointer"
              title="Close Modal"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Video Content */}
            {modalVideoId ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${modalVideoId}?autoplay=1&controls=1&rel=0&playsinline=1`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="Portfolio Video Player"
              ></iframe>
            ) : (
              <div 
                className="flex items-center justify-center w-full h-full p-4 overflow-auto"
                dangerouslySetInnerHTML={{ __html: modalEmbedHtml }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
