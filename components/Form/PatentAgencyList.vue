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
                     <div class="flex items-center gap-3 w-full group">
                        <Icon
                           name="ic:outline-assignment"
                           class="h-5 w-5 text-muted-foreground"
                        />
                        <span class="font-medium text-foreground">
                           {{ agency.agencyUnit.Name }}
                        </span>
                        <CustomIconButton
                           class="ml-auto mr-2 hidden group-hover:block"
                           name="ic:sharp-remove"
                           @click.stop="deleteAgencyUnit(agency.AgencyUnitID)"
                        />
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
                        v-if="isTakerAgencyUnitType(agencies[index])"
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
                           class="mt-2 grid gap-1 border border-dashed rounded-md"
                        >
                           <div
                              v-for="person in agency.agencyUnitPersons"
                              :key="person.ContactInfoID"
                              class="p-3 bg-muted/50 rounded-md flex items-center justify-between group"
                           >
                              <div class="flex items-center gap-3">
                                 <Icon
                                    name="ic:round-person"
                                    class="h-4 w-4 text-muted-foreground"
                                 />
                                 <span class="text-foreground text-lg">
                                    {{ person.contactInfo.Name }}
                                 </span>
                                 <span
                                    v-if="person.contactInfo.Role"
                                    class="text-sm text-muted-foreground"
                                 >
                                    ({{ person.contactInfo.Role }})
                                 </span>
                                 <div class="hidden group-hover:block">
                                    <CustomIconButton
                                       name="ic:sharp-remove"
                                       @click.stop="
                                          deleteContactPerson(
                                             agency.AgencyUnitID,
                                             person.ContactInfoID,
                                          )
                                       "
                                    />
                                 </div>
                              </div>
                              <div
                                 class="space-y-1 text-sm text-muted-foreground"
                              >
                                 <p
                                    v-if="person.contactInfo.Email"
                                    class="flex items-center gap-1"
                                 >
                                    <Icon
                                       name="ic:round-email"
                                       class="h-4 w-4"
                                    />
                                    {{ person.contactInfo.Email }}
                                 </p>
                                 <p
                                    v-if="person.contactInfo.PhoneNumber"
                                    class="flex items-center gap-1"
                                 >
                                    <Icon
                                       name="ic:round-phone-android"
                                       class="h-4 w-4"
                                    />
                                    {{ person.contactInfo.PhoneNumber }}
                                 </p>
                                 <p
                                    v-if="person.contactInfo.OfficeNumber"
                                    class="flex items-center gap-1"
                                 >
                                    <Icon
                                       name="ic:round-phone"
                                       class="h-4 w-4"
                                    />
                                    {{ person.contactInfo.OfficeNumber }}
                                 </p>
                                 <p v-if="person.contactInfo.Note">
                                    備註: {{ person.contactInfo.Note }}
                                 </p>
                              </div>
                           </div>
                           <div
                              class="flex justify-center items-center py-3 cursor-pointer"
                              :class="{
                                 group: !agency.agencyUnitPersons.length,
                              }"
                              @click="
                                 modals.agencyContactModal(agency.AgencyUnitID)
                              "
                           >
                              <span
                                 class="group-hover:block"
                                 :class="{
                                    hidden: !agency.agencyUnitPersons.length,
                                 }"
                              >
                                 新增或編輯聯絡人
                              </span>
                              <span
                                 class="group-hover:hidden"
                                 :class="{
                                    hidden: agency.agencyUnitPersons.length,
                                 }"
                              >
                                 無聯絡人
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
               </AccordionContent>
            </AccordionItem>
         </Accordion>
      </div>
      <div
         class="text-center py-1 text-muted-foreground cursor-pointer group flex justify-center"
         @click="modals.agencyModal()"
      >
         <div
            v-if="!agencies.length"
            class="group-hover:hidden"
         >
            未找到任何單位
         </div>
         <div
            class="items-center gap-1"
            :class="{
               'group-hover:flex hidden': !agencies.length,
               'flex': agencies.length,
            }"
         >
            <Icon
               name="ic:baseline-add"
               class="mr-2 h-4 w-4"
            />
            新增單位
         </div>
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

type PatentInitiatorAgencyUnit = NonNullable<
   NonNullable<RouterOutput["data"]["patent"]["getPatent"]>["internal"]
>["InitialReviewAgencies"][number];
type PatentTakerAgencyUnit = NonNullable<
   NonNullable<RouterOutput["data"]["patent"]["getPatent"]>["internal"]
>["TakerAgencies"][number];
type Person =
   RouterOutput["data"]["agency"]["getAgencies"][number]["Persons"][number];

const isTakerAgencyUnitType = (
   unit: PatentInitiatorAgencyUnit | PatentTakerAgencyUnit,
): unit is PatentTakerAgencyUnit => {
   return "FileCode" in unit;
};
const { open } = useModals();

const agenciesStore = useAgenciesStore();
const { agencies: agenciesInStore } = storeToRefs(agenciesStore);

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

const modals = {
   agencyModal: () =>
      open("AgencyModal", { props: { selectedAgencyUnitCallback } }),
   agencyContactModal: (agencyUnitId: number) =>
      open("AgencyModal", {
         props: {
            selectedAgencyUnitPersonCallback,
            selectingContact: {
               enable: true,
               defaultAgencyUnitId: agencyUnitId,
            },
         },
      }),
};

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

const selectedAgencyUnitPersonCallback = (person: Person) => {
   const agency = agencies.value.find(
      (agency) => agency.AgencyUnitID === person.AgencyUnitID,
   );
   if (!agency) return;
   if ((agency.agencyUnitPersonIds as number[])?.includes(person.ContactInfoID))
      return;
   (agency.agencyUnitPersonIds as number[]).push(person.ContactInfoID);
};

const deleteAgencyUnit = async (agencyUnitID: number) => {
   agencies.value = agencies.value.filter(
      (agency) => agency.AgencyUnitID !== agencyUnitID,
   );
};

const deleteContactPerson = async (
   agencyUnitID: number,
   contactInfoID: number,
) => {
   const agency = agencies.value.find(
      (agency) => agency.AgencyUnitID === agencyUnitID,
   );
   if (!agency) return;
   agency.agencyUnitPersonIds = (agency.agencyUnitPersonIds as number[]).filter(
      (id) => id !== contactInfoID,
   );
};
</script>

<style scoped>
/* Dark mode is handled by shadcn's default styling with tailwindcss */
</style>
