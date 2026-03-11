import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMealCardsByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("mealCards")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
  },
});

export const addMealCard = mutation({
  args: {
    studentName: v.string(),
    studentId: v.string(),
    category: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("mealCards", args);
  },
});
