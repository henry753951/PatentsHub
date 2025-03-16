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
         class="font-bold hover:w-full hover:bg-white hover:px-2 rounded-lg transition-all duration-300 dark:hover:bg-zinc-700 w-[100%] py-1.5"
         @dblclick="focus()"
      >
         <div
            v-if="!isFocus"
            class="border-b border-t-transparent min-h-[30px] flex items-center border-box"
            :class="{
               'border-red-300 dark:border-red-500': !isSynced,
               'border-transparent': isSynced,
            }"
         >
            {{ str }} {{ number }}
         </div>
         <div
            v-else
            class="border-b border-t-transparent border-gray-300 dark:border-zinc-800 border-box min-h-[30px]"
         >
            <textarea
               v-if="str !== undefined"
               v-model="str"
               auto-resize
               type="text"
               class="input"
            />
            <input
               v-if="number !== undefined"
               v-model="number"
               type="number"
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
});
const number = defineModel("number", {
   type: Number,
   required: false,
});

const focus = () => {
   isFocus.value = true;
   nextTick(() => {
      const input = target.value?.querySelector("textarea");
      if (input) input.focus();
   });
};
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
input.input {
   all: unset;
   width: 100%;
}
</style>
