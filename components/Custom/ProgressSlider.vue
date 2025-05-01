<template>
   <div
      ref="container"
      class="w-full rounded-lg bg-zinc-200 dark:bg-zinc-700 cursor-pointer"
      @mousedown="isDragging = true"
      @mouseup="isDragging = false"
      @selectstart.prevent
   >
      <div
         class="h-full rounded-xl flex justify-end py-1 transition-transform duration-300 ease-in-out"
         :class="{
            'animate-bg-red-500': isOutofRange,
            'bg-zinc-800 dark:bg-zinc-400': !isOutofRange,
         }"
         :style="{ width: `${percent}%` }"
         @selectstart.prevent
      >
         <div
            ref="handle"
            class="h-full cursor-pointer w-3"
            @selectstart.prevent
         >
            <div
               class="bg-zinc-200 h-full rounded-xl w-1 opacity-30"
               @selectstart.prevent
            ></div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
const modelValue = defineModel<number>({
   required: false,
   default: 80,
});

const percent = computed(
   () => ((modelValue.value - range[0]) / (range[1] - range[0])) * 100,
);

const {
   max = 40,
   min = 0,
   range = [0, 100],
} = defineProps<{
   max?: number
   min?: number
   range?: number[]
}>();

const isOutofRange = computed(
   () => modelValue.value < min || modelValue.value > max,
);

const container = useTemplateRef<HTMLElement>("container");
const handle = useTemplateRef<HTMLElement>("handle");

const { pressed } = useMousePressed({ target: container });
const { elementX, elementWidth } = useMouseInElement(container);
const isDragging = ref(false);

watch(pressed, (value) => {
   if (!value) {
      isDragging.value = false;
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
   }
   else {
      document.body.style.userSelect = "none";
      document.body.style.cursor = "grabbing";
   }
});

watch([elementX, isDragging], ([currentElementX, currentIsDragging]) => {
   if (currentIsDragging) {
      const clampedValue = Math.round(
         (currentElementX / elementWidth.value) * (range[1] - range[0])
         + range[0],
      );

      modelValue.value = Math.max(
         range[0],
         Math.min(Math.max(min, Math.min(clampedValue, max)), range[1]),
      );
   }
   else {
      document.body.style.userSelect = "auto";
      document.body.style.cursor = "auto";
   }
});
</script>

<style scoped>
.animate-bg-red-500 {
   animation: bg-red-500 2s infinite;
}

@keyframes bg-red-500 {
   0% {
      background-color: #f56565;
   }
   50% {
      background-color: #311717;
   }
   100% {
      background-color: #f56565;
   }
}
</style>
