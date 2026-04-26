/**
 * Converts a date to a locale date string.
 * Useful to transform user-selected dates before saving it into the database.
 */
export function toLocaleDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
