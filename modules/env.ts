import { defineNuxtModule, addImports, createResolver } from "@nuxt/kit";
import consola from "consola";
export default defineNuxtModule({
   setup(options, nuxt) {
      const orginEnv = process.env;
      const include = ["DATABASE_URL", "NODE_ENV", "NODE"];
      consola.info("Env:", include.map((key) => `${key}=${orginEnv[key]}`).join(", "));
   },
});
