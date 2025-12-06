import { differenceInDays } from "date-fns";

/**
 * Timeline Utilities
 * Centralized date math helpers for converting dates to pixel positions on the timeline
 */

export interface TimelineConfig {
  minDate: Date;
  maxDate: Date;
  dayWidth: number;
}

export interface BarPosition {
  left: number;
  width: number;
}

/**
 * Calculate the pixel position of a date on the timeline
 * @param date - The date to position
 * @param minDate - The start date of the timeline
 * @param dayWidth - Pixels per day
 * @returns The left offset in pixels from the timeline start
 */
export function dateToPosition(date: Date, minDate: Date, dayWidth: number): number {
  const daysFromStart = differenceInDays(date, minDate);
  return daysFromStart * dayWidth;
}

/**
 * Calculate the position and width for a duration bar
 * @param startDate - Start date of the duration
 * @param endDate - End date of the duration
 * @param minDate - Timeline start date
 * @param dayWidth - Pixels per day
 * @returns Object with left position and width in pixels
 */
export function calculateBarPosition(
  startDate: Date,
  endDate: Date,
  minDate: Date,
  dayWidth: number
): BarPosition {
  const left = dateToPosition(startDate, minDate, dayWidth);
  const duration = differenceInDays(endDate, startDate);
  const width = Math.max(duration * dayWidth, 40); // Minimum 40px width
  
  return { left, width };
}

/**
 * Calculate the position of today's marker line
 * @param today - Current date
 * @param minDate - Timeline start date
 * @param dayWidth - Pixels per day
 * @param labelOffset - Additional offset for label column (default 256)
 * @returns Pixel position from left edge
 */
export function calculateTodayPosition(
  today: Date,
  minDate: Date,
  dayWidth: number,
  labelOffset: number = 256
): number {
  return dateToPosition(today, minDate, dayWidth) + labelOffset;
}

/**
 * Check if a date is within the visible timeline range
 * @param date - Date to check
 * @param minDate - Timeline start date
 * @param maxDate - Timeline end date
 * @returns True if date is visible on timeline
 */
export function isDateInRange(date: Date, minDate: Date, maxDate: Date): boolean {
  return date >= minDate && date <= maxDate;
}

/**
 * Convert pixel position back to a date
 * @param pixelPosition - Pixel offset from timeline start
 * @param minDate - Timeline start date
 * @param dayWidth - Pixels per day
 * @returns Calculated date
 */
export function positionToDate(
  pixelPosition: number,
  minDate: Date,
  dayWidth: number
): Date {
  const daysFromStart = Math.round(pixelPosition / dayWidth);
  const date = new Date(minDate);
  date.setDate(minDate.getDate() + daysFromStart);
  return date;
}

/**
 * Calculate duration in days between two dates
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days
 */
export function calculateDuration(startDate: Date, endDate: Date): number {
  return differenceInDays(endDate, startDate);
}

/**
 * Check if a date range includes today
 * @param startDate - Range start date
 * @param endDate - Range end date
 * @param today - Current date (optional, defaults to now)
 * @returns True if today falls within the date range
 */
export function isHappeningNow(startDate: Date, endDate: Date, today: Date = new Date()): boolean {
  return today >= startDate && today <= endDate;
}

/**
 * Check if the current month matches a given date
 * @param date - Date to check
 * @param today - Current date (optional, defaults to now)
 * @returns True if date is in current month
 */
export function isCurrentMonth(date: Date, today: Date = new Date()): boolean {
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

/**
 * Check if the current quarter matches a given date
 * @param date - Date to check
 * @param today - Current date (optional, defaults to now)
 * @returns True if date is in current quarter
 */
export function isCurrentQuarter(date: Date, today: Date = new Date()): boolean {
  const dateQuarter = Math.floor(date.getMonth() / 3);
  const todayQuarter = Math.floor(today.getMonth() / 3);
  return dateQuarter === todayQuarter && date.getFullYear() === today.getFullYear();
}

/**
 * Calculate clipped bar position for items crossing year boundaries
 * Ensures visual representation stays within the selected year window
 * @param startDate - Original start date of the feature
 * @param endDate - Original end date of the feature
 * @param minDate - Timeline minimum date (year start)
 * @param maxDate - Timeline maximum date (year end)
 * @param dayWidth - Pixels per day
 * @returns Object with clipped left position and width
 */
export function calculateClippedBarPosition(
  startDate: Date,
  endDate: Date,
  minDate: Date,
  maxDate: Date,
  dayWidth: number
): BarPosition {
  // Clip start date to timeline bounds
  const clippedStart = startDate < minDate ? minDate : startDate;
  
  // Clip end date to timeline bounds
  const clippedEnd = endDate > maxDate ? maxDate : endDate;
  
  const left = dateToPosition(clippedStart, minDate, dayWidth);
  const duration = differenceInDays(clippedEnd, clippedStart);
  const width = Math.max(duration * dayWidth, 40); // Minimum 40px width
  
  return { left, width };
}

/**
 * Check if today falls within the selected year
 * @param today - Current date
 * @param selectedYear - The year being viewed
 * @returns True if today is in the selected year
 */
export function isTodayInYear(today: Date, selectedYear: number): boolean {
  return today.getFullYear() === selectedYear;
}
