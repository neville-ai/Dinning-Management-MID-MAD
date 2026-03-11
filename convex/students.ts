import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getStudents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("students").order("desc").collect();
  },
});

export const getStudentsWithMealStatus = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const students = await ctx.db.query("students").order("desc").collect();
    const mealCards = await ctx.db
      .query("mealCards")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();

    // Map student IDs or Names to check if they have a meal card today
    return students.map((student) => {
      const studentMealCards = mealCards.filter(
        (card) => card.studentId === student.studentId
      );
      
      // Assuming the latest meal card is the one added last, or we just need any if multiple exist for the same day
      // For simplicity, taking the last one if multiple exist, or the only one.
      const latestMealCard = studentMealCards.length > 0 ? studentMealCards[studentMealCards.length - 1] : null;

      return {
        ...student,
        status: latestMealCard?.status || "Belum Makan",
      };
    });
  },
});

export const addStudent = mutation({
  args: {
    name: v.string(),
    studentId: v.string(),
    category: v.string(),
    status: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const studentId = await ctx.db.insert("students", {
      name: args.name,
      studentId: args.studentId,
      category: args.category,
    });

    if (args.status && args.status.trim() !== "") {
      const today = new Date().toISOString().split("T")[0];
      await ctx.db.insert("mealCards", {
        studentName: args.name,
        studentId: args.studentId,
        category: args.category,
        status: args.status.trim(),
        date: today,
      });
    }

    return studentId;
  },
});

export const deleteStudent = mutation({
  args: { id: v.id("students") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
