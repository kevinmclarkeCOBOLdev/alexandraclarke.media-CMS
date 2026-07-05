import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Global settings and text content (Singletons)
  settings: defineTable({
    key: v.string(), // e.g., "site_config"
    copyrightYear: v.string(),
    instagramUrl: v.string(),
    youtubeUrl: v.string(),
    tiktokUrl: v.string(),
    homeBgVideoUrl: v.string(),
    homeBgVideoId: v.string(),
    homeShowreelVideoUrl: v.string(),
    homeShowreelVideoId: v.string(),
    aboutBiography: v.string(),
    aboutCvUrl: v.string(),
    contactSubtitle: v.string(),
    contactEmail: v.string(),
    contactLocation: v.string(),
  }).index("by_key", ["key"]),

  // Work experience timeline
  experience: defineTable({
    company: v.string(),
    period: v.string(),
    role: v.string(),
    order: v.number(),
  }),

  // Skills categorized
  skills: defineTable({
    category: v.string(),
    items: v.string(),
    order: v.number(),
  }),

  // Testimonials list
  testimonials: defineTable({
    quote: v.string(),
    author: v.string(),
    title: v.string(), // "Artistic Director • The Mad and Merry Men"
    order: v.number(),
  }),

  // Portfolio items
  portfolio: defineTable({
    title: v.string(),
    category: v.union(v.literal("short films"), v.literal("3d animations"), v.literal("marketing")),
    image: v.string(),
    year: v.string(),
    length: v.string(),
    videoUrl: v.optional(v.string()), // YouTube Video ID
    embedHtml: v.optional(v.string()), // Instagram embed HTML code
    order: v.number(),
  }),

  // CMS Admins (Authentication)
  users: defineTable({
    username: v.string(),
    passwordHash: v.string(), // Hashed using SHA-256 + Salt
    salt: v.string(),
  }).index("by_username", ["username"]),
});
