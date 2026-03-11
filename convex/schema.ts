import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  admins: defineTable({
    username: v.string(),
    pin: v.string(),
  }),
  menus: defineTable({
    name: v.string(),
    category: v.string(),
    date: v.string(),
    portions: v.number(),
    isAvailable: v.boolean(),
  }),
  stocks: defineTable({
    itemName: v.string(),
    quantity: v.number(),
    unit: v.string(),
    date: v.string(),
  }),
  mealCards: defineTable({
    studentName: v.string(),
    studentId: v.string(),
    category: v.string(),
    date: v.string(),
  }),
  ratings: defineTable({
    menuName: v.string(),
    score: v.number(),
    date: v.string(),
  }),
  feedbacks: defineTable({
    message: v.string(),
    date: v.string(),
    studentName: v.optional(v.string()),
  }),
  suggestions: defineTable({
    message: v.string(),
    date: v.string(),
    studentName: v.optional(v.string()),
  }),
});
