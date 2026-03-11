import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getStocksByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("stocks")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
  },
});

export const addStock = mutation({
  args: {
    itemName: v.string(),
    quantity: v.string(),
    expiryDate: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("stocks", args);
  },
});
