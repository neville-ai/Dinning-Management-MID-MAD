import { v } from "convex/values";
import { query } from "./_generated/server";

export const getDailyStats = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const mealCards = await ctx.db
      .query("mealCards")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
    const ratings = await ctx.db
      .query("ratings")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
    const feedbacks = await ctx.db
      .query("feedbacks")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
    const suggestions = await ctx.db
      .query("suggestions")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();

    const total = mealCards.length;
    const dorm = mealCards.filter((item) => item.category.toLowerCase() === "asrama").length;
    const outsider = mealCards.filter((item) => item.category.toLowerCase() === "outsider").length;
    const ratingAvg =
      ratings.length === 0
        ? 0
        : ratings.reduce((sum, item) => sum + item.score, 0) / ratings.length;

    return {
      total,
      dorm,
      outsider,
      ratingAvg,
      feedbackCount: feedbacks.length,
      suggestionCount: suggestions.length,
    };
  },
});
