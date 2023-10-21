import { TransactionFrequency } from "@/composables/use-transaction";

export const getNextFrequencyDate = (
  bookingDate: string,
  frequency: TransactionFrequency,
): Date => {
  const date = new Date(bookingDate);
  const monthOffset = Number.parseInt(frequency);
  if (!isNaN(monthOffset)) {
    date.setMonth(date.getMonth() + monthOffset);
  }
  return date;
};
