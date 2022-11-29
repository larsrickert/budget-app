import messages from "@intlify/unplugin-vue-i18n/messages";
import { createI18n } from "vue-i18n";
import datetimeFormats from "./datetime-formats";
import numberFormats from "./number-formats";

const i18n = createI18n({
  locale: "de",
  fallbackLocale: "de",
  messages,
  numberFormats,
  datetimeFormats,
});

export default i18n;
