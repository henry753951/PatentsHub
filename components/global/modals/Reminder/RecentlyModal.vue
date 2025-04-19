<template>
   <div>
      <Sheet v-model:open="isOpen">
         <SheetContent class="!max-w-[900px]">
            <SheetHeader>
               <SheetTitle>近期維護的專利</SheetTitle>
               <SheetDescription>
                  下方為最近 {{ days }} 天內維護過的專利
               </SheetDescription>
            </SheetHeader>
            <div class="flex flex-col gap-2 my-2">
               <div
                  v-for="patent in patents"
                  :key="patent.PatentID"
                  class="flex flex-col gap-2"
               >
                  <BlockPatentRow
                     :patent="patent"
                     @click="
                        open('PatentModal', {
                           props: {
                              patentId: patent.PatentID,
                           },
                        })
                     "
                  />
                  <div class="text-sm text-gray-500 ml-auto">
                     於 {{ format(getMaintenanceDate(patent), "yyyy/MM/dd") }} 維護
                  </div>
               </div>
            </div>
         </SheetContent>
      </Sheet>
   </div>
</template>

<script lang="ts" setup>
import { format } from "date-fns";
const { open } = useModals();
const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const { days = 30 } = defineProps<{
   days?: number
}>();

const { $trpc } = useNuxtApp();
const { data: patents, refresh } = await useAsyncData(
   "recently-patents-" + days,
   async () => {
      return await $trpc.data.patent.getPatents.query({
         maintenances: {
            some: {
               MaintenanceDate: {
                  gte: new Date(
                     new Date().getTime() - days * 24 * 60 * 60 * 1000,
                  ),
               },
            },
         },
      });
   },
);

const getMaintenanceDate = (
   patent: RouterOutput["data"]["patent"]["getPatents"][0],
) => {
   return patent.maintenances.toSorted((a, b) => {
      return (
         new Date(b.MaintenanceDate).getTime()
           - new Date(a.MaintenanceDate).getTime()
      );
   })[0].MaintenanceDate;
};
</script>

<style scoped></style>
