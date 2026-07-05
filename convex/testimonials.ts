import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

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
    await ctx.db.insert("testimonials", { ...args, order: count });
  },
});

export const update = mutation({
  args: { id: v.id("testimonials"), quote: v.string(), author: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
  },
});

export const remove = mutation({
  args: { id: v.id("testimonials") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
