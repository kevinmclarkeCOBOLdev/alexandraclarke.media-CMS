import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site_config"))
      .first();
  },
});

export const update = mutation({
  args: {
    copyrightYear: v.optional(v.string()),
    instagramUrl: v.optional(v.string()),
    youtubeUrl: v.optional(v.string()),
    tiktokUrl: v.optional(v.string()),
    homeBgVideoUrl: v.optional(v.string()),
    homeBgVideoId: v.optional(v.string()),
    homeShowreelVideoUrl: v.optional(v.string()),
    homeShowreelVideoId: v.optional(v.string()),
    aboutBiography: v.optional(v.string()),
    aboutCvUrl: v.optional(v.string()),
    contactSubtitle: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactLocation: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const config = await ctx.db
      .query("settings")
      .withIndex("by_key", (q) => q.eq("key", "site_config"))
      .first();

    if (!config) {
      throw new Error("Settings configuration not found. Run seed first.");
    }

    await ctx.db.patch(config._id, args);
  },
});
