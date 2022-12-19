import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";
import type dateTimeFormats from "./datetime-formats";
import datetimeFormats from "./datetime-formats";
import type en from "./locales/en.json";
import numberFormats from "./number-formats";

// add type inference/autocompletion for translation keys
type MessageSchema = typeof en;
type DatetimeSchema = typeof dateTimeFormats["en"];
type NumberSchema = typeof numberFormats["en"];
declare module "vue-i18n" {
  export interface DefineLocaleMessage extends MessageSchema {
    [key: string]: unknown;
  }
  export interface DefineDateTimeFormat extends DatetimeSchema {
    [key: string]: unknown;
  }
  export interface DefineNumberFormat extends NumberSchema {
    [key: string]: unknown;
  }
}

const i18n = createI18n({
  legacy: false,
  globalInjection: false,
  locale: "en",
  fallbackLocale: "en",
  messages,
  numberFormats,
  datetimeFormats,
});

export default i18n;

export const getUserPreferredLocale = (): string | undefined => {
  const browserLocales = navigator.languages.map(
    (locale) => locale.split("-")[0]
  );
  return browserLocales.find((locale) =>
    i18n.global.availableLocales.includes(locale)
  );
};
