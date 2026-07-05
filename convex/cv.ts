import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Generate a upload endpoint URL
export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// Retrieve public file URL using storageId
export const getFileUrl = query({
  args: { storageId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});
