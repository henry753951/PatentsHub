<template>
   <div>
      <Sheet v-model:open="isOpen">
         <SheetContent
            :side="side"
            class="flex flex-col"
         >
            <SheetHeader>
               <SheetTitle>
                  {{ isAgencySelecting ? "選擇事務所" : "選擇聯絡人" }}
               </SheetTitle>
               <SheetDescription>
                  {{
                     isAgencySelecting
                        ? "請在下方選擇一個事務所"
                        : "請在下方選擇一個聯絡人"
                  }}
               </SheetDescription>
            </SheetHeader>
            <div class="flex-1 overflow-hidden">
               <FormAgencyManage
                  v-if="isAgencySelecting"
                  v-model="selectedAgencyUnit"
                  no-header
               />
               <FormAgencyContactList
                  v-else
                  :selected-agency-unit-id="selectingContact?.defaultAgencyUnitId"
                  no-header
               />
            </div>
            <div>{{ selectedAgencyUnit }}</div>
            <SheetFooter>
               <Button
                  :disabled="
                     (isAgencySelecting && !selectedAgencyUnit) ||
                        (!isAgencySelecting && !selectedAgencyUnit)
                  "
                  @click="select()"
               >
                  {{ isAgencySelecting ? "選擇該事務所" : "選擇該聯絡人" }}
               </Button>
            </SheetFooter>
         </SheetContent>
      </Sheet>
   </div>
</template>

<script lang="ts" setup>
type AgencyUnit = RouterOutput["data"]["agency"]["getAgencies"][number];
type SimplifiedAgencyUnit = Omit<
   AgencyUnit,
   "TakerPatents" | "InitialReviewPatents" | "Persons"
>;
type Person =
   RouterOutput["data"]["agency"]["getAgencies"][number]["Persons"][number];

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { side = "right", ...props } = defineProps<{
   side?: "left" | "right"
   selectingContact?: {
      defaultAgencyUnitId?: number
      enable: boolean
   }
   selectedAgencyUnitCallback?: (agencyUnit: SimplifiedAgencyUnit) => void
   selectedAgencyUnitPersonCallback?: (person: Person) => void
}>();

const isAgencySelecting = computed(() => {
   return !(
      props.selectingContact?.enable
      || (selectedAgencyUnit.value && props.selectingContact?.enable)
   );
});

// Refs
const selectedAgencyUnit = ref<AgencyUnit | null>(null);

// Methods
const select = () => {
   if (!selectedAgencyUnit.value) return;

   if (props.selectedAgencyUnitPersonCallback) {
      return;
   }
   else if (props.selectedAgencyUnitCallback) {
      props.selectedAgencyUnitCallback({
         AgencyUnitID: selectedAgencyUnit.value.AgencyUnitID,
         Name: selectedAgencyUnit.value.Name,
         Description: selectedAgencyUnit.value.Description,
      });
   }
   isOpen.value = false;
};
</script>

<style scoped></style>
