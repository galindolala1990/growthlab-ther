/**
 * Roadmap Filter Constants
 * Single source of truth for filter options
 */

export const ALL_STAGES = ["planning", "design", "development", "testing", "launch"];
export const ALL_PRIORITIES = ["low", "medium", "high", "critical"];

export type Stage = typeof ALL_STAGES[number];
export type Priority = typeof ALL_PRIORITIES[number];
