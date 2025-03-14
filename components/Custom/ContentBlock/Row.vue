<template>
   <div
      v-auto-animate
      class="w-full flex flex-col"
   >
      <p class="text-sm text-gray-500 mb-1 w-full">
         {{ title }}
      </p>
      <div
         v-if="!$slots.default"
         ref="target"
         :class="{
            'px-2 bg-white dark:bg-zinc-700 w-full': isFocus,
            'cursor-pointer': !isFocus,
         }"
         class="font-bold hover:w-full hover:bg-white hover:px-2 rounded-lg py-[0.4rem] transition-all duration-300 dark:hover:bg-zinc-700 min-h-[37.7px] w-[calc(100%-1rem)]"
         @dblclick="isFocus = true"
      >
         <div
            v-if="!isFocus"
            class="border-b pb-[5.9px]"
            :class="{
               'border-red-300 dark:border-red-500': !isSynced,
               'border-transparent': isSynced,
            }"
         >
            {{ str }}
         </div>
         <div
            v-else
            class="border-b border-gray-300 dark:border-zinc-800"
         >
            <textarea
               v-model="str"
               auto-resize
               type="text"
               class="input"
            />
         </div>
      </div>
      <div
         v-else
         class="w-full"
      >
         <slot />
      </div>
   </div>
</template>

<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";

const target = useTemplateRef<HTMLElement>("target");
onClickOutside(target, (event) => {
   isFocus.value = false;
});

const { title = undefined, isSynced = true } = defineProps({
   title: String,
   isSynced: Boolean,
});
const isFocus = ref(false);
const str = defineModel({
   type: String,
   required: false,
   default: "",
});
</script>

<style scoped>
textarea {
   all: unset;
}
textarea.input {
   width: 100%;
   resize: vertical;
   overflow: hidden;
   field-sizing: content;
}
</style>
