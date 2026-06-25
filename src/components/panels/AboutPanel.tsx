"use client";

import Image from "next/image";

export default function AboutPanel() {
  const education = [
    {
      institution: "TEESSIDE UNIVERSITY in Prague",
      period: "September 2023 – June 2026",
      degree: "BA (Hons) Creative Media Production",
    },
    {
      institution: "TEESSIDE UNIVERSITY in Prague",
      period: "September 2022 – June 2023",
      degree: "Foundation Diploma in Art, Design & Media",
    },
    {
      institution: "EDUCANET GYMNASIUM, Prague",
      period: "September 2016 – June 2022",
      degree: "High School",
    },
  ];

  const experience = [
    {
      company: "The Mad & Merry Men Theatre Company, Prague",
      period: "2024 – 2026",
      role: "Social Media Manager & Photographer",
    },
    {
      company: "Sad Man’s Tongue Restaurant, Prague",
      period: "2023 – 2024",
      role: "Host & Waitress",
    },
  ];

  return (
    <div className="relative flex h-full w-full flex-col lg:flex-row overflow-y-auto no-scrollbar p-6 md:p-12 lg:p-16 gap-8 lg:gap-12">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image
          src="/about-background-image.webp"
          alt=""
          fill
          className="object-cover"
          priority
        />
        {/* Textured Overlay (50% opacity) */}
        <div 
          className="absolute inset-0 opacity-50"
          style={{ 
            backgroundImage: "url('/textured-overlay.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/75" />
      </div>

      {/* Left Column: Portrait & CV Download */}
      <div className="relative z-10 w-full lg:w-[calc(41.67%-150px)] lg:min-w-[250px] flex flex-col gap-6">
        <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-lg border border-[#FBAB3C]/20 bg-neutral-dark shadow-2xl">
          <Image
            src="/alexandra-clarke-about-me.webp"
            alt="Alexandra Clarke"
            fill
            className="object-cover object-top filter grayscale contrast-110 brightness-95 hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 1024px) 100vw, 400px"
            priority
          />
        </div>
        <div className="mt-2 flex flex-col items-start gap-3">
          <h4 className="font-sans text-[14px] font-bold text-[#FBAB3C] uppercase tracking-wider">
            Download my CV
          </h4>
          <a
            href="/Alexandra-Clarke-CV-English-v1.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="group flex items-center gap-3 p-3 rounded bg-neutral-dark border border-white/5 hover:border-[#FBAB3C] transition-all duration-300 w-full max-w-[200px]"
          >
            <div className="relative h-10 w-10 shrink-0">
              <Image
                src="/pdf.png"
                alt="PDF Icon"
                fill
                className="object-contain filter brightness-90 group-hover:brightness-100 transition-all duration-300"
              />
            </div>
            <span className="font-sans text-[12px] font-bold text-white group-hover:text-[#FBAB3C] transition-colors uppercase tracking-wider">
              Open CV (PDF)
            </span>
          </a>
        </div>
      </div>

      {/* Right Column: Bio, Timeline & Info (Scrollable Content) */}
      <div className="relative z-10 flex-1 flex flex-col gap-10 lg:pl-[75px]">
        {/* Biography */}
        <div>
          <h3 className="font-sans text-[20px] font-bold tracking-widest text-[#FBAB3C] uppercase">
            Biography
          </h3>
          <p className="font-sans text-[14px] text-white mt-4 leading-relaxed tracking-wide">
            A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews &amp; social media content). Possessing strong problem-solving skills and a naturally outgoing personality, I communicate effectively with a diverse clientele for projects.
          </p>
          <p>&nbsp;</p>
          <p className="font-sans text-[14px] text-white mt-3 leading-relaxed tracking-wide">
            I am committed to maintaining high standards of quality and efficiency in all of my projects.
          </p>
        </div>

        {/* Education */}
        <div>
          <h3 className="font-sans text-[20px] font-bold tracking-widest text-[#FBAB3C] uppercase">
            Education
          </h3>
          <div className="mt-4 flex flex-col gap-4 border-l border-[#FBAB3C]/20 pl-4">
            {education.map((e, idx) => (
              <div key={idx} className="relative flex flex-col gap-1">
                <h4 className="font-sans text-[14px] font-bold text-[#FBAB3C] tracking-wide">
                  {e.institution}
                </h4>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 text-[14px] text-white">
                  <span>{e.degree}</span>
                  <span className="font-sans font-bold text-[#FBAB3C] md:ml-4 whitespace-nowrap">
                    {e.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Work Experience */}
        <div>
          <h3 className="font-sans text-[20px] font-bold tracking-widest text-[#FBAB3C] uppercase">
            Work Experience
          </h3>
          <div className="mt-4 flex flex-col gap-4 border-l border-[#FBAB3C]/20 pl-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative flex flex-col gap-1">
                <h4 className="font-sans text-[14px] font-bold text-[#FBAB3C] tracking-wide">
                  {exp.company}
                </h4>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 text-[14px] text-white">
                  <span>{exp.role}</span>
                  <span className="font-sans font-bold text-[#FBAB3C] md:ml-4 whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div>
          <h3 className="font-sans text-[20px] font-bold tracking-widest text-[#FBAB3C] uppercase">
            Skills &amp; Software
          </h3>
          <div className="mt-4 flex flex-col gap-3 border-l border-[#FBAB3C]/20 pl-4">
            <div>
              <h4 className="font-sans text-[14px] font-bold text-[#FBAB3C] tracking-wide uppercase">
                Filmmaking &amp; Creative
              </h4>
              <p className="font-sans text-[14px] text-white mt-1 leading-relaxed">
                Filmmaking (directing, editing, script writing, acting) &bull; 3D Modelling + 3D Animation &bull; Problem solving &bull; Teamwork &bull; Time management &bull; Effective communication
              </p>
            </div>
            <div className="mt-2">
              <h4 className="font-sans text-[14px] font-bold text-[#FBAB3C] tracking-wide uppercase">
                Software &amp; Tools
              </h4>
              <p className="font-sans text-[14px] text-white mt-1 leading-relaxed">
                DaVinci Resolve (film editing) &bull; Blender (3D modelling) &bull; Photoshop (photo editing)
              </p>
            </div>
          </div>
        </div>

        {/* Languages */}
        <div>
          <h3 className="font-sans text-[20px] font-bold tracking-widest text-[#FBAB3C] uppercase">
            Languages
          </h3>
          <div className="mt-4 flex flex-col gap-2 border-l border-[#FBAB3C]/20 pl-4">
            <div className="flex items-center justify-between text-[14px]">
              <span className="font-sans font-bold text-white tracking-wide">ENGLISH</span>
              <span className="font-sans font-bold text-[#FBAB3C]">NATIVE SPEAKER</span>
            </div>
            <div className="flex items-center justify-between text-[14px]">
              <span className="font-sans font-bold text-white tracking-wide">CZECH</span>
              <span className="font-sans font-bold text-[#FBAB3C]">FLUENT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
