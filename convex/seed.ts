import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Seed settings if not present
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site_config"))
      .first();

    if (!existing) {
      // Seed settings
      await ctx.db.insert("settings", {
        key: "site_config",
        copyrightYear: "2026",
        instagramUrl: "https://www.instagram.com/alexandra.lexi.clarke/",
        youtubeUrl: "https://www.youtube.com/channel/UCrj_CL9J9GvSdUxoOE0Jzgg",
        tiktokUrl: "https://www.tiktok.com/@its.keeby.and.kirby",
        homeBgVideoUrl: "https://www.youtube.com/watch?v=BoUrWXaQUQQ",
        homeBgVideoId: "BoUrWXaQUQQ",
        homeShowreelVideoUrl: "https://www.youtube.com/watch?v=BoUrWXaQUQQ",
        homeShowreelVideoId: "BoUrWXaQUQQ",
        aboutBiography: "A dynamic filmmaker with over 7 years of filmmaking experience, adept at creating a wide range of video content (from 3D animation to interviews & social media content).",
        aboutCvUrl: "/Alexandra-Clarke-CV-English-v2.pdf",
        contactSubtitle: "Have a project in mind? Let’s create something extraordinary.",
        contactEmail: "studio@alexandraclarke.media",
        contactLocation: "Prague",
      });
    }

    // 2. Seed Experience if empty
    const existingExp = await ctx.db.query("experience").first();
    if (!existingExp) {
      const experiences = [
        { company: "The Mad & Merry Men Theatre Company, Prague", period: "2024 – 2026", role: "Social Media Manager & Photographer", order: 1 },
        { company: "Sad Man’s Tongue Restaurant, Prague", period: "2023 – 2024", role: "Host & Waitress", order: 2 }
      ];
      for (const exp of experiences) {
        await ctx.db.insert("experience", exp);
      }
    }

    // 3. Seed Skills if empty
    const existingSkills = await ctx.db.query("skills").first();
    if (!existingSkills) {
      const skills = [
        { category: "Filmmaking & Creative", items: "Filmmaking (directing, editing, script writing, acting) • 3D Modelling + 3D Animation • Teamwork • Time management • Effective communication", order: 1 },
        { category: "Software & Tools", items: "DaVinci Resolve (film editing) • Blender (3D modelling) • Photoshop (photo editing)", order: 2 }
      ];
      for (const skill of skills) {
        await ctx.db.insert("skills", skill);
      }
    }

    // 4. Seed Testimonials if empty
    const existingTestimonials = await ctx.db.query("testimonials").first();
    if (!existingTestimonials) {
      const testimonials = [
        {
          quote: "Alexandra Clarke’s work as a videographer has earned my theater group a first-rate reputation in Prague’s theater scene...",
          author: "Gordon L. Schmitz",
          title: "Artistic Director • The Mad and Merry Men, Prague",
          order: 1
        },
        {
          quote: "Collaborating with Alexandra on our annual fashion showcase was an incredible experience...",
          author: "Elena Rostova",
          title: "Lead Fashion Designer • Rostova Haute Couture",
          order: 2
        }
      ];
      for (const t of testimonials) {
        await ctx.db.insert("testimonials", t);
      }
    }

    // 5. Seed Portfolio if empty
    const existingPortfolio = await ctx.db.query("portfolio").first();
    if (!existingPortfolio) {
      const portfolio = [
        {
          title: "JUST ANOTHER ASEXUAL FILM",
          category: "short films" as const,
          image: "/portfolio/just-another-asexual-film-thumb.webp",
          year: "2024",
          length: "17:58",
          videoUrl: "oJklZVMczpg",
          order: 1
        },
        {
          title: "CABBAGE - THE TRAILER",
          category: "3d animations" as const,
          image: "/portfolio/cabbage-thumb.webp",
          year: "2024",
          length: "0:47",
          videoUrl: "WPLEGkbvzPg",
          order: 2
        }
      ];
      for (const p of portfolio) {
        await ctx.db.insert("portfolio", p);
      }
    }

    // 6. Seed Default Admin User if not present, or ensure it is updated
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", "admin"))
      .first();
    if (existingUser) {
      await ctx.db.delete(existingUser._id);
    }
    await ctx.db.insert("users", {
      username: "admin",
      passwordHash: "3bed13b20e2ff268d8d855cf05dfd9a9d42cd3d6d7d567b02fecf8fa8889c76c",
      salt: "lexisalt",
    });

    return "Database seed run completed successfully.";
  }
});
