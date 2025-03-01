<template>
   <div class="flex flex-col gap-6 w-full p-1">
      <template v-if="patentCreation.currentStep.value === 0">
         <h1>基本資料</h1>
         <div class="flex gap-3">
            <FormField
               v-slot="{ componentField }"
               name="draftTitle"
            >
               <FormItem
                  v-auto-animate
                  class="w-full"
               >
                  <FormLabel>專利名稱草稿</FormLabel>
                  <FormControl>
                     <Input
                        type="text"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            </FormField>
            <FormField
               v-slot="{ componentField }"
               name="year"
            >
               <FormItem v-auto-animate>
                  <FormLabel>年度</FormLabel>
                  <FormControl>
                     <Input
                        type="text"
                        placeholder="113"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            </FormField>
            <FormField
               v-slot="{ componentField }"
               name="internalID"
            >
               <FormItem v-auto-animate>
                  <FormLabel>校內編號</FormLabel>
                  <FormControl>
                     <Input
                        type="text"
                        placeholder="11401"
                        v-bind="componentField"
                     />
                  </FormControl>
                  <FormMessage />
               </FormItem>
            </FormField>
         </div>
         <FormField
            v-slot="{ componentField }"
            name="type"
         >
            <FormItem v-auto-animate>
               <FormLabel>專利類型</FormLabel>
               <TabsInput
                  v-bind="componentField"
                  :options="[
                     {
                        value: 'INVENTION',
                        label: '發明專利',
                     },
                     {
                        value: 'UTILITY_MODEL',
                        label: '新型專利',
                     },
                     {
                        value: 'DESIGN',
                        label: '設計專利',
                     },
                     {
                        value: 'PLANT',
                        label: '植物專利',
                     },
                  ]"
               />
               <FormDescription v-if="componentField.modelValue === 'PLANT'">
                  植物專利是美國額外的專利類型
               </FormDescription>
            </FormItem>
         </FormField>

         <div class="grid grid-cols-2 gap-3">
            <FormField
               v-slot="{ componentField }"
               name="belongs.collegeID"
            >
               <FormItem v-auto-animate>
                  <FormLabel>學院</FormLabel>
                  <Input
                     type="number"
                     v-bind="componentField"
                  />
               </FormItem>
            </FormField>
            <FormField
               v-slot="{ componentField }"
               name="belongs.departmentID"
            >
               <FormItem v-auto-animate>
                  <FormLabel>系所</FormLabel>
                  <Input
                     type="number"
                     v-bind="componentField"
                  />
               </FormItem>
            </FormField>
         </div>
         <h1>技術</h1>
         <div class="flex gap-3">
            <FormField
               v-slot="{ componentField }"
               name="technical.keywords"
            >
               <FormItem
                  v-auto-animate
                  class="w-full"
               >
                  <FormLabel>技術關鍵字</FormLabel>
                  <TagsInput
                     class="min-h-10"
                     @update:model-value="componentField['onUpdate:modelValue']"
                  >
                     <TagsInputItem
                        v-for="item in componentField.modelValue"
                        :key="item"
                        :value="item"
                     >
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                     </TagsInputItem>

                     <TagsInputInput placeholder="關鍵字..." />
                  </TagsInput>
               </FormItem>
            </FormField>
            <FormField
               v-slot="{ componentField }"
               name="technical.maturityLevel"
            >
               <FormItem v-auto-animate>
                  <FormLabel>技術成熟度TRL</FormLabel>
                  <Input v-bind="componentField" />
               </FormItem>
            </FormField>
         </div>
      </template>
      <template v-else-if="patentCreation.currentStep.value === 1">
      </template>
      <div>{{ patentCreation.values }}</div>
   </div>
</template>

<script lang="ts" setup>
import {
   TagsInput,
   TagsInputInput,
   TagsInputItem,
   TagsInputItemDelete,
   TagsInputItemText,
} from "@/components/ui/tags-input";
import { TabsInput } from "~/components/ui/tabs";

const patentCreation = usePatent().useCreation();

const form = {
   title: patentCreation.defineField("draftTitle"),
};

defineExpose({
   patentCreation,
});
</script>

<style scoped>
h1 {
   font-size: 1.5rem;
   font-weight: 600;
}
</style>
