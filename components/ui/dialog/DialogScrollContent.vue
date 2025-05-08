<script setup lang="ts">
import { cn } from "@/lib/utils";
import { X } from "lucide-vue-next";
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
const onOpenChange = inject("onOpenChange", (value: boolean) => {
   console.warn("onOpenChange not provided", value);
});
const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
   <DialogPortal>
      <DialogOverlay
         :class="
            cn(
               'bg-black/60 fixed inset-0 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
               props.overlayClass,
               props.blur && 'backdrop-blur-sm',
            )
         "
         @click="onOpenChange(false)"
      >
         <DialogContent
            :class="
               cn(
                  'relative z-50 grid w-full max-w-lg my-8 gap-4 border border-border bg-background p-6 shadow-lg duration-200 sm:rounded-lg md:w-full',
                  props.class,
               )
            "
            v-bind="forwarded"
            @interact-outside.prevent
            @open-auto-focus.prevent
         >
            <slot />

            <DialogClose
               class="absolute top-3 right-3 p-0.5 transition-colors rounded-md hover:bg-secondary"
            >
               <X class="w-4 h-4" />
               <span class="sr-only">Close</span>
            </DialogClose>
         </DialogContent>
      </DialogOverlay>
   </DialogPortal>
</template>
