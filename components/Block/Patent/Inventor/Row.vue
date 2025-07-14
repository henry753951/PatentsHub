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
      <!-- 上層：人物資訊 -->
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
               <div
                  class="flex items-center gap-2 whitespace-nowrap cursor-pointer group"
                  @click.stop="
                     open('ContactModal', {
                        props: {
                           contactInfoId: props.contactInfoId,
                        },
                     })
                  "
               >
                  <div
                     :class="[compact ? 'text-xl' : 'text-2xl', 'font-bold']"
                     class="truncate max-w-[100px] group-hover:underline"
                  >
                     {{ props.name }}
                  </div>
                  <div class="text-zinc-500 text-sm">
                     {{ props.job }}
                  </div>

                  <template v-if="compact">
                     <div class="flex gap-2 items-center whitespace-nowrap">
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

               <div
                  v-if="!compact"
                  class="flex gap-2 items-center mt-1 whitespace-nowrap"
               >
                  <CustomBadgeWithText
                     :text="props.belong.college"
                     size="xs"
                  />
                  <div class="text-zinc-500 text-sm">
                     {{ props.belong.department }}
                  </div>
               </div>
            </div>
         </div>

         <!-- 非 compact 狀態：右側貢獻度與操作 -->
         <div
            v-if="!compact && props.contributionInput"
            class="flex items-center gap-4 flex-1"
         >
            <div class="flex flex-col gap-1 w-full pl-8">
               <div class="flex justify-between text-sm">
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

      <!-- compact 狀態下的下方貢獻度 -->
      <div
         v-if="compact && props.contributionInput"
         class="flex flex-col gap-1 w-full"
      >
         <div class="flex justify-between text-sm">
            <div class="font-bold">
               貢獻度
            </div>
            <div class="text-zinc-500">
               {{ contribution }}%
            </div>
         </div>
         <CustomProgressSlider
            v-model="contribution"
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
      job: string
      contactInfoId: number
      belong: {
         college: string
         department: string
      }
      contributionInput?: boolean
      max?: number
      compact?: boolean
   }>(),
   {
      compact: false,
   },
);

const { open } = useModals();
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
