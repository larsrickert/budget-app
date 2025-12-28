import type {
  I18nOptions,
  IntlDateTimeFormat,
  IntlDateTimeFormats,
  IntlNumberFormats,
} from "vue-i18n";

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

const datetimeFormats = {
  "en-US": formats,
  "de-DE": formats,
} satisfies IntlDateTimeFormats;

const numberFormats = {
  "en-US": {
    currency: {
      style: "currency",
      currency: "USD",
    },
    currencyCompact: {
      style: "currency",
      currency: "USD",
      notation: "compact",
    },
  },
  "de-DE": {
    currency: {
      style: "currency",
      currency: "EUR",
    },
    currencyCompact: {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    },
  },
} satisfies IntlNumberFormats;

export default {
  datetimeFormats,
  numberFormats,
} satisfies I18nOptions;
