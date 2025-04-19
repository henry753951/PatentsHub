<!-- components/PatentOwnerRow.vue -->
<template>
   <div
      class="py-4 px-6 rounded-xl bg-zinc-50 dark:bg-zinc-800 w-full"
      :class="[
         compact
            ? 'flex flex-col gap-2'
            : 'flex items-center justify-between gap-6 whitespace-nowrap',
      ]"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
   >
      <!-- 上層：所有權人資訊 -->
      <div class="flex items-center justify-between w-full">
         <div class="flex items-center gap-4">
            <div
               v-if="!compact"
               class="rounded-full w-14 h-14 min-w-14 flex items-center justify-center text-white font-bold text-2xl"
               :style="{ 'background-color': avatarColor }"
            >
               {{ props.name[0] }}
            </div>

            <!-- 文字資訊 -->
            <div :class="[compact ? 'text-sm' : 'text-base']">
               <div class="flex items-center gap-2 whitespace-nowrap">
                  <div :class="[compact ? 'text-xl' : 'text-2xl', 'font-bold']">
                     {{ props.name }}
                  </div>
               </div>
            </div>
         </div>

         <!-- 非 compact 狀態：右側持有度與操作 -->
         <div
            v-if="!compact && props.ownershipInput"
            class="flex items-center gap-4 flex-1"
         >
            <div class="flex flex-col gap-1 w-full pl-8">
               <div class="flex justify-between text-sm">
                  <div class="font-bold">
                     持有度
                  </div>
                  <div class="text-zinc-500">
                     {{ ownershipPercentage }}%
                  </div>
               </div>
               <CustomProgressSlider
                  v-model="ownershipPercentage"
                  class="hover:shadow-lg hover:h-5 transition-all duration-200 h-2"
                  :max="props.max"
               />
            </div>
         </div>

         <!-- 操作按鈕 slot -->
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

      <!-- compact 狀態下的下方持有度 -->
      <div
         v-if="compact && props.ownershipInput"
         class="flex flex-col gap-1 w-full"
      >
         <div class="flex justify-between text-sm">
            <div class="font-bold">
               持有度
            </div>
            <div class="text-zinc-500">
               {{ ownershipPercentage }}%
            </div>
         </div>
         <CustomProgressSlider
            v-model="ownershipPercentage"
            class="hover:shadow-lg h-2"
            :max="props.max"
         />
      </div>
   </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
   defineProps<{
      name: string
      ownershipInput?: boolean
      max?: number
      compact?: boolean
   }>(),
   {
      compact: false,
      ownershipInput: true,
      max: 100,
   },
);

const ownershipPercentage = defineModel<number>("ownershipPercentage", {
   required: false,
   default: 0,
});

const avatarColor = computed(() => {
   return useStringToColor(props.name).value;
});

const isHovering = ref(false);
</script>

<style scoped></style>
