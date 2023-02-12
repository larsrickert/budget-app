import type { IntlNumberFormats } from "vue-i18n";

const numberFormats = {
  en: {
    currency: {
      style: "currency",
      currency: "USD",
    },
    currencyShort: {
      style: "currency",
      currency: "USD",
      notation: "compact",
    },
  },
  de: {
    currency: {
      style: "currency",
      currency: "EUR",
    },
    currencyShort: {
      style: "currency",
      currency: "EUR",
      notation: "compact",
    },
  },
} satisfies IntlNumberFormats;

export default numberFormats;
