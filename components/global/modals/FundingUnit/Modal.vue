<template>
   <div>
      <Sheet v-model:open="isOpen">
         <SheetContent
            :side="side"
            class="flex flex-col"
            @close-auto-focus.prevent
            @open-auto-focus.prevent
         >
            <SheetHeader>
               <SheetTitle> 選擇資助單位 </SheetTitle>
               <SheetDescription> 請選擇該專利的資助單位 </SheetDescription>
            </SheetHeader>
            <div class="flex-1 overflow-hidden">
               <FormFundingUnitManage
                  v-model="selectedFundingUnit"
                  :no-header="true"
               />
            </div>
            <SheetFooter>
               <Button
                  :disabled="!isFundingUnitSelected"
                  @click="select()"
               >
                  選擇該資助單位
               </Button>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   </div>
</template>

<script lang="ts" setup>
import {
   Sheet,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetDescription,
   SheetFooter,
} from "@/components/ui/sheet";
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

type FundingUnit = {
   FundingUnitID: number
   Name: string
};

const { side = "right", ...props } = defineProps<{
   side?: "left" | "right"
   selectedFundingUnitCallback?: (fundingUnit: FundingUnit) => void
}>();

// Refs
const selectedFundingUnit = ref<FundingUnit | null>(null);

// Computed
const isFundingUnitSelected = computed(() => !!selectedFundingUnit.value);

// Methods
const select = () => {
   if (selectedFundingUnit.value) {
      props.selectedFundingUnitCallback?.(selectedFundingUnit.value);
      isOpen.value = false;
   }
};
</script>

<style scoped></style>
