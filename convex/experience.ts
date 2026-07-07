import { query, mutation } from "./_generated/server";
import { v } from "convex/values";
import { sanitizeText } from "./sanitize";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("experience").order("asc").collect();
  },
});

export const updateAll = mutation({
  args: {
    items: v.array(
      v.object({
        company: v.string(),
        period: v.string(),
        role: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    // Drop existing and replace with new ordered array
    const existing = await ctx.db.query("experience").collect();
    for (const item of existing) {
      await ctx.db.delete(item._id);
    }
    for (let i = 0; i < args.items.length; i++) {
      const item = args.items[i];
      await ctx.db.insert("experience", {
        company: sanitizeText(item.company),
        period: sanitizeText(item.period),
        role: sanitizeText(item.role),
        order: i,
      });
    }
  },
});
