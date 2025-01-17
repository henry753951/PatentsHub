import type { Config } from "tailwindcss";
export default {
   content: [
      "./components/**/*.{vue,js,ts,jsx,tsx}",
      "./layouts/**/*.{vue,js,ts,jsx,tsx}",
      "./pages/**/*.{vue,js,ts,jsx,tsx}",
   ],
   theme: {
      extend: {},
   },
   plugins: [],
} as Config;
