import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
   setup(options, nuxt) {
      const modules = {
         zod: ["z"],
      };
      const typeModules = {
         "vue-component-type-helpers": ["ComponentExposed"],
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
