/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admins from "../admins.js";
import type * as feedbacks from "../feedbacks.js";
import type * as mealCards from "../mealCards.js";
import type * as menus from "../menus.js";
import type * as ratings from "../ratings.js";
import type * as stats from "../stats.js";
import type * as stocks from "../stocks.js";
import type * as students from "../students.js";
import type * as suggestions from "../suggestions.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  admins: typeof admins;
  feedbacks: typeof feedbacks;
  mealCards: typeof mealCards;
  menus: typeof menus;
  ratings: typeof ratings;
  stats: typeof stats;
  stocks: typeof stocks;
  students: typeof students;
  suggestions: typeof suggestions;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
