"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HomePanel() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [shouldStartTagAnimation, setShouldStartTagAnimation] = useState(false);
  const [shouldPlayVideo, setShouldPlayVideo] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [bgVideoId, setBgVideoId] = useState("BoUrWXaQUQQ");
  const [showreelVideoId, setShowreelVideoId] = useState("BoUrWXaQUQQ");
  const [copyrightYear, setCopyrightYear] = useState("2026");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedVideoId = localStorage.getItem("home_bg_video_id");
      if (savedVideoId) {
        setBgVideoId(savedVideoId);
      }
      const savedShowreelId = localStorage.getItem("home_showreel_video_id");
      if (savedShowreelId) {
        setShowreelVideoId(savedShowreelId);
      }
      const savedYear = localStorage.getItem("copyright_year");
      if (savedYear) {
        setCopyrightYear(savedYear);
      }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    try {
      const state = playerRef.current.getPlayerState();
      // @ts-expect-error window.YT is not typed
      if (state === window.YT.PlayerState.PLAYING) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
    } catch (err) {
      console.error("Error toggling play/pause:", err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") {
        setIsPageLoaded(true);
      } else {
        const handleLoad = () => setIsPageLoaded(true);
        window.addEventListener("load", handleLoad);
        return () => window.removeEventListener("load", handleLoad);
      }
    }
  }, []);

  useEffect(() => {
    setShouldPlayVideo(true);
  }, []);

  useEffect(() => {
    if (isPageLoaded) {
      const timer = setTimeout(() => {
        setShouldStartTagAnimation(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isPageLoaded]);



  useEffect(() => {
    if (shouldPlayVideo && !isVideoPlaying && !hasPlayed) {
      const timer = setTimeout(() => {
        setShowFallback(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [shouldPlayVideo, isVideoPlaying, hasPlayed]);

  useEffect(() => {
    if (!shouldPlayVideo) return;

    let isDestroyed = false;

    const initializePlayer = () => {
      if (isDestroyed) return;
      try {
        // @ts-expect-error window.YT is not typed
        playerRef.current = new window.YT.Player("bg-video-iframe", {
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              try {
                event.target.setPlaybackRate(1.5);
              } catch (e) {
                console.error("Failed to set playback rate:", e);
              }
              try {
                event.target.unloadModule("captions");
                event.target.unloadModule("cc");
              } catch {
                // Ignore if not supported in this context
              }
              try {
                event.target.setOption("captions", "track", {});
              } catch {
                // Ignore if not supported
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              // @ts-expect-error window.YT is not typed
              if (event.data === window.YT.PlayerState.ENDED) {
                setIsVideoEnded(true);
                setIsVideoPlaying(false);
              }
              // @ts-expect-error window.YT is not typed
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsVideoPlaying(true);
                setHasPlayed(true);
                try {
                  event.target.unloadModule("captions");
                  event.target.unloadModule("cc");
                } catch {
                  // Ignore
                }
                try {
                  event.target.setOption("captions", "track", {});
                } catch {
                  // Ignore
                }
              }
              // @ts-expect-error window.YT is not typed
              if (event.data === window.YT.PlayerState.PAUSED) {
                setIsVideoPlaying(false);
              }
            },
          },
        });
      } catch (err) {
        console.error("Error initializing YouTube Player API:", err);
      }
    };

    // Check if script is already present
    const existingScript = document.getElementById("youtube-iframe-api-script");

    // @ts-expect-error window.YT is not typed
    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      if (!existingScript) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api-script";
        tag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        if (firstScriptTag && firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }
      }

      // Hook into the global ready callback
      // @ts-expect-error window.onYouTubeIframeAPIReady is not typed
      const previousCallback = window.onYouTubeIframeAPIReady;
      // @ts-expect-error window.onYouTubeIframeAPIReady is not typed
      window.onYouTubeIframeAPIReady = () => {
        if (previousCallback) previousCallback();
        initializePlayer();
      };
    }

    return () => {
      isDestroyed = true;
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
          playerRef.current = null;
        } catch {
          // ignore destroy errors
        }
      }
    };
  }, [shouldPlayVideo, bgVideoId]);

  return (
    <div className="relative flex h-full w-full flex-col justify-between p-6 md:p-12 lg:p-16 overflow-hidden">
      {/* Background Video Player */}
      <div className="absolute inset-0 overflow-hidden z-0 bg-black pointer-events-auto">
         {shouldPlayVideo && (
          <iframe
            id="bg-video-iframe"
            className={`absolute top-1/2 left-1/2 w-[177.78vh] min-w-full h-[56.25vw] min-h-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-1000 ${
              isVideoEnded ? "opacity-0" : "opacity-100"
            }`}
            src={`https://www.youtube.com/embed/${bgVideoId}?autoplay=1&mute=1&controls=0&rel=0&playsinline=1&enablejsapi=1&cc_load_policy=3&iv_load_policy=3`}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            title="Background Showreel"
          ></iframe>
        )}

        <Image
          src="/alexandra-clarke-static-home-image.webp"
          alt="Alexandra Clarke Showreel Static Home"
          fill
          priority
          className={`object-cover transition-opacity duration-1000 ${
            isVideoEnded || showFallback ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          sizes="100vw"
        />
        {/* Textured overlay */}
        <div 
          className={`absolute inset-0 pointer-events-none z-[1] transition-opacity duration-1000 ${
            isVideoEnded ? "opacity-0" : "opacity-20"
          }`}
          style={{ 
            backgroundImage: "url('/textured-overlay.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/20 pointer-events-none z-[2]" />

        {/* Hotspot overlay for play/pause toggling */}
        {!isVideoEnded && (
          <div 
            onClick={togglePlayPause}
            className="absolute inset-0 z-[3] cursor-pointer pointer-events-auto"
            aria-label="Toggle background video play/pause"
          />
        )}
      </div>

      {/* Top Header */}
      <div className="relative z-10 flex justify-between items-start mt-[50px]">
        <div>
          <h2 className="font-editorial text-[64.8px] md:text-9xl lg:text-[7.5rem] font-bold tracking-tight stroked-title">
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
          </h2>
          <div
            className="flex flex-col font-sans font-medium text-[#FBAB3C] tracking-wide items-start leading-[1.1] text-[18px] md:text-[30px] gap-1 mt-3"
          >
            <span className={`block opacity-0 ${shouldStartTagAnimation ? "animate-slide-in-left" : ""}`} style={{ animationDelay: "270ms" }}>
              filmmaker,
            </span>
            <span className={`block opacity-0 ${shouldStartTagAnimation ? "animate-slide-in-left" : ""}`} style={{ animationDelay: "530ms" }}>
              3d-modeller,
            </span>
            <span className={`block opacity-0 ${shouldStartTagAnimation ? "animate-slide-in-left" : ""}`} style={{ animationDelay: "800ms" }}>
              animator,
            </span>
            <span className={`block opacity-0 ${shouldStartTagAnimation ? "animate-slide-in-left" : ""}`} style={{ animationDelay: "1070ms" }}>
              &amp; social media manager
            </span>
          </div>
        </div>
      </div>

      {/* Social Icons (bottom left) */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16 z-10 flex flex-col gap-2 md:gap-3">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/alexandra.lexi.clarke/"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="group flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-[#FBAB3C] transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[15px] h-[15px] md:w-5 md:h-5">
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
          className="group flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-[#FBAB3C] transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-[16.5px] h-[16.5px] md:w-[22px] md:h-[22px]">
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
          className="group flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-[#FBAB3C] transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-[15px] h-[15px] md:w-5 md:h-5">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.2 1.23 1.34 2.95 2.1 4.75 2.23-.01 1.29.01 2.58-.02 3.87-1.42-.02-2.81-.49-3.95-1.34-1.02-.79-1.75-1.92-2.09-3.17-.03.77-.02 1.54-.02 2.31v10.15c-.07 1.83-.81 3.61-2.17 4.79-1.57 1.4-3.83 2.06-5.96 1.74-2.31-.32-4.42-1.91-5.18-4.17-.89-2.58-.1-5.59 1.95-7.44 1.47-1.35 3.52-1.96 5.51-1.63.02 1.32.01 2.65.02 3.97-1.12-.22-2.33.09-3.13.88-.84.8-.97 2.1-.33 3.07.64.99 1.96 1.41 3.05 1.01 1.02-.34 1.74-1.37 1.76-2.45.02-4.23.01-8.47.01-12.7z"/>
          </svg>
        </a>
      </div>

      {/* Play Showreel Button (Centered, level with YouTube icon bottom on mobile) */}
      <div className="absolute bottom-[84px] md:bottom-12 lg:bottom-16 left-1/2 -translate-x-1/2 z-10">
        {/* Pulsing ring background */}
        <div className="absolute inset-0 rounded-[50px] bg-[#FBAB3C] button-glow-pulse pointer-events-none" />
        
        <button
          onClick={() => setIsModalOpen(true)}
          data-cursor="pointer"
          className="relative flex h-[53px] w-[209px] items-center justify-center bg-[#FBAB3C] hover:bg-[#E59A2B] text-black rounded-[50px] font-sans text-xs md:text-sm font-semibold uppercase tracking-[2px] transition-all duration-300 hover:scale-105 shadow-lg border border-white/5 cursor-pointer"
        >
          PLAY SHOWREEL
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 ml-2.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      {/* Powered by Atypikal Studio (Bottom right, level with Play Showreel) */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-10 flex h-12 items-center justify-end pointer-events-auto">
        <a
          href="https://atypikalstudio.dev"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="font-sans text-[10px] md:text-xs tracking-[1.5px] uppercase text-[#FBAB3C]/60 hover:text-[#FBAB3C] transition-all duration-300 font-medium"
        >
          © {copyrightYear} | Powered by Atypikal Studio
        </a>
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
              src={`https://www.youtube.com/embed/${showreelVideoId}?autoplay=1&controls=1&rel=0&playsinline=1&cc_load_policy=3&iv_load_policy=3`}
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
