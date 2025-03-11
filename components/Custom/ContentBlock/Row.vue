<template>
   <div class="w-full">
      <p class="text-sm text-gray-500 mb-1">
         {{ title }}
      </p>
      <div
         v-if="!$slots.default"
         ref="target"
         :class="{
            'px-2 bg-white dark:bg-zinc-700': isFocus,
            'cursor-pointer': !isFocus,
         }"
         class="font-bold w-full hover:bg-white hover:px-2 rounded-lg py-[0.4rem] transition-all duration-300 dark:hover:bg-zinc-700 min-h-[37.7px]"
         @dblclick="isFocus = true"
      >
         <div
            v-if="!isFocus"
            class="border-b border-transparent"
         >
            {{ str }}
         </div>
         <div
            v-else
            class="border-b border-gray-300 dark:border-zinc-800"
         >
            <input
               v-model="str"
               type="text"
               class="input"
            />
         </div>
      </div>
      <div v-else>
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

const { title = undefined } = defineProps({
   title: String,
});
const isFocus = ref(false);
const str = defineModel({
   type: String,
   required: false,
   default: "",
});
</script>

<style scoped>
.input {
   all: unset;
   width: 100% !important;
}
</style>
