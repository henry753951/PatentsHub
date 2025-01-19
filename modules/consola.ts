import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";

export default defineNuxtModule({
   setup(options, nuxt) {
      const names = ["consola"];
      names.forEach(name => addImports({ name, as: name, from: "consola" }));
   },
});
