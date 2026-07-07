"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sanitizeText } from "../../../convex/sanitize";
import * as z from "zod";
import { ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

// Define the validation schema using Zod
const loginSchema = z.object({
  email: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LexiLogin() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const login = useMutation(api.auth.login);

  // Avoid hydration mismatch by waiting until client mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const result = await login({ username: sanitizeText(data.email), password: data.password });
      if (result.success) {
        setLoginSuccess(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("lexi_cms_session", result.token || "true");
          localStorage.setItem("lexi_cms_user", JSON.stringify(result.user));
        }

        // Delay redirect to show success message
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        setLoginError(result.error || "Invalid username or password");
      }
    } catch {
      setLoginError("A network error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen w-screen bg-[#000000] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#FBAB3C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-screen bg-[#000000] flex flex-col justify-center items-center py-8 md:py-12 px-4 overflow-y-auto select-none">

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

      {/* Top Header - Same size as Home Panel */}
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

      {/* Login Card Container - 1.5x Width & Height Scaling */}
      <div className="relative z-10 w-full max-w-[660px] my-6 flex flex-col items-center">
        <div
          className="w-full bg-[#151515]/65 backdrop-blur-md border border-[#FBAB3C]/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-300 min-h-[270px]"
          style={{ padding: "15px" }}
        >

          <div className="mb-6 text-center">
            <h2 className="font-sans text-2xl font-semibold tracking-wide text-foreground mb-2 text-center">
              Log In
            </h2>
            <p className="font-sans text-sm text-neutral-grey text-center">
              Enter credentials to access the portfolio editor dashboard.
            </p>
            <br />
          </div>

          <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-6">
              {/* Form-level Error Message */}
              {loginError && (
                <div className="flex items-center justify-center gap-3 bg-red-950/40 border border-red-500/30 rounded-lg p-4 text-sm text-red-300 animate-fadeIn mb-6 text-center">
                  <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  <p className="leading-normal">{loginError}</p>
                </div>
              )}

              {/* Form-level Success Message */}
              {loginSuccess && (
                <div className="flex items-center justify-center gap-3 bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-4 text-sm text-emerald-300 animate-fadeIn mb-6 text-center">
                  <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  <p className="leading-normal">Access granted! Loading editor...</p>
                </div>
              )}

              {/* Email Field */}
              <div className="space-y-2 text-center">
                <label htmlFor="email" className="block font-sans text-xs font-semibold tracking-wider text-neutral-grey uppercase text-left">
                  Username
                </label>
                <input
                  id="email"
                  type="text"
                  disabled={isLoading || loginSuccess}
                  {...register("email")}
                  className={`w-full h-[44px] bg-[#0A0A0A] border ${errors.email ? "border-red-500/50 focus:border-red-500" : "border-[#FBAB3C]/25 focus:border-[#FBAB3C]"
                    } rounded-lg px-4 text-sm text-foreground text-left focus:outline-none focus:ring-1 focus:ring-[#FBAB3C]/20 transition-all duration-300`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 mt-1 flex items-center justify-center gap-1 font-sans text-center">
                    <span>*</span> {errors.email.message}
                  </p>
                )}
              </div>

              <br />

              {/* Password Field */}
              <div className="space-y-2 text-center">
                <label htmlFor="password" className="block font-sans text-xs font-semibold tracking-wider text-neutral-grey uppercase text-left">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  disabled={isLoading || loginSuccess}
                  {...register("password")}
                  className={`w-full h-[44px] bg-[#0A0A0A] border ${errors.password ? "border-red-500/50 focus:border-red-500" : "border-[#FBAB3C]/25 focus:border-[#FBAB3C]"
                    } rounded-lg px-4 text-sm text-foreground text-left focus:outline-none focus:ring-1 focus:ring-[#FBAB3C]/20 transition-all duration-300`}
                />
                {errors.password && (
                  <p className="text-xs text-red-400 mt-1 flex items-center justify-center gap-1 font-sans text-center">
                    <span>*</span> {errors.password.message}
                  </p>
                )}
              </div>
            </div>
          </form>
        </div>

        {/* 25px Spacer between password box/card and log in button */}
        <div className="h-[25px]" />

        {/* Login Button with rounded-[50px] border-radius and halved width, centered */}
        <button
          type="submit"
          form="login-form"
          disabled={isLoading || loginSuccess}
          className="relative w-1/2 h-[58px] flex items-center justify-center bg-[#FBAB3C] hover:bg-[#E59A2B] disabled:bg-[#FBAB3C]/40 text-black rounded-[50px] font-sans text-sm font-semibold uppercase tracking-[2px] transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_0_15px_rgba(251,171,60,0.25)] cursor-pointer disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Log In <ArrowRight className="w-5 h-5" />
            </span>
          )}
        </button>

        {/* 25px Spacer between login button and return link */}
        <div style={{ height: "25px" }} />

        {/* Return to ALEXANDRACLARKE.MEDIA link */}
        <button
          type="button"
          onClick={() => router.push("/")}
          className="font-sans text-xs tracking-[1.5px] uppercase text-[#FBAB3C]/60 hover:text-[#FBAB3C] transition-all duration-300 font-semibold cursor-pointer"
        >
          Return to ALEXANDRACLARKE.MEDIA
        </button>
      </div>
    </div>
  );
}
