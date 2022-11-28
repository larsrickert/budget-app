import messages from "@intlify/vite-plugin-vue-i18n/messages";
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

export default i18n;
