import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getSuggestionsByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("suggestions")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
  },
});

export const addSuggestion = mutation({
  args: {
    message: v.string(),
    date: v.string(),
    studentName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("suggestions", args);
  },
});
