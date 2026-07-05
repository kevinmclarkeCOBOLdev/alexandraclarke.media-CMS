import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
    await ctx.db.insert("portfolio", { ...args, order: count });
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
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("portfolio") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
