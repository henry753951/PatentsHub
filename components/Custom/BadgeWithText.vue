<template>
   <span
      class="badge"
      :class="{
         'text-[0.6rem] px-1 py-[1px]': props.size === 'xs',
         'text-sm px-1 py-0.5': props.size === 'sm',
         'text-lg px-1.5 py-1': props.size === 'lg',
         'text-xl px-1.5 py-1': props.size === 'xl',
         'text-base px-1.5 py-1': props.size === 'md' || !props.size,
      }"
      :style="badgeVars"
   >
      {{ text }}
   </span>
</template>

<script setup lang="ts">
interface Props {
   color?: string
   size?: "xs" | "sm" | "lg" | "xl" | "md"
   text: string
}

const props = defineProps<Props>();

// 根據條件選擇顏色
const badgeColor = computed(() => {
   if (props.color) {
      // 如果提供了自定義顏色，解析它
      return useParseColor(props.color);
   }
   else {
      // 否則使用 Composable 生成顏色
      const hsl = useStringToColor(props.text).value;
      const [hue, saturation, lightness] = hsl.match(/\d+/g) || ["0", "0", "0"];
      return {
         hsl,
         hue,
         saturation: saturation + "%",
         lightness: lightness + "%",
      };
   }
});

// 設置 CSS 變量
const badgeVars = computed(() => ({
   "--badge-hue": badgeColor.value.hue,
   "--badge-saturation": badgeColor.value.saturation,
   "--badge-lightness": badgeColor.value.lightness,
}));
</script>

<style scoped>
.badge {
   /* 文字顏色 */
   color: hsl(
      var(--badge-hue),
      var(--badge-saturation),
      var(--badge-lightness)
   );
   /* 背景顏色：透明度 0.2 */
   background-color: hsla(
      var(--badge-hue),
      var(--badge-saturation),
      var(--badge-lightness),
      0.2
   );
   /* 邊框顏色：透明度 0.5 */
   border-color: hsla(
      var(--badge-hue),
      var(--badge-saturation),
      var(--badge-lightness),
      0.5
   );
   border-width: 1px;
   border-style: solid;
   border-radius: 0.25rem;
   display: inline-block;
}

.dark .badge {
   color: hsl(
      var(--badge-hue),
      var(--badge-saturation),
      calc(var(--badge-lightness) + 20%)
   );
}
</style>
