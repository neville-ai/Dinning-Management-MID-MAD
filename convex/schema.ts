import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
  }),
  tables: defineTable({
    label: v.string(),
    capacity: v.number(),
    status: v.string(),
  }),
  reservations: defineTable({
    guestName: v.string(),
    partySize: v.number(),
    time: v.number(),
    tableId: v.optional(v.id("tables")),
    notes: v.optional(v.string()),
  }),
});
