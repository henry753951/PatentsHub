import { definePreset } from "@primeuix/themes";
import type { PrimeVueLocaleOptions } from "primevue/config";
import Aura from "@primeuix/themes/aura";

const appPreset = definePreset(Aura, {
   semantic: {
      primary: {
         50: "{zinc.50}",
         100: "{zinc.100}",
         200: "{zinc.200}",
         300: "{zinc.300}",
         400: "{zinc.400}",
         500: "{zinc.500}",
         600: "{zinc.600}",
         700: "{zinc.700}",
         800: "{zinc.800}",
         900: "{zinc.900}",
         950: "{zinc.950}",
      },
      colorScheme: {
         light: {
            primary: {
               color: "{zinc.950}",
               inverseColor: "#ffffff",
               hoverColor: "{zinc.900}",
               activeColor: "{zinc.800}",
            },
            highlight: {
               background: "{zinc.950}",
               focusBackground: "{zinc.700}",
               color: "#ffffff",
               focusColor: "#ffffff",
            },
         },
         dark: {
            primary: {
               color: "{zinc.50}",
               inverseColor: "{zinc.950}",
               hoverColor: "{zinc.100}",
               activeColor: "{zinc.200}",
            },
            highlight: {
               background: "rgba(250, 250, 250, .16)",
               focusBackground: "rgba(250, 250, 250, .24)",
               color: "rgba(255,255,255,.87)",
               focusColor: "rgba(255,255,255,.87)",
            },
         },
      },
   },
});

const primevueLocale = {
   dayNames: [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六",
   ],
   dayNamesShort: ["週日", "週一", "週二", "週三", "週四", "週五", "週六"],
   dayNamesMin: ["日", "一", "二", "三", "四", "五", "六"],
   monthNames: [
      "一月",
      "二月",
      "三月",
      "四月",
      "五月",
      "六月",
      "七月",
      "八月",
      "九月",
      "十月",
      "十一月",
      "十二月",
   ],
   monthNamesShort: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
   ],
   today: "今天",
   clear: "清除",
} as PrimeVueLocaleOptions;

export { appPreset, primevueLocale };
