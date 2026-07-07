import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { sanitizeText, sanitizeUrl, sanitizeInstagramEmbed } from "./sanitize";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("portfolio").order("asc").collect();
  },
});

export const add = mutation({
  args: {
    title: v.string(),
    category: v.union(v.literal("short films"), v.literal("3d animations"), v.literal("marketing")),
    image: v.string(),
    year: v.string(),
    length: v.string(),
    videoUrl: v.optional(v.string()),
    embedHtml: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const count = (await ctx.db.query("portfolio").collect()).length;
    await ctx.db.insert("portfolio", {
      title: sanitizeText(args.title),
      category: args.category,
      image: sanitizeUrl(args.image),
      year: sanitizeText(args.year),
      length: sanitizeText(args.length),
      videoUrl: args.videoUrl ? sanitizeText(args.videoUrl) : undefined,
      embedHtml: args.embedHtml ? sanitizeInstagramEmbed(args.embedHtml) : undefined,
      order: count,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("portfolio"),
    title: v.optional(v.string()),
    category: v.optional(v.union(v.literal("short films"), v.literal("3d animations"), v.literal("marketing"))),
    image: v.optional(v.string()),
    year: v.optional(v.string()),
    length: v.optional(v.string()),
    videoUrl: v.optional(v.string()),
    embedHtml: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id } = args;
    const sanitizedData: {
      title?: string;
      category?: "short films" | "3d animations" | "marketing";
      image?: string;
      year?: string;
      length?: string;
      videoUrl?: string;
      embedHtml?: string;
    } = {};
    if (args.title !== undefined) sanitizedData.title = sanitizeText(args.title);
    if (args.category !== undefined) sanitizedData.category = args.category;
    if (args.image !== undefined) sanitizedData.image = sanitizeUrl(args.image);
    if (args.year !== undefined) sanitizedData.year = sanitizeText(args.year);
    if (args.length !== undefined) sanitizedData.length = sanitizeText(args.length);
    if (args.videoUrl !== undefined) sanitizedData.videoUrl = args.videoUrl ? sanitizeText(args.videoUrl) : undefined;
    if (args.embedHtml !== undefined) sanitizedData.embedHtml = args.embedHtml ? sanitizeInstagramEmbed(args.embedHtml) : undefined;

    await ctx.db.patch(id, sanitizedData);
  },
});

export const remove = mutation({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
