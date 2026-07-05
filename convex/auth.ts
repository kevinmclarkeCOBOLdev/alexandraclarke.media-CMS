import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const login = mutation({
  args: {
    username: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();

    if (!user) {
      return { success: false, error: "Invalid username or password" };
    }

    const hash = await computeHash(args.password, user.salt);

    if (hash !== user.passwordHash) {
      return { success: false, error: "Invalid username or password" };
    }

    return {
      success: true,
      token: `${user._id}_${Date.now()}`,
      user: { username: user.username },
    };
  },
});

async function computeHash(password: string, salt: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
