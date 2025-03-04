<template>
   <div
      ref="container"
      class="w-full rounded-lg h-5 bg-zinc-200 dark:bg-zinc-700 cursor-pointer"
      @mousedown="isDragging = true"
      @mouseup="isDragging = false"
      @selectstart.prevent
   >
      <div
         class="h-full rounded-xl  flex justify-end py-1 transition-transform duration-200"
         :class="{
            'animate-bg-red-500': isOutofRange,
            'bg-zinc-800 dark:bg-zinc-400' : !isOutofRange
         }"
         :style="{ width: `${modelValue}%` }"
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

const { max = 40, min = 0 } = defineProps<{
   max?: number
   min?: number
}>();

const isOutofRange = computed(() => modelValue.value < min || modelValue.value > max);

const container = useTemplateRef<HTMLElement>("container");
const handle = useTemplateRef<HTMLElement>("handle");

const { pressed } = useMousePressed({ target: container });
const { elementX, elementWidth } = useMouseInElement(container);
const isDragging = ref(false);
watch(pressed, (value) => {
   if (!value) isDragging.value = false;
});

watch([elementX, isDragging], (value) => {
   if (isDragging.value) {
      modelValue.value = Math.max(
         min,
         Math.min(Math.round((elementX.value / elementWidth.value) * 100), max),
      );
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
