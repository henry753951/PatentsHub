<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from "vue-sonner";

const props = defineProps<ToasterProps>();
</script>

<template>
   <Sonner
      class="toaster group select-none"
      v-bind="props"
      offset="50px"
      :toast-options="{
         classes: {
            error: 'error group-[.toaster]:bg-red-50 group-[.toaster]:text-red-500 group-[.toaster]:border-red-200 dark:group-[.toaster]:bg-[#2d0f0f] dark:group-[.toaster]:text-red-400 dark:group-[.toaster]:border-red-800',
            success:
               'success group-[.toaster]:bg-green-50 group-[.toaster]:text-green-500 group-[.toaster]:border-green-200 dark:group-[.toaster]:bg-[#0f2d0f] dark:group-[.toaster]:text-green-400 dark:group-[.toaster]:border-green-800',
            warning:
               'warning group-[.toaster]:bg-yellow-50 group-[.toaster]:text-yellow-500 group-[.toaster]:border-yellow-200 dark:group-[.toaster]:bg-[#2d2a0f] dark:group-[.toaster]:text-yellow-400 dark:group-[.toaster]:border-yellow-800',
            info: 'info group-[.toaster]:bg-blue-50 group-[.toaster]:text-blue-500 group-[.toaster]:border-blue-200 dark:group-[.toaster]:bg-[#0f1d2d] dark:group-[.toaster]:text-blue-400 dark:group-[.toaster]:border-blue-800',
            toast: 'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border shadow-lg transition-all duration-300',
            description: 'group-[.toast]:text-muted-foreground',
            actionButton:
               'group-[.error]:!bg-red-500 group-[.success]:!bg-green-500 group-[.warning]:!bg-yellow-500 group-[.info]:!bg-blue-500 group-[.toast]:!text-white',
            cancelButton:
               'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
         },
      }"
   />
</template>

<style></style>
