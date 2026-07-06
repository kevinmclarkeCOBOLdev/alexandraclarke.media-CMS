import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const agency = localFont({
  src: [
    {
      path: "../../public/fonts/agencyfb.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/agencyfb-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-agency",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandra Clarke | Film-maker, 3d Modeller, Animator, and Social Marketing Manager",
  description:
    "A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews & social media content).",
  openGraph: {
    title: "Alexandra Clarke | Film-maker, 3d Modeller, Animator, and Social Marketing Manager",
    description:
      "A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews & social media content).",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandra Clarke | Film-maker, 3d Modeller, Animator, and Social Marketing Manager",
    description:
      "A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews & social media content).",
  },
};

import ConvexClientProvider from "@/components/ConvexClientProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full bg-background selection:bg-accent selection:text-background">
      <body
        className={`${agency.variable} ${poppins.variable} font-sans antialiased h-full w-full overflow-hidden`}
      >
        <ConvexClientProvider>
          {children}
        </ConvexClientProvider>
      </body>
    </html>
  );
}
