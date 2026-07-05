import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if settings already exist
    const existing = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site_config"))
      .first();

    // If it exists, let's just make sure the admin user is seeded with the correct hash
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

    if (existing) return "Database already seeded (User password hash updated).";

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

    // Seed Experience
    const experiences = [
      { company: "The Mad & Merry Men Theatre Company, Prague", period: "2024 – 2026", role: "Social Media Manager & Photographer", order: 1 },
      { company: "Sad Man’s Tongue Restaurant, Prague", period: "2023 – 2024", role: "Host & Waitress", order: 2 }
    ];
    for (const exp of experiences) {
      await ctx.db.insert("experience", exp);
    }

    // Seed Skills
    const skills = [
      { category: "Filmmaking & Creative", items: "Filmmaking (directing, editing, script writing, acting) • 3D Modelling + 3D Animation • Teamwork • Time management • Effective communication", order: 1 },
      { category: "Software & Tools", items: "DaVinci Resolve (film editing) • Blender (3D modelling) • Photoshop (photo editing)", order: 2 }
    ];
    for (const skill of skills) {
      await ctx.db.insert("skills", skill);
    }

    // Seed Testimonials
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

    // Seed Portfolio
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

    // Seed Default Admin User: admin / password123 (Change in production!)
    // For simplicity, we seed a pre-calculated SHA-256 hash
    // Hash of password123 + salt "lexisalt" is: 3bed13b20e2ff268d8d855cf05dfd9a9d42cd3d6d7d567b02fecf8fa8889c76c
    await ctx.db.insert("users", {
      username: "admin",
      passwordHash: "3bed13b20e2ff268d8d855cf05dfd9a9d42cd3d6d7d567b02fecf8fa8889c76c",
      salt: "lexisalt",
    });

    return "Database seeded successfully!";
  }
});
