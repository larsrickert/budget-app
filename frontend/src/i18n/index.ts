import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";
import datetimeFormats from "./datetime-formats";
import numberFormats from "./number-formats";

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages,
  numberFormats,
  datetimeFormats,
});

export const getUserPreferredLocale = (): string | undefined => {
  const browserLocales = navigator.languages.map(
    (locale) => locale.split("-")[0]
  );
  return browserLocales.find((locale) =>
    i18n.global.availableLocales.includes(locale)
  );
};

export default i18n;
