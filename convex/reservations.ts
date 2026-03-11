import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getReservations = query({
  handler: async (ctx) => {
    const reservations = await ctx.db
      .query("reservations")
      .order("desc")
      .collect();
    return reservations;
  },
});

export const addReservation = mutation({
  args: {
    guestName: v.string(),
    partySize: v.number(),
    time: v.number(),
    tableId: v.optional(v.id("tables")),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const reservationId = await ctx.db.insert("reservations", {
      guestName: args.guestName,
      partySize: args.partySize,
      time: args.time,
      tableId: args.tableId,
      notes: args.notes,
    });
    return reservationId;
  },
});

export const clearAllReservations = mutation({
  handler: async (ctx) => {
    const reservations = await ctx.db.query("reservations").collect();

    for (const reservation of reservations) {
      await ctx.db.delete(reservation._id);
    }

    return { deleteCount: reservations.length };
  },
});
