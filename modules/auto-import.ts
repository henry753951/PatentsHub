import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
   setup(options, nuxt) {
      const modules = {
         "zod": ["z"],
         "~/server": ["dbZ"],
         "~/zod.dto": ["CustomZodType"],
         "overlayscrollbars-vue": ["OverlayScrollbarsComponent"],
      };
      const typeModules = {
         "vue-component-type-helpers": ["ComponentExposed"],
         "~/server": ["RouterInput", "RouterOutput"],
      };
      Object.entries(modules).forEach(([name, imports]) => {
         imports.forEach((importName) =>
            addImports({
               name: importName,
               as: importName,
               from: name,
            }),
         );
      });

      Object.entries(typeModules).forEach(([name, imports]) => {
         imports.forEach((importName) =>
            addImports({
               name: importName,
               as: importName,
               from: name,
               type: true,
            }),
         );
      });
   },
});
