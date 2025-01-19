import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
export default {
   content: [
      "./components/**/*.{vue,js,ts,jsx,tsx}",
      "./layouts/**/*.{vue,js,ts,jsx,tsx}",
      "./pages/**/*.{vue,js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {},
   },
   plugins: [typography],
} as Config;
