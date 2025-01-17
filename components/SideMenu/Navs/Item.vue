<template>
   <div class="group flex flex-col items-center gap-0.5 cursor-pointer w-full">
      <div
         class="flex items-center justify-center px-2 py-0.5 w-full rounded-full"
         :class="iconClasses"
      >
         <Icon
            :class="isActive ? 'opacity-100' : 'opacity-80'"
            :name="icon"
            size="1.4rem"
         />
      </div>
      <div
         class="whitespace-nowrap text-xs"
         :class="isActive ? 'opacity-100' : 'opacity-60'"
      >
         {{ props.title }}
      </div>
   </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
   defineProps<{
      icon?:
        | string
        | {
           normal: string
           active: string
        }
      title?: string
      routeKey?: string
   }>(),
   {
      icon: "",
      title: "",
      routeKey: undefined,
   },
);

const router = useRouter();

// 是否為啟用狀態
const isActive = computed(() => {
   return (
      router.currentRoute.value.name === props.routeKey
      || router.currentRoute.value.path === props.routeKey
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
const icon = computed(() => {
   if (typeof props.icon === "string") {
      return props.icon;
   }
   return isActive.value ? props.icon.active : props.icon.normal;
});
</script>

<style scoped></style>
