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
  const [subtitle, setSubtitle] = useState("Have a project in mind? Let’s create something extraordinary.");
  const [email, setEmail] = useState("studio@alexandraclarke.media");
  const [location, setLocation] = useState("Prague");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSubtitle = localStorage.getItem("contact_subtitle");
      const savedEmail = localStorage.getItem("contact_email");
      const savedLocation = localStorage.getItem("contact_location");
      if (savedSubtitle) setSubtitle(savedSubtitle);
      if (savedEmail) setEmail(savedEmail);
      if (savedLocation) setLocation(savedLocation);
    }
  }, []);

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
    const mapLocationToTimezone = (loc: string): string => {
      const clean = loc.toLowerCase().trim();
      if (clean.includes("prague")) return "Europe/Prague";
      if (clean.includes("london")) return "Europe/London";
      if (clean.includes("new york") || clean.includes("nyc")) return "America/New_York";
      if (clean.includes("los angeles") || clean.includes("la")) return "America/Los_Angeles";
      if (clean.includes("chicago")) return "America/Chicago";
      if (clean.includes("denver")) return "America/Denver";
      if (clean.includes("tokyo")) return "Asia/Tokyo";
      if (clean.includes("paris")) return "Europe/Paris";
      if (clean.includes("berlin")) return "Europe/Berlin";
      if (clean.includes("rome")) return "Europe/Rome";
      if (clean.includes("sydney")) return "Australia/Sydney";
      if (clean.includes("melbourne")) return "Australia/Melbourne";
      if (clean.includes("toronto")) return "America/Toronto";
      if (clean.includes("vancouver")) return "America/Vancouver";
      if (clean.includes("singapore")) return "Asia/Singapore";
      if (clean.includes("hong kong")) return "Asia/Hong_Kong";
      if (clean.includes("dubai")) return "Asia/Dubai";
      if (clean.includes("mumbai") || clean.includes("kolkata")) return "Asia/Kolkata";
      if (clean.includes("cape town") || clean.includes("johannesburg")) return "Africa/Johannesburg";
      if (clean.includes("sao paulo")) return "America/Sao_Paulo";
      if (clean.includes("buenos aires")) return "America/Argentina/Buenos_Aires";
      if (clean.includes("mexico city")) return "America/Mexico_City";
      if (clean.includes("reykjavik")) return "Atlantic/Reykjavik";
      if (clean.includes("copenhagen")) return "Europe/Copenhagen";
      if (clean.includes("stockholm")) return "Europe/Stockholm";
      if (clean.includes("oslo")) return "Europe/Oslo";
      if (clean.includes("helsinki")) return "Europe/Helsinki";
      if (clean.includes("amsterdam")) return "Europe/Amsterdam";
      if (clean.includes("brussels")) return "Europe/Brussels";
      if (clean.includes("vienna")) return "Europe/Vienna";
      if (clean.includes("zurich") || clean.includes("geneva")) return "Europe/Zurich";
      if (clean.includes("madrid") || clean.includes("barcelona")) return "Europe/Madrid";
      if (clean.includes("lisbon")) return "Europe/Lisbon";
      if (clean.includes("athens")) return "Europe/Athens";
      if (clean.includes("istanbul")) return "Europe/Istanbul";
      if (clean.includes("seoul")) return "Asia/Seoul";
      if (clean.includes("bangkok")) return "Asia/Bangkok";
      if (clean.includes("shanghai") || clean.includes("beijing")) return "Asia/Shanghai";
      return "Europe/Prague";
    };

    const updateTime = () => {
      const now = new Date();
      let timeString = "";
      try {
        const tz = mapLocationToTimezone(location);
        timeString = now.toLocaleTimeString("en-GB", {
          timeZone: tz,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "short",
        });
      } catch {
        timeString = now.toLocaleTimeString("en-GB", {
          timeZone: "Europe/Prague",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZoneName: "short",
        });
      }
      setLocalTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [location]);

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
        <style dangerouslySetInnerHTML={{
          __html: `
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
        <div className="w-full max-w-2xl flex flex-col gap-4 md:gap-8">
          <div>
            <div className="border-b border-white/10 pb-3 mb-3 md:pb-6 md:mb-6">
              <h3 className="font-editorial text-[32px] md:text-6xl font-bold mt-1 stroked-title">
                CONTACT LEXI
              </h3>
            </div>
            <p className="font-sans text-xs md:text-sm text-neutral-grey mt-4 leading-relaxed tracking-wide">
              {subtitle}
            </p>
          </div>

          {/* Info Grid (Vertical Stack) */}
          <div className="flex flex-col gap-2 md:gap-4 max-w-md">
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
                  href={`mailto:${email}`}
                  data-cursor="pointer"
                  className="font-sans text-xs font-bold text-foreground hover:text-accent transition-colors"
                >
                  {email}
                </a>
              </div>
            </div>

            {/* Location */}
            <div className="hidden md:flex items-center gap-3 p-4 bg-neutral-dark rounded border border-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-[#FBAB3C]/10 text-[#FBAB3C]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest font-semibold">
                  Location
                </p>
                <p className="font-sans text-xs font-bold text-foreground">
                  {location}
                </p>
              </div>
            </div>

            {/* Time Zone details (Clock) */}
            <div className="hidden md:flex p-4 bg-neutral-dark rounded border border-white/5 flex-col justify-center">
              <p className="font-sans text-[9px] text-neutral-grey uppercase tracking-widest">
                Local Studio Time ({location})
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 md:gap-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-y-6 gap-x-4">
                {/* Your Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    {...register("name")}
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-[32px] md:py-[17px] text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
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
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-[32px] md:py-[17px] text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
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
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-[32px] md:py-[17px] text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
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
                    className="w-full bg-[#1A1A1A] border border-white/10 rounded px-4 py-[32px] md:py-[17px] text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors"
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
                  rows={3}
                  className="w-full h-[75px] md:h-[200px] bg-[#1A1A1A] border border-white/10 rounded px-4 py-3 text-sm text-foreground placeholder-neutral-500 focus:outline-none focus:border-[#FBAB3C] transition-colors resize-none"
                />
                {errors.message && (
                  <p className="font-sans text-[9px] text-red-400 font-bold mt-1 uppercase tracking-wider">
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center w-full">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  data-cursor="pointer"
                  className="w-1/2 h-[53px] bg-[#FBAB3C] hover:bg-[#FBAB3C]/95 text-[#202020] font-sans text-sm font-semibold tracking-wide rounded-[50px] cursor-pointer transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
