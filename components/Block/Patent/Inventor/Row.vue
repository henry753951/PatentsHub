<template>
   <div
      class="flex gap-8 items-center py-4 px-5 rounded-xl bg-zinc-50 dark:bg-zinc-800"
   >
      <!-- 人物卡 -->
      <div class="flex gap-6 items-center w-[30%]">
         <div
            class="rounded-full w-14 h-14 flex items-center justify-center text-white font-bold text-2xl"
            :style="{
               'background-color': avatarColor,
            }"
         >
            {{ props.name[0] }}
         </div>
         <div>
            <div class="flex items-end gap-2">
               <div class="font-bold text-2xl">
                  {{ props.name }}
               </div>
               <div>{{ props.job }}</div>
            </div>
            <div class="flex gap-2 items-center">
               <CustomBadgeWithText
                  :text="props.belong.department"
                  size="xs"
               />
               <div class="color-zinc-500 text-sm">
                  {{ props.belong.college }}
               </div>
            </div>
         </div>
      </div>
      <!-- 貢獻度 -->
      <div class="flex flex-col gap-1 flex-1">
         <div class="flex justify-between">
            <div class="font-bold">
               貢獻度
            </div>
            <div class="text-zinc-500">
               {{ contribution }}%
            </div>
         </div>
         <CustomProgressSlider v-model="contribution" />
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
}>();

const contribution = defineModel<number>("contribution", {
   required: false,
   default: 50,
});

const avatarColor = computed(() => {
   const hsl = useStringToColor(props.name).value;
   return hsl;
});
</script>

<style scoped></style>
