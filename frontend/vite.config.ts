/// <reference types="vitest" />

import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vue from "@vitejs/plugin-vue";
import { dirname, resolve } from "node:path";
import ElementPlus from "unplugin-element-plus/vite";
import { URL, fileURLToPath } from "url";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueI18nPlugin({
      compositionOnly: true,
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/i18n/locales/**",
      ),
    }),
    ElementPlus({}),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    passWithNoTests: true,
  },
});
