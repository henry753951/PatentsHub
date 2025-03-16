<template>
   <div class="relative w-full group/main">
      <div
         class="group flex flex-col items-center gap-0.5 cursor-pointer w-full"
      >
         <div
            class="flex items-center justify-center px-2 py-0.5 w-full rounded-full"
            :class="iconClasses"
         >
            <Icon
               :class="isActive ? 'opacity-100' : 'opacity-80'"
               :name="iconName"
               size="1.4rem"
            />
         </div>
         <div
            class="whitespace-nowrap text-xs"
            :class="isActive ? 'opacity-100' : 'opacity-60'"
         >
            {{ title }}
         </div>
      </div>
      <div
         v-if="$slots.default"
         class="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-[calc(80%)] z-[10] transition-all duration-200 ps-3"
         :class="['group-hover/main:opacity-100 opacity-0','group-hover/main:translate-x-[calc(100%)]']"
      >
         <div
            class="p-2 rounded-lg bg-white dark:bg-zinc-800 shadow-lg flex flex-col gap-2"
         >
            <slot name="default" />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
const {
   icon = "basil:add-outline",
   title = "",
   routeKey = "",
} = defineProps<{
   icon?:
     | string
     | {
        normal: string
        active: string
     }
   title?: string
   routeKey?: string
}>();

const router = useRouter();

// 是否為啟用狀態
const isActive = computed(() => {
   return (
      router.currentRoute.value.name === routeKey
      || router.currentRoute.value.path === routeKey
   );
});

// icon 啟用與否的樣式
const iconClasses = computed(() => {
   const orgin = tw`group-hover:bg-zinc-200 dark:group-hover:bg-zinc-800`;
   if (isActive.value) {
      return `${orgin} bg-stone-100 dark:bg-zinc-800`;
   }
   return orgin;
});

// icon 啟用與否的圖示
const iconName = computed(() => {
   if (typeof icon === "string") {
      return icon;
   }
   return isActive.value ? icon.active : icon.normal;
});
</script>

<style scoped></style>
