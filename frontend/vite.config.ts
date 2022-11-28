import { fileURLToPath, URL } from "url";

import vueI18n from "@intlify/vite-plugin-vue-i18n";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueI18n({
      include: path.resolve(__dirname, "./src/i18n/locales/**"),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
