import type { NumberFormats } from "@intlify/core-base";

const numberFormats: NumberFormats = {
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
};

export default numberFormats;
