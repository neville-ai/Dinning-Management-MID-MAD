import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getRatingsByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("ratings")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
  },
});

export const addRating = mutation({
  args: {
    menuName: v.string(),
    score: v.number(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("ratings", args);
  },
});
