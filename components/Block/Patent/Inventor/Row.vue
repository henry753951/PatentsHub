<template>
   <div
      class="flex gap-8 items-center py-4 px-6 rounded-xl bg-zinc-50 dark:bg-zinc-800 whitespace-nowrap w-full"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
   >
      <!-- 人物卡 -->
      <div class="flex gap-6 items-center">
         <div
            class="rounded-full w-14 h-14 min-w-14 flex items-center justify-center text-white font-bold text-2xl"
            :style="{
               'background-color': avatarColor,
            }"
         >
            {{ props.name[0] }}
         </div>
         <div
            :class="{
               'w-[150px]': props.contributionInput,
            }"
         >
            <div class="flex items-end gap-2">
               <div class="font-bold text-2xl">
                  {{ props.name }}
               </div>
               <div>{{ props.job }}</div>
            </div>
            <div class="flex gap-2 items-center">
               <CustomBadgeWithText
                  :text="props.belong.college"
                  size="xs"
               />
               <div class="color-zinc-500 text-sm">
                  {{ props.belong.department }}
               </div>
            </div>
         </div>
      </div>
      <div
         class="flex"
         :class="{
            'flex-1': props.contributionInput,
         }"
      >
         <!-- 貢獻度 -->
         <div
            v-if="props.contributionInput"
            class="flex flex-col gap-1 w-full"
         >
            <div class="flex justify-between">
               <div class="font-bold">
                  貢獻度
               </div>
               <div class="text-zinc-500">
                  {{ contribution }}%
               </div>
            </div>
            <CustomProgressSlider
               v-model="contribution"
               class="hover:shadow-lg hover:h-5 transition-all duration-200 h-2"
               :max="props.max"
            />
         </div>
         <!-- Action -->
         <div
            v-if="$slots.actions?.().length"
            class="transition-all duration-500 overflow-clip ease-in-out"
            :class="{
               'max-w-0': !isHovering,
               'max-w-[200px]': isHovering,
            }"
         >
            <div
               class="opacity-0 transition-opacity duration-200 whitespace-nowrap h-full"
               :class="{ 'opacity-100': isHovering }"
            >
               <slot name="actions" />
            </div>
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
   name: string
   job: string
   belong: {
      college: string
      department: string
   }
   contributionInput?: boolean
   max?: number
}>();

const contribution = defineModel<number>("contribution", {
   required: false,
   default: 50,
});

const avatarColor = computed(() => {
   const hsl = useStringToColor(props.name).value;
   return hsl;
});

const isHovering = ref(false);
</script>

<style scoped></style>
