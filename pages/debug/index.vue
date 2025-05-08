<template>
   <div class="p-4 w-full prose dark:prose-invert space-y-2">
      <div>
         <DialogRoot>
            <DialogTrigger
               class="text-grass11 font-semibold hover:bg-mauve3 inline-flex h-[35px] items-center justify-center rounded-md bg-white px-[15px] leading-none shadow-sm focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-green8 focus:outline-none border"
            >
               Test
            </DialogTrigger>
            <DialogPortal>
               <DialogOverlay
                  class="bg-black/90 data-[state=open]:animate-overlayShow fixed inset-0"
               />
               <DialogContent
                  class="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
               >
                  <DialogTitle
                     class="text-mauve12 m-0 text-[17px] font-semibold"
                  >
                     Test
                  </DialogTitle>
                  <DialogDescription
                     class="text-mauve11 mt-[10px] mb-5 text-sm leading-normal"
                  >
                     Test
                  </DialogDescription>
                  <div>
                     <PopoverRoot>
                        <PopoverTrigger
                           class="rounded-full w-[35px] h-[35px] inline-flex items-center justify-center text-grass11 bg-white shadow-sm border hover:bg-stone-50 cursor-default focus:shadow-[0_0_0_2px] focus:shadow-black dark:focus:shadow-green8 focus:outline-none"
                           aria-label="Update dimensions"
                        >
                        </PopoverTrigger>
                        <PopoverPortal>
                           <PopoverContent
                              class="rounded-lg p-5 w-[260px] bg-white shadow-sm border will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                           >
                              <input />
                           </PopoverContent>
                        </PopoverPortal>
                     </PopoverRoot>
                  </div>
               </DialogContent>
            </DialogPortal>
         </DialogRoot>
      </div>
   </div>
</template>

<script lang="ts" setup>
import {
   PopoverAnchor,
   PopoverArrow,
   PopoverClose,
   PopoverContent,
   PopoverPortal,
   PopoverRoot,
   PopoverTrigger,
   DialogClose,
   DialogContent,
   DialogDescription,
   DialogOverlay,
   DialogPortal,
   DialogRoot,
   DialogTitle,
   DialogTrigger,
} from "reka-ui";
import { InputText } from "primevue";

definePageMeta({
   name: "debug",
});

const { open, modals } = useModals();
const { $trpc } = useNuxtApp();
</script>

<style></style>
