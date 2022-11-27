import { createI18n } from "vue-i18n";
import de from "../locales/de.json";

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "de",
    messages: {
      de,
    },
  });

  vueApp.use(i18n);
});
