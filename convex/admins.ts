import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createAdmin = mutation({
  args: {
    username: v.string(),
    pin: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();

    if (existing) {
      return existing._id;
    }

    return await ctx.db.insert("admins", {
      username: args.username,
      pin: args.pin,
    });
  },
});

export const verifyAdmin = query({
  args: {
    username: v.string(),
    pin: v.string(),
  },
  handler: async (ctx, args) => {
    const admin = await ctx.db
      .query("admins")
      .filter((q) => q.eq(q.field("username"), args.username))
      .first();

    if (!admin) return false;
    return admin.pin === args.pin;
  },
});
