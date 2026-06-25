"use client";

import Image from "next/image";
import { Camera, Layers, Aperture, Cpu } from "lucide-react";

export default function AboutPanel() {
  const milestones = [
    { year: "2023 - Pres", title: "Creative Director", company: "Independent / Clarke & Co" },
    { year: "2020 - 2023", title: "Senior Director / Filmmaker", company: "Vanguard Studios London" },
    { year: "2017 - 2020", title: "Visual Storyteller & Photographer", company: "Rebel Media Group" },
    { year: "2015 - 2017", title: "Assistant Producer", company: "Cinematic Horizons" },
  ];

  const gear = [
    { icon: Camera, name: "ARRI Alexa Mini LF", desc: "Large-format cinema camera" },
    { icon: Aperture, name: "Leica Summicron-C", desc: "Prime cine lens set" },
    { icon: Layers, name: "DJI Ronin 2", desc: "Professional stabilization system" },
    { icon: Cpu, name: "DaVinci Resolve Studio", desc: "Color grading & editing suite" },
  ];

  return (
    <div className="flex h-full w-full flex-col lg:flex-row overflow-y-auto no-scrollbar p-6 md:p-12 lg:p-16 gap-8 lg:gap-12">
      {/* Left Column: Portrait & Creative Philosophy */}
      <div className="w-full lg:w-[calc(41.67%-150px)] lg:min-w-[250px] flex flex-col justify-between gap-6">
        <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-lg border border-accent/20 bg-neutral-dark shadow-2xl">
          <Image
            src="/alexandra-clarke-about-me.webp"
            alt="Alexandra Clarke"
            fill
            className="object-cover object-top filter grayscale contrast-110 brightness-95 hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 1024px) 100vw, 400px"
            priority
          />
        </div>
        <div>
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            Philosophy
          </span>
          <p className="font-editorial text-xl md:text-2xl italic text-foreground/90 mt-2 leading-relaxed">
            &ldquo;Cinematic storytelling is the art of translating raw human emotion into light, shadow, and silence.&rdquo;
          </p>
        </div>
      </div>

      {/* Right Column: Bio, Timeline & Gear (Scrollable Content) */}
      <div className="flex-1 flex flex-col gap-10">
        {/* Biography */}
        <div>
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            Biography
          </span>
          <p className="font-sans text-xs md:text-sm text-neutral-grey mt-4 leading-relaxed tracking-wide">
            A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews &amp; social media content). Possessing strong problem-solving skills and a naturally outgoing personality, I communicate effectively with a diverse clientele for projects.
          </p>
          <p className="font-sans text-xs md:text-sm text-neutral-grey mt-3 leading-relaxed tracking-wide">
            I am committed to maintaining high standards of quality and efficiency in all of my projects.
          </p>
        </div>

        {/* Experience Timeline */}
        <div>
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            Selected Milestones
          </span>
          <div className="mt-4 flex flex-col gap-4 border-l border-accent/20 pl-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex flex-col md:flex-row md:items-center justify-between gap-1">
                <span className="font-sans text-xs font-bold text-accent">
                  {m.year}
                </span>
                <div className="flex-1 md:ml-6">
                  <h4 className="font-sans text-xs font-bold text-foreground tracking-wide">
                    {m.title}
                  </h4>
                  <p className="font-sans text-[10px] text-neutral-grey">
                    {m.company}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipment & Process */}
        <div>
          <span className="font-sans text-[10px] font-bold tracking-widest text-accent uppercase">
            The Toolkit
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {gear.map((g, idx) => {
              const Icon = g.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded bg-neutral-dark border border-white/5"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-sans text-xs font-bold text-foreground">
                      {g.name}
                    </h4>
                    <p className="font-sans text-[10px] text-neutral-grey">
                      {g.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
