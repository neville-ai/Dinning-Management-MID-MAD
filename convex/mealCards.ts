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
    status: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the student already exists in the master list
    const existingStudent = await ctx.db
      .query("students")
      .filter((q) => q.eq(q.field("studentId"), args.studentId))
      .first();

    // Auto-register if the student doesn't exist yet
    if (!existingStudent) {
      await ctx.db.insert("students", {
        name: args.studentName,
        studentId: args.studentId,
        category: args.category,
      });
    }

    // Insert the meal card entry
    return await ctx.db.insert("mealCards", args);
  },
});
