import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { sanitizeText } from "./sanitize";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("testimonials").order("asc").collect();
  },
});

export const add = mutation({
  args: { quote: v.string(), author: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const count = (await ctx.db.query("testimonials").collect()).length;
    await ctx.db.insert("testimonials", {
      quote: sanitizeText(args.quote),
      author: sanitizeText(args.author),
      title: sanitizeText(args.title),
      order: count,
    });
  },
});

export const update = mutation({
  args: { id: v.id("testimonials"), quote: v.string(), author: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const { id } = args;
    await ctx.db.patch(id, {
      quote: sanitizeText(args.quote),
      author: sanitizeText(args.author),
      title: sanitizeText(args.title),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
