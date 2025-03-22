<template>
   <div
      class="flex flex-col gap-2 py-4 px-6 rounded-xl bg-zinc-50 dark:bg-zinc-800 w-full"
      @mouseenter="isHovering = true"
      @mouseleave="isHovering = false"
   >
      <!-- 上層：人物資訊 -->
      <div class="flex justify-between items-center gap-6">
         <div class="flex items-center gap-4">
            <!-- 頭像 -->
            <div
               v-if="!compact"
               class="rounded-full w-14 h-14 min-w-14 flex items-center justify-center text-white font-bold text-2xl"
               :style="{ 'background-color': avatarColor }"
            >
               {{ props.name[0] }}
            </div>

            <!-- 文字資訊 -->
            <div :class="[compact ? 'text-sm' : 'text-base']">
               <div class="flex items-center gap-2">
                  <div :class="[compact ? 'text-base' : 'text-2xl', 'font-bold']">
                     {{ props.name }}
                  </div>
                  <div class="text-muted text-sm">
                     {{ props.job }}
                  </div>

                  <!-- 只有 compact 才顯示 -->
                  <template v-if="compact">
                     <CustomBadgeWithText
                        :text="props.belong.college"
                        size="xs"
                     />
                     <div class="text-zinc-500 text-sm">
                        {{ props.belong.department }}
                     </div>
                  </template>
                  <!-- 如果不是 compact，學院/系所額外一行 -->
                  <template v-else>
                     <div class="flex gap-2 items-center mt-1">
                        <CustomBadgeWithText
                           :text="props.belong.college"
                           size="xs"
                        />
                        <div class="text-zinc-500 text-sm">
                           {{ props.belong.department }}
                        </div>
                     </div>
                  </template>
               </div>
            </div>
         </div>

         <!-- Action slot -->
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

      <!-- 下層：貢獻度 -->
      <div
         v-if="props.contributionInput"
         class="flex flex-col gap-1 w-full"
      >
         <div class="flex justify-between">
            <div class="font-bold text-sm">
               貢獻度
            </div>
            <div class="text-zinc-500 text-sm">
               {{ contribution }}%
            </div>
         </div>
         <CustomProgressSlider
            v-model="contribution"
            class="hover:shadow-lg hover:h-5 transition-all duration-200 h-2"
            :max="props.max"
         />
      </div>
   </div>
</template>

<script lang="ts" setup>
const props = withDefaults(defineProps<{
   name: string
   job: string
   belong: {
      college: string
      department: string
   }
   contributionInput?: boolean
   max?: number
   showAvatar?: boolean
   compact?: boolean
}>(), {
   showAvatar: true,
   compact: false,
});

const contribution = defineModel<number>("contribution", {
   required: false,
   default: 50,
});

const avatarColor = computed(() => {
   return useStringToColor(props.name).value;
});

const isHovering = ref(false);

</script>

<style scoped></style>
