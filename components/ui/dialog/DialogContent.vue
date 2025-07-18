<script setup lang="ts">
import { cn } from "@/lib/utils";
import { X } from "lucide-vue-next";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
   DialogClose,
   DialogContent,
   type DialogContentEmits,
   type DialogContentProps,
   DialogOverlay,
   DialogPortal,
   useForwardPropsEmits,
} from "reka-ui";
import { computed, type HTMLAttributes } from "vue";
const onOpenChange = inject("onOpenChange", (value: boolean) => {
   console.warn("onOpenChange not provided", value);
});

const props = defineProps<
  DialogContentProps & {
     class?: HTMLAttributes["class"]
     overlayClass?: HTMLAttributes["class"]
     blur?: boolean
  }
>();
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
   const { class: _, ...delegated } = props;

   return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
   <DialogPortal>
      <DialogOverlay
         :class="
            cn(
               'bg-black/60 dark:bg-zinc-900/60 fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
               props.overlayClass,
               props.blur && 'backdrop-blur-sm',
            )
         "
         @click="onOpenChange(false)"
      />
      <DialogContent
         v-bind="forwarded"
         :class="
            cn(
               'max-h-[calc(100vh-4rem)] overflow-auto fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
               props.class,
               'bg-white dark:bg-zinc-950',
            )
         "
         @interact-outside.prevent
         @open-auto-focus.prevent
      >
         <slot />

         <DialogClose
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
         >
            <X class="w-4 h-4" />
            <span class="sr-only">Close</span>
         </DialogClose>
      </DialogContent>
   </DialogPortal>
</template>
