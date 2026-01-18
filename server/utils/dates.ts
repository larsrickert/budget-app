/**
 * Removes the time (hours, minutes etc.) from the given date and sets them to 0.
 */
export function removeTimeFromDate(date: Date | string) {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * Formats a Date object into a 'YYYY-MM-DD' string.
 * @param date The date to format.
 * @returns The formatted date string.
 */
export function formatToDateString(date: Date): string {
  // `toISOString()` returns 'YYYY-MM-DDTHH:mm:ss.sssZ', we just need the date part.
  return date.toISOString().split("T")[0]!;
}

/**
 * Parses a given date string received from the database.
 * Handles the timezone accordingly.
 */
export function parseDatabaseDate(dateString: string) {
  return new Date(dateString + "T00:00:00.000Z");
}

/**
 * Sets the time (hours, minutes etc.) to the very end of the day.
 */
export function setTimeToDayEnd(date: Date) {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
}
