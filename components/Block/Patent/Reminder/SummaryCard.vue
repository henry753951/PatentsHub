<template>
   <div
      class="border rounded-xl p-3 shadow flex justify-between items-center gap-4 transition-all duration-200 ease-in-out"
      :class="cardClass"
   >
      <div>
         <div class="flex justify-between items-start gap-5">
            <h3 class="text-zinc-700 dark:text-zinc-300 font-medium text-sm">
               {{ title }}
            </h3>
         </div>
         <p class="text-zinc-500 dark:text-zinc-400 text-xs mt-2">
            {{ description }}
         </p>
      </div>
      <div class="flex items-center gap-4">
         <p
            class="text-2xl font-bold mt-1"
            :class="valueClass"
         >
            {{ value }}
         </p>
         <div
            class="p-2 rounded-lg aspect-ratio-1/1 flex items-center justify-center"
            :class="iconBgClass"
         >
            <Icon
               :name="icon"
               :class="iconClass"
            />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
   title: string
   value: any
   description: string
   type?: string
}>();

const icon = computed(() => {
   switch (props.type) {
      case "danger":
         return "heroicons-solid:exclamation-triangle";
      case "warning":
         return "heroicons-solid:exclamation-circle";
      default:
         return "heroicons-solid:information-circle";
   }
});

const iconClass = computed(() => {
   switch (props.type) {
      case "danger":
         return "text-red-500 dark:text-red-400";
      case "warning":
         return "text-yellow-500 dark:text-yellow-400";
      default:
         return "text-zinc-700 dark:text-zinc-300";
   }
});

const iconBgClass = computed(() => {
   switch (props.type) {
      case "danger":
         return "bg-red-500/10 dark:bg-red-400/10";
      case "warning":
         return "bg-yellow-500/10 dark:bg-yellow-400/10";
      default:
         return "bg-zinc-700/10 dark:bg-zinc-300/10";
   }
});

const cardClass = computed(() => {
   switch (props.type) {
      case "danger":
         return [
            "bg-gradient-to-br from-red-50/80 to-red-100/60 dark:from-red-950/30 dark:to-red-900/20  border-red-200/60 dark:border-red-900/20",
            "hover:from-red-80/90 hover:to-red-100/70 dark:hover:from-red-950/40 dark:hover:to-red-900/30 hover:shadow-lg",
         ];
      case "warning":
         return [
            "bg-gradient-to-br from-yellow-50/80 to-yellow-100/60 dark:from-yellow-950/30 dark:to-yellow-900/20  border-yellow-200/60 dark:border-yellow-900/20",
            "hover:from-yellow-80/90 hover:to-yellow-100/70 dark:hover:from-yellow-950/40 dark:hover:to-yellow-900/30 hover:shadow-lg",
         ];
      default:
         return [
            "bg-gradient-to-br from-zinc-50/80 to-zinc-100/60 dark:from-zinc-950/30 dark:to-zinc-900/20  border-zinc-200/60 dark:border-zinc-900/20",
            "hover:from-zinc-80/90 hover:to-zinc-100/70 dark:hover:from-zinc-950/40 dark:hover:to-zinc-900/30 hover:shadow-lg",
         ];
   }
});

const valueClass = computed(() => {
   switch (props.type) {
      case "danger":
         return "text-red-500 dark:text-red-400";
      case "warning":
         return "text-yellow-500 dark:text-yellow-400";
      default:
         return "text-zinc-700 dark:text-zinc-300";
   }
});
</script>

<style scoped></style>
