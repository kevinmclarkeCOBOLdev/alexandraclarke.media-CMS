import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { sanitizeText, sanitizeUrl } from "./sanitize";

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

    const sanitizedArgs: Record<string, string> = {};
    if (args.copyrightYear !== undefined) sanitizedArgs.copyrightYear = sanitizeText(args.copyrightYear);
    if (args.instagramUrl !== undefined) sanitizedArgs.instagramUrl = sanitizeUrl(args.instagramUrl);
    if (args.youtubeUrl !== undefined) sanitizedArgs.youtubeUrl = sanitizeUrl(args.youtubeUrl);
    if (args.tiktokUrl !== undefined) sanitizedArgs.tiktokUrl = sanitizeUrl(args.tiktokUrl);
    if (args.homeBgVideoUrl !== undefined) sanitizedArgs.homeBgVideoUrl = sanitizeUrl(args.homeBgVideoUrl);
    if (args.homeBgVideoId !== undefined) sanitizedArgs.homeBgVideoId = sanitizeText(args.homeBgVideoId);
    if (args.homeShowreelVideoUrl !== undefined) sanitizedArgs.homeShowreelVideoUrl = sanitizeUrl(args.homeShowreelVideoUrl);
    if (args.homeShowreelVideoId !== undefined) sanitizedArgs.homeShowreelVideoId = sanitizeText(args.homeShowreelVideoId);
    if (args.aboutBiography !== undefined) sanitizedArgs.aboutBiography = sanitizeText(args.aboutBiography);
    if (args.aboutCvUrl !== undefined) sanitizedArgs.aboutCvUrl = sanitizeUrl(args.aboutCvUrl);
    if (args.contactSubtitle !== undefined) sanitizedArgs.contactSubtitle = sanitizeText(args.contactSubtitle);
    if (args.contactEmail !== undefined) sanitizedArgs.contactEmail = sanitizeText(args.contactEmail);
    if (args.contactLocation !== undefined) sanitizedArgs.contactLocation = sanitizeText(args.contactLocation);

    await ctx.db.patch(config._id, sanitizedArgs);
  },
});
