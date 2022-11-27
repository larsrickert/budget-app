// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiHost: "http://localhost:3000",
    },
  },
  app: {
    head: {
      titleTemplate: "Budget App - %s",
    },
  },
});
