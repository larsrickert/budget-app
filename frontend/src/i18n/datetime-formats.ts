import type { IntlDateTimeFormat, IntlDateTimeFormats } from "vue-i18n";

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
} satisfies IntlDateTimeFormat;

const dateTimeFormats = {
  en: formats,
  de: formats,
} satisfies IntlDateTimeFormats;

export default dateTimeFormats;
