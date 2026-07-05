import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("skills").order("asc").collect();
  },
});

export const updateAll = mutation({
  args: {
    items: v.array(
      v.object({
        category: v.string(),
        items: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Drop existing and replace with new ordered array
    const existing = await ctx.db.query("skills").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }
    for (let i = 0; i < args.items.length; i++) {
      await ctx.db.insert("skills", { ...args.items[i], order: i });
    }
  },
});
