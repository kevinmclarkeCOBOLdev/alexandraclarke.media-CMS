"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MapPin, Mail, CheckCircle } from "lucide-react";

// Form validation schema
const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  businessName: z.string().optional(),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface Bubble {
  id: number;
  iconIndex: number;
  left: string;
  delay: string;
  duration: string;
  driftX: string;
  rotation: string;
  size: number;
}

export default function ContactPanel() {
  const [localTime, setLocalTime] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      businessName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in Prague timezone
      const timeString = now.toLocaleTimeString("en-GB", {
        timeZone: "Europe/Prague",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setLocalTime(timeString + " CEST");
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const iconCount = 6;
    const items: Bubble[] = Array.from({ length: 15 }, (_, i) => {
      const leftVal = 50 + Math.random() * 40; // between 50% and 90%
      const delayVal = Math.random() * 15; // 0s to 15s delay
      const durationVal = 12 + Math.random() * 18; // 12s to 30s duration
      const driftVal = -60 + Math.random() * 120; // -60px to 60px drift
      const rotationVal = -90 + Math.random() * 180; // -90deg to 90deg
      const sizeVal = 48 + Math.random() * 40; // 48px to 88px size (2x larger)
      return {
        id: i,
        iconIndex: Math.floor(Math.random() * iconCount),
        left: `${leftVal}%`,
        delay: `${delayVal}s`,
        duration: `${durationVal}s`,
        driftX: `${driftVal}px`,
        rotation: `${rotationVal}deg`,
        size: sizeVal,
      };
    });
    setBubbles(items);
  }, []);

  const renderIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBAB3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="6.5" r="1.5" />
            <circle cx="12" cy="17.5" r="1.5" />
            <circle cx="6.5" cy="12" r="1.5" />
            <circle cx="17.5" cy="12" r="1.5" />
            <path d="M18.5 18.5 C 19.5 19.5, 20.5 20, 22 20 L 23 20" />
          </svg>
        );
      case 1:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBAB3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <rect x="3" y="4" width="18" height="12" rx="2" />
            <polygon points="10,7 15,10 10,13" />
            <path d="M12 16 L12 19 M8 19 L16 19" />
          </svg>
        );
      case 2:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBAB3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <line x1="3" y1="8" x2="21" y2="8" />
            <line x1="3" y1="16" x2="21" y2="16" />
            <line x1="6" y1="5" x2="6" y2="8" />
            <line x1="9" y1="5" x2="9" y2="8" />
            <line x1="12" y1="5" x2="12" y2="8" />
            <line x1="15" y1="5" x2="15" y2="8" />
            <line x1="18" y1="5" x2="18" y2="8" />
            <line x1="6" y1="16" x2="6" y2="19" />
            <line x1="9" y1="16" x2="9" y2="19" />
            <line x1="12" y1="16" x2="12" y2="19" />
            <line x1="15" y1="16" x2="15" y2="19" />
            <line x1="18" y1="16" x2="18" y2="19" />
          </svg>
        );
      case 3:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBAB3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <rect x="3" y="10" width="12" height="9" rx="2" />
            <polygon points="15,12.5 21,9 21,18 15,14.5" />
            <circle cx="11" cy="6.5" r="2.5" />
            <circle cx="6" cy="7.5" r="1.5" />
          </svg>
        );
      case 4:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBAB3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <path d="M3 13h18v7H3z" />
            <line x1="15" y1="13" x2="15" y2="20" />
            <path d="M3 9.5h18v3.5H3z" />
            <line x1="6" y1="9.5" x2="9" y2="13" />
            <line x1="11" y1="9.5" x2="14" y2="13" />
            <line x1="16" y1="9.5" x2="19" y2="13" />
            <path d="M3 9 L18 4.5 L20 7.5 L5 12 Z" />
            <line x1="6" y1="8" x2="9" y2="10.5" />
            <line x1="11" y1="6.5" x2="14" y2="9" />
            <line x1="16" y1="5" x2="19" y2="7.5" />
          </svg>
        );
      case 5:
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="#FBAB3C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
            <circle cx="12" cy="12" r="9" />
            <polygon points="10,8.5 16,12 10,15.5" />
          </svg>
        );
      default:
        return null;
    }
  };

  const onSubmit = async (data: ContactFormValues) => {
    try {
      const response = await fetch("https://formspree.io/f/xaqgoopp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          businessName: data.businessName,
          email: data.email,
          phone: data.phone,
          message: data.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        const errorData = await response.json();
        console.error("Formspree submission error:", errorData);
        alert("There was a problem submitting your enquiry. Please check the fields and try again.");
      }
    } catch (error) {
      console.error("Network error submitting to Formspree:", error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/contact-panel-bg.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Black overlay with gradient from 100% opacity on left to 66% on right */}
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0.66) 100%)' }}
        />
      </div>

      {/* Floating Film-Related Icons (Bubble Animation on the right half) */}
      <div className="hidden md:block absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes floatUp {
            0% {
              transform: translateY(100px) translateX(0) scale(0.6) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translateY(-130vh) translateX(var(--drift-x)) scale(1.1) rotate(var(--rotation));
              opacity: 0;
            }
          }
          .floating-bubble {
            opacity: 0;
            animation: floatUp linear infinite both;
          }
        ` }} />
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="floating-bubble absolute top-full"
            style={{
              left: bubble.left,
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              animationDelay: bubble.delay,
              animationDuration: bubble.duration,
              filter: "drop-shadow(0 0 8px rgba(251, 171, 60, 0.6))",
              "--drift-x": bubble.driftX,
              "--rotation": bubble.rotation,
            } as React.CSSProperties}
          >
            {renderIcon(bubble.iconIndex)}
          </div>
        ))}
      </div>

      {/* Scrollable Content Container (added padding bottom pb-28 md:pb-36 lg:pb-40 for clearance) */}
      <div className="relative z-10 flex h-full w-full flex-col overflow-y-auto no-scrollbar p-6 pb-28 md:p-12 md:pb-36 lg:p-16 lg:pb-40">
        <div className="w-full max-w-2xl flex flex-col gap-8">
          <div>
            <div className="border-b border-white/10 pb-6 mb-6">
              <h3 className="font-editorial text-5xl md:text-6xl font-bold mt-1 stroked-title">
                CONTACT LEXI
              </h3>
            </div>
            <p className="font-sans text-xs md:text-sm text-neutral-grey mt-4 leading-relaxed tracking-wide">
              Have a project in mind? Let’s create something extraordinary.
            </p>
          </div>

          {/* Info Grid (Vertical Stack) */}
          <div className="flex flex-col gap-4 max-w-md">
            {/* Direct Email */}
            <div className="flex items-center gap-3 p-4 bg-neutral-dark rounded border border-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FBAB3C]/10 text-[#FBAB3C]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest font-semibold">
                  Direct Email
                </p>
                <a
                  href="mailto:studio@alexandraclarke.media"
                  data-cursor="pointer"
                  className="font-sans text-xs font-bold text-foreground hover:text-accent transition-colors"
                >
                  studio@alexandraclarke.media
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 p-4 bg-neutral-dark rounded border border-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FBAB3C]/10 text-[#FBAB3C]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest font-semibold">
                  Location
                </p>
                <p className="font-sans text-xs font-bold text-foreground">
                  Prague
                </p>
              </div>
            </div>

            {/* Time Zone details (Clock) */}
            <div className="hidden md:flex p-4 bg-neutral-dark rounded border border-white/5 flex-col justify-center">
              <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest">
                Local Studio Time (Prague)
              </p>
              <p className="font-sans text-lg font-bold mt-1" style={{ color: "#FBAB3C" }}>{localTime || "12:00:00 CEST"}</p>
            </div>
          </div>

          {/* Contact Form Container (Placed directly under the clock) */}
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center text-center py-12 bg-neutral-dark border border-white/5 rounded-lg">
              <CheckCircle className="h-16 w-16 text-[#FBAB3C] animate-bounce" />
              <h4 className="font-editorial text-2xl font-bold text-foreground mt-4">
                MESSAGE SENT
              </h4>
              <p className="font-sans text-xs text-neutral-grey mt-2 max-w-sm">
                Thank you. Your enquiry has been received. Alexandra will get back to you within 24 hours.
              </p>
              <button
                data-cursor="pointer"
                onClick={() => setIsSubmitted(false)}
                className="mt-6 px-4 py-2 border border-white/10 text-foreground hover:border-[#FBAB3C] font-sans text-[10px] font-bold tracking-widest uppercase transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-4">
                {/* Your Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name")}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  />
                  {errors.name && (
                    <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Business Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Business Name"
                    {...register("businessName")}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  />
                  {errors.businessName && (
                    <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                      {errors.businessName.message}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  />
                  {errors.email && (
                    <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    {...register("phone")}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
                  />
                  {errors.phone && (
                    <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div>
                <textarea
                  placeholder="Tell us about your project, timeline, and locations..."
                  {...register("message")}
                  rows={5}
                  className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-none"
                />
                {errors.message && (
                  <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#FBAB3C] hover:bg-[#FBAB3C]/95 text-[#202020] font-sans text-sm font-semibold tracking-wide rounded transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>
              </div>
            </form>
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
          className="group flex h-12 w-12 items-center justify-center rounded-full bg-[#1F1F1F] hover:bg-[#2F2F2F] text-[#FBAB3C] transition-all duration-300 hover:scale-110 shadow-lg border border-white/5"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.62 4.2 1.23 1.34 2.95 2.1 4.75 2.23-.01 1.29.01 2.58-.02 3.87-1.42-.02-2.81-.49-3.95-1.34-1.02-.79-1.75-1.92-2.09-3.17-.03.77-.02 1.54-.02 2.31v10.15c-.07 1.83-.81 3.61-2.17 4.79-1.57 1.4-3.83 2.06-5.96 1.74-2.31-.32-4.42-1.91-5.18-4.17-.89-2.58-.1-5.59 1.95-7.44 1.47-1.35 3.52-1.96 5.51-1.63.02 1.32.01 2.65.02 3.97-1.12-.22-2.33.09-3.13.88-.84.8-.97 2.1-.33 3.07.64.99 1.96 1.41 3.05 1.01 1.02-.34 1.74-1.37 1.76-2.45.02-4.23.01-8.47.01-12.7z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}
