import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// List all users
export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

// Add a new user
export const add = mutation({
  args: {
    username: v.string(),
    password: v.string(),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (existing) {
      throw new Error("Username already exists.");
    }

    const salt = generateSalt();
    const passwordHash = await computeHash(args.password, salt);

    await ctx.db.insert("users", {
      username: args.username,
      passwordHash,
      salt,
      name: args.name,
      email: args.email,
    });
  },
});

// Update a user
export const update = mutation({
  args: {
    id: v.id("users"),
    username: v.string(),
    password: v.optional(v.string()),
    name: v.string(),
    email: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("User not found.");
    }

    // Check if the new username is already taken by another user
    if (args.username !== existing.username) {
      const duplicate = await ctx.db
        .query("users")
        .withIndex("by_username", (q) => q.eq("username", args.username))
        .first();
      if (duplicate) {
        throw new Error("Username already exists.");
      }
    }

    const patch: {
      username: string;
      name?: string;
      email?: string;
      passwordHash?: string;
      salt?: string;
    } = {
      username: args.username,
      name: args.name,
      email: args.email,
    };

    if (args.password) {
      const salt = generateSalt();
      patch.passwordHash = await computeHash(args.password, salt);
      patch.salt = salt;
    }

    await ctx.db.patch(args.id, patch);
  },
});

// Remove a user
export const remove = mutation({
  args: {
    id: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("User not found.");
    }

    // Optional safety check: Don't delete the last user
    const allUsers = await ctx.db.query("users").collect();
    if (allUsers.length <= 1) {
      throw new Error("Cannot delete the last admin user.");
    }

    await ctx.db.delete(args.id);
  },
});

// Helper: SHA-256 Hashing utilizing Web Crypto API
async function computeHash(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// Helper: Secure Random Salt Generation
function generateSalt(): string {
  const arr = new Uint8Array(16);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}
