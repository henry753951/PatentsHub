<template>
   <div class="space-y-2">
      <div
         v-if="agencies.length"
         class="space-y-2 rounded-lg dark:bg-zinc-900 bg-card overflow-hidden border"
      >
         <Accordion
            type="single"
            collapsible
         >
            <AccordionItem
               v-for="(agency, index) in agenciesViewData"
               :key="agency.AgencyUnitID"
               :value="index.toString()"
            >
               <AccordionTrigger
                  class="px-4 py-3 hover:bg-muted/50 border-b border-gray-100 dark:border-zinc-700"
               >
                  <div class="flex items-center justify-between w-full">
                     <div class="flex items-center gap-3">
                        <Icon
                           name="ic:outline-assignment"
                           class="h-5 w-5 text-muted-foreground"
                        />
                        <span class="font-medium text-foreground">
                           {{ agency.agencyUnit.Name }}
                        </span>
                     </div>
                  </div>
               </AccordionTrigger>
               <AccordionContent class="px-4 pt-2 pb-4">
                  <div class="space-y-4">
                     <p
                        v-if="agency.agencyUnit.Description"
                        class="text-sm text-foreground flex items-center gap-1"
                     >
                        <Icon name="ic:round-notes" />
                        <span>事務所備註: </span>
                        {{ agency.agencyUnit.Description || "無" }}
                     </p>
                     <p
                        v-if="isTakerAgencyUnitType(agencies[index]) && agencies[index].FileCode"
                        class="text-sm text-foreground flex items-center gap-1"
                     >
                        <CustomContentBlockRow
                           v-model="agencies[index].FileCode"
                           title="檔案編號"
                           icon="tabler:hash"
                        />
                     </p>

                     <div>
                        <h4 class="text-sm font-medium text-muted-foreground">
                           聯絡人
                        </h4>
                        <div
                           class="mt-2 grid gap-3 border border-dashed rounded-md"
                        >
                           <div
                              v-for="person in agency.agencyUnit.Persons"
                              :key="person.ContactInfoID"
                              class="p-3 bg-muted/50 rounded-md"
                           >
                              <div class="flex items-center gap-3">
                                 <Icon
                                    name="ic:outline-person"
                                    class="h-4 w-4 text-muted-foreground"
                                 />
                                 <span class="font-medium text-foreground">
                                    {{ person.contactInfo.Name }}
                                 </span>
                                 <span
                                    v-if="person.contactInfo.Role"
                                    class="text-sm text-muted-foreground"
                                 >
                                    ({{ person.contactInfo.Role }})
                                 </span>
                              </div>
                              <div
                                 class="mt-2 ml-7 space-y-1 text-sm text-muted-foreground"
                              >
                                 <p v-if="person.contactInfo.Email">
                                    電子郵件: {{ person.contactInfo.Email }}
                                 </p>
                                 <p v-if="person.contactInfo.PhoneNumber">
                                    電話: {{ person.contactInfo.PhoneNumber }}
                                 </p>
                                 <p v-if="person.contactInfo.OfficeNumber">
                                    辦公室電話:
                                    {{ person.contactInfo.OfficeNumber }}
                                 </p>
                                 <p v-if="person.contactInfo.Note">
                                    備註: {{ person.contactInfo.Note }}
                                 </p>
                              </div>
                           </div>
                           <div class="flex justify-center items-center py-3 group cursor-pointer">
                              <span class="group-hover:block hidden"> 新增聯絡人 </span>
                              <span class="group-hover:hidden"> 無聯絡人 </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
      <div
         v-else
         class="text-center py-8 text-muted-foreground"
      >
         未找到任何單位
      </div>
      <div class="flex justify-end w-full">
         <Button
            class="w-full sm:w-auto"
            variant="outline"
            @click="
               open('AgencyModal', { props: { selectedAgencyUnitCallback } })
            "
         >
            <Icon
               name="ic:baseline-add"
               class="mr-2 h-4 w-4"
            />
            新增單位
         </Button>
      </div>
   </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import {
   Accordion,
   AccordionItem,
   AccordionTrigger,
   AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogFooter,
   DialogHeader,
   DialogTitle,
} from "@/components/ui/dialog";

type PatentInitiatorAgencyUnit = NonNullable<
   NonNullable<RouterOutput["data"]["patent"]["getPatent"]>["internal"]
>["InitialReviewAgencies"][number];
type PatentTakerAgencyUnit = NonNullable<
   NonNullable<RouterOutput["data"]["patent"]["getPatent"]>["internal"]
>["TakerAgencies"][number];

const isTakerAgencyUnitType = (
   unit: PatentInitiatorAgencyUnit | PatentTakerAgencyUnit,
): unit is PatentTakerAgencyUnit => {
   return "FileCode" in unit;
};

const agenciesStore = useAgenciesStore();
const { agencies: agenciesInStore } = storeToRefs(agenciesStore);
const { open } = useModals();

const props = defineProps<{
   isTakerAgencyUnit: boolean
}>();
const agencies = defineModel({
   type: Array as () => (PatentInitiatorAgencyUnit | PatentTakerAgencyUnit)[],
   default: () => [],
});

const agenciesViewData = computed(() => {
   return agencies.value.map((agency) => {
      const allPersons = agenciesInStore.value.flatMap(
         (agency) => agency.Persons,
      );
      return {
         agencyUnit: agency.agencyUnit,
         isTakerAgencyUnitType: isTakerAgencyUnitType(agency),
         AgencyUnitID: agency.AgencyUnitID,
         agencyUnitPersons: allPersons.filter((person) => {
            return (agency.agencyUnitPersonIds! as number[]).includes(
               person.ContactInfoID,
            );
         }),
      };
   });
});

const selectedAgencyUnitCallback = (agencyUnit: {
   AgencyUnitID: number
   Name: string
   Description: string | null
}) => {
   if (
      agencies.value.some(
         (agency) => agency.AgencyUnitID === agencyUnit.AgencyUnitID,
      )
   ) {
      return;
   }
   agencies.value.push({
      agencyUnit: {
         // for preview only
         AgencyUnitID: agencyUnit.AgencyUnitID,
         Name: agencyUnit.Name,
         Description: agencyUnit.Description,
      },
      FileCode: props.isTakerAgencyUnit ? "" : undefined,
      AgencyUnitID: agencyUnit.AgencyUnitID, // for update
      PatentID: -1, // not used
      agencyUnitPersonIds: [], // for update
   });
};
</script>

<style scoped>
/* Dark mode is handled by shadcn's default styling with tailwindcss */
</style>
