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
import { type SheetVariants, sheetVariants } from ".";
const onOpenChange = inject("onOpenChange", (value: boolean) => {
   console.warn("onOpenChange not provided", value);
});

interface SheetContentProps extends DialogContentProps {
   class?: HTMLAttributes["class"]
   side?: SheetVariants["side"]
   overlayClass?: HTMLAttributes["class"]
   blur?: boolean
}

defineOptions({
   inheritAttrs: false,
});

const props = defineProps<SheetContentProps>();

const emits = defineEmits<DialogContentEmits>();

const delegatedProps = computed(() => {
   const { class: _, side, ...delegated } = props;

   return delegated;
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
      />
      <DialogContent
         :class="cn(sheetVariants({ side }), props.class)"
         v-bind="{ ...forwarded, ...$attrs }"
         @interact-outside.prevent
         @open-auto-focus.prevent
      >
         <slot />

         <DialogClose
            class="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
         >
            <X class="w-4 h-4 text-muted-foreground" />
         </DialogClose>
      </DialogContent>
   </DialogPortal>
</template>
