<script setup lang="ts">
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { FieldProps } from "./interface";
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import AutoFormLabel from "./AutoFormLabel.vue";
import { beautifyObjectName } from "./utils";

defineProps<
  FieldProps & {
     options?: string[]
  }
>();
</script>

<template>
   <FormField
      v-slot="slotProps"
      :name="fieldName"
   >
      <FormItem>
         <AutoFormLabel
            v-if="!config?.hideLabel"
            :required="required"
         >
            {{ config?.label || beautifyObjectName(label ?? fieldName) }}
         </AutoFormLabel>
         <FormControl>
            <slot v-bind="slotProps">
               <RadioGroup
                  v-if="config?.component === 'radio'"
                  :disabled="disabled"
                  :orientation="'vertical'"
                  v-bind="{ ...slotProps.componentField }"
               >
                  <div
                     v-for="(option, index) in options"
                     :key="option"
                     class="mb-2 flex items-center gap-3 space-y-0"
                  >
                     <RadioGroupItem
                        :id="`${option}-${index}`"
                        :value="option"
                     />
                     <Label :for="`${option}-${index}`">{{
                        beautifyObjectName(option)
                     }}</Label>
                  </div>
               </RadioGroup>

               <Select
                  v-else-if="config?.component === 'select'"
                  :disabled="disabled"
                  v-bind="{ ...slotProps.componentField }"
               >
                  <SelectTrigger class="w-full">
                     <SelectValue
                        :placeholder="config?.inputProps?.placeholder"
                     />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem
                        v-for="option in options"
                        :key="option"
                        :value="option"
                     >
                        {{ beautifyObjectName(option) }}
                     </SelectItem>
                  </SelectContent>
               </Select>
               <Tabs
                  class="w-fulld"
                  v-bind="{ ...slotProps.componentField }"
               >
                  <TabsList
                     class="bg-zinc-200 dark:bg-zinc-900 rounded-md w-full select-none"
                  >
                     <TabsTrigger
                        v-for="option in options"
                        :key="option"
                        :value="option"
                        class="light:bg-zinc-200 rounded-md w-full"
                     >
                        {{ option }}
                     </TabsTrigger>
                  </TabsList>
               </Tabs>
            </slot>
         </FormControl>

         <FormDescription v-if="config?.description">
            {{ config.description }}
         </FormDescription>
         <FormMessage />
      </FormItem>
   </FormField>
</template>
