import pkg from "./package.json";
import type { InlineConfig } from "vite";
import { appPreset } from "./primevue.theme";

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
      // Disable Vite's optimization of dependencies
      optimizeDeps: {
         entries: ["components/**/*.vue"],
         include: ["zod", "vee-validate", "lucide-vue-next", "@vee-validate/zod"],
      },
   } as InlineConfig;
};

// https://nuxt.com/docs/api/configuration/nuxt-config@ext:hwencc.html-tag-wrapper
export default defineNuxtConfig({
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
      appManifest: false,
      watcher: "parcel",
   },
   compatibilityDate: "2024-11-01",
});
