import { cp, mkdir } from "node:fs/promises";
import path from "node:path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-12-20",
  devtools: { enabled: true },
  typescript: { typeCheck: "build" },
  modules: [
    "@sit-onyx/nuxt",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "@nuxtjs/color-mode",
    "nuxt-auth-utils",
    "@vueuse/nuxt",
  ],
  css: [
    "~/assets/css/index.scss",
    "@fontsource-variable/source-sans-3",
    "@fontsource-variable/source-code-pro",
  ],
  app: {
    head: {
      titleTemplate: "%s | Budget App",
      link: [
        // icons generated with: https://realfavicongenerator.net
        { rel: "icon", type: "image/png", href: "/favicon-96x96.png", sizes: "96x96" },
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "shortcut icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      meta: [{ name: "apple-mobile-web-app-title", content: "Budget App" }],
    },
  },
  i18n: {
    defaultLocale: "en-US",
    strategy: "no_prefix",
    locales: [
      { code: "en-US", file: "en-US.json", name: "English" },
      { code: "de-DE", file: "de-DE.json", name: "Deutsch" },
    ],
  },
  nitro: {
    compressPublicAssets: true,
    hooks: {
      "build:before": async (nitro) => {
        // copy database migrations files to build output so they can be applied
        // by the app when starting (see server/plugins/migration.server.ts)
        const targetDir = path.join(nitro.options.output.serverDir, "database/migrations");
        await mkdir(targetDir, { recursive: true });
        await cp("./server/database/migrations", targetDir, { recursive: true });
      },
    },
  },
  runtimeConfig: {
    db: {
      host: process.env.NUXT_DB_HOST,
      user: process.env.NUXT_DB_USER,
      password: process.env.NUXT_DB_PASSWORD,
      name: process.env.NUXT_DB_NAME,
    },
  },
});
