import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getMenusByDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("menus")
      .filter((q) => q.eq(q.field("date"), args.date))
      .collect();
  },
});

export const addMenu = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    price: v.optional(v.number()),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("menus", args);
  },
});

export const updateMenu = mutation({
  args: {
    id: v.id("menus"),
    name: v.optional(v.string()),
    description: v.optional(v.string()),
    price: v.optional(v.number()),
    date: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...rest } = args;
    await ctx.db.patch(id, rest);
    return id;
  },
});

export const deleteMenu = mutation({
  args: { id: v.id("menus") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});
