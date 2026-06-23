import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import CustomCursor from "@/components/CustomCursor";
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
  variable: "--font-editorial",
});

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alexandra Clarke | Creative Director, Filmmaker & Visual Storyteller",
  description:
    "Portfolio of Alexandra Clarke. A premium digital exhibition showcasing cinematic storytelling, creative direction, photography, and filmmaking.",
  openGraph: {
    title: "Alexandra Clarke | Creative Director & Filmmaker",
    description:
      "A premium digital exhibition showcasing cinematic storytelling, creative direction, and visual art.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandra Clarke | Creative Director & Filmmaker",
    description:
      "A premium digital exhibition showcasing cinematic storytelling, creative direction, and visual art.",
  },
};

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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
