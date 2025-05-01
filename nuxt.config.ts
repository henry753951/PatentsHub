import pkg from "./package.json";
import type { InlineConfig } from "vite";
import { appPreset, primevueLocale } from "./primevue.theme";

const viteElectronBuildConfig = (type: "es" | "cjs", ext: string) => {
   return {
      build: {
         minify: process.env.NODE_ENV === "production",
         rollupOptions: {
            external: Object.keys(
               "dependencies" in pkg ? pkg.dependencies : {},
            ),
            output: {
               format: type === "es" ? "es" : "cjs",
               entryFileNames: `[name].${ext}`,
            },
         },
      },
      resolve: {
         alias: {
            "~": __dirname,
         },
      },
      optimizeDeps: {
         exclude: ["supejson"],
      },
   } as InlineConfig;
};

// https://nuxt.com/docs/api/configuration/nuxt-config@ext:hwencc.html-tag-wrapper
export default defineNuxtConfig({
   imports: {
      dirs: ["composables", "composables/**"],
   },
   modules: [
      "nuxt-typed-router",
      "nuxt-lodash",
      "@nuxt/eslint",
      "@nuxt/fonts",
      "@nuxt/icon",
      "nuxt-marquee",
      "@nuxtjs/tailwindcss",
      "nuxt-electron",
      "@nuxtjs/color-mode",
      "@vueuse/nuxt",
      "@primevue/nuxt-module",
      "@nuxt/image",
      "shadcn-nuxt",
      "@formkit/auto-animate/nuxt",
      "@pinia/nuxt",
      "pinia-plugin-persistedstate/nuxt",
   ],
   tailwindcss: {
      viewer: true,
      cssPath: ["~/assets/css/tailwind.css", { injectPosition: "last" }],
      editorSupport: true,
   },
   electron: {
      build: [
         {
            entry: "electron/main.ts",
            vite: viteElectronBuildConfig("cjs", "js"),
         },
         {
            entry: "electron/preload.ts",
            vite: viteElectronBuildConfig("cjs", "js"),
            onstart(options) {
               options.reload();
            },
         },
      ],
      disableDefaultOptions: true,
   },
   primevue: {
      components: {
         prefix: "P",
      },
      options: {
         locale: primevueLocale,
         theme: {
            preset: appPreset,
            options: {
               darkModeSelector: ".dark",
            },
         },
      },
   },
   colorMode: {
      classSuffix: "",
   },
   ssr: false,
   devtools: { enabled: true },
   nitro: {
      preset: "static",
   },
   experimental: {
      watcher: "parcel",
      buildCache: true,
      typedPages: true,
   },
   logLevel: "verbose",
   vite: {
      optimizeDeps: {
         entries: ["components/**/*.vue"],
         include: [
            "zod",
            "vee-validate",
            "@vee-validate/zod",
            "class-variance-authority",
            "tailwind-merge",
            "clsx",
            "overlayscrollbars-vue",
            "primevue/tooltip",
            "radix-vue",
            "radix-ui",
            "lucide-vue-next",
            "tailwind-variants",
            "lodash-es",
         ],
      },
   },
   compatibilityDate: "2024-11-01",
});
