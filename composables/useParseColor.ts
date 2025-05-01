import { computed } from "vue";
const colorNames: Record<string, string> = {
   red: "#ff0000",
   green: "#00ff00",
   blue: "#0000ff",
   gray: "#808080",
   purple: "#800080",
   black: "#000000",
   white: "#ffffff",
};

// RGB 轉 HSL 的函數
function rgbToHsl(r: number, g: number, b: number): [number, number, number] {
   r /= 255;
   g /= 255;
   b /= 255;
   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);
   let h = 0,
      s = 0;
   const l = (max + min) / 2;

   if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
         case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
         case g:
            h = (b - r) / d + 2;
            break;
         case b:
            h = (r - g) / d + 4;
            break;
      }
      h /= 6;
   }

   return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

// 解析 HEX 格式
function parseHex(hex: string): [number, number, number] {
   hex = hex.replace("#", "");
   if (hex.length === 3)
      hex = hex
         .split("")
         .map((c) => c + c)
         .join("");
   const r = parseInt(hex.slice(0, 2), 16);
   const g = parseInt(hex.slice(2, 4), 16);
   const b = parseInt(hex.slice(4, 6), 16);
   return [r, g, b];
}

// 主解析函數
export function useParseColor(colorInput: string) {
   let h: number, s: number, l: number;
   const color = colorInput.trim().toLowerCase();

   // 1. 解析顏色名稱
   if (colorNames[color]) {
      const [r, g, b] = parseHex(colorNames[color]);
      [h, s, l] = rgbToHsl(r, g, b);
   }
   // 2. 解析 HEX
   else if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
      const [r, g, b] = parseHex(color);
      [h, s, l] = rgbToHsl(r, g, b);
   }
   // 3. 解析 RGB / RGBA
   else if (
      /^rgb(a)?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i.test(color)
   ) {
      const match = color.match(
         /^rgb(a)?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)$/i,
      );
      if (match) {
         const r = Math.min(255, Math.max(0, parseInt(match[2])));
         const g = Math.min(255, Math.max(0, parseInt(match[3])));
         const b = Math.min(255, Math.max(0, parseInt(match[4])));
         [h, s, l] = rgbToHsl(r, g, b);
      }
      else {
         h = 0;
         s = 0;
         l = 0;
      }
   }
   // 4. 解析 HSL / HSLA
   else if (
      /^hsl(a)?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)$/i.test(color)
   ) {
      const match = color.match(
         /^hsl(a)?\((\d+),\s*(\d+)%,\s*(\d+)%(?:,\s*([\d.]+))?\)$/i,
      );
      if (match) {
         h = Math.min(360, Math.max(0, parseInt(match[2]))) % 360;
         s = Math.min(100, Math.max(0, parseInt(match[3])));
         l = Math.min(100, Math.max(0, parseInt(match[4])));
      }
      else {
         h = 0;
         s = 0;
         l = 0;
      }
   }
   // 5. 無效輸入，預設黑色
   else {
      h = 0;
      s = 0;
      l = 0;
   }

   const hex = `#${(
      (1 << 24)
      + (Math.round((h / 360) * 255) << 16)
      + (Math.round((s / 100) * 255) << 8)
      + Math.round((l / 100) * 255)
   )
      .toString(16)
      .slice(1)}`;

   return {
      hsl: `hsl(${h}, ${s}%, ${l}%)`,
      hue: h.toString(),
      saturation: `${s}%`,
      lightness: `${l}%`,
      hex,
   };
}
