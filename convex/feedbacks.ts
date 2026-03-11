import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getFeedbacksByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("feedbacks")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
  },
});

export const addFeedback = mutation({
  args: {
    message: v.string(),
    date: v.string(),
    studentName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("feedbacks", args);
  },
});
