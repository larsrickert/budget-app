import type { DateTimeFormat, DateTimeFormats } from "@intlify/core-base";

const formats = {
  date: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  },
  dateTime: {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  },
} satisfies DateTimeFormat;

const dateTimeFormats = {
  en: formats,
  de: formats,
} satisfies DateTimeFormats;

export default dateTimeFormats;
