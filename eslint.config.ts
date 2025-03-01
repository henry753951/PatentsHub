// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import pluginVue from "eslint-plugin-vue";
import parserTs from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";

export default withNuxt([...pluginVue.configs["flat/strongly-recommended"]])
   .prepend({
      plugins: {
         "@stylistic": stylistic,
      },
      languageOptions: {
         parser: parserTs,
      },
      rules: {
         ...stylistic.configs["recommended-flat"].rules,
         "@stylistic/indent": ["warn", 3],
         "@stylistic/quotes": ["warn", "double"],
         "@stylistic/arrow-parens": ["warn", "always"],
         "@stylistic/semi": ["warn", "always"],
         "@stylistic/no-trailing-spaces": "warn",
      },
   })
   .override("vue/strongly-recommended/rules", {
      rules: {
         "vue/multi-word-component-names": "off",
         "vue/html-self-closing": "off",
         "vue/html-indent": ["warn", 3],
         "vue/singleline-html-element-content-newline": [
            "warn",
            {
               ignoreWhenNoAttributes: true,
               ignoreWhenEmpty: false,
            },
         ],
      },
   }).override("nuxt/typescript/rules", {
      rules: {
         "@typescript-eslint/no-unused-vars": "warn",
         "@typescript-eslint/no-explicit-any": "warn",
      },
   });
