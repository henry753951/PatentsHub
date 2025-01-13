// https://nuxt.com/docs/api/configuration/nuxt-config@ext:hwencc.html-tag-wrapper
export default defineNuxtConfig({
   modules: [
      "nuxt-typed-router",
      "nuxt-lodash",
      "@nuxt/eslint",
      "@nuxt/fonts",
      "nuxt-icon",
      "@pinia-plugin-persistedstate/nuxt",
   ],
   devtools: { enabled: true },
   compatibilityDate: "2024-11-01",
});
