<script setup lang="ts">
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import type { CalendarDate } from "@internationalized/date";
import {
   DateFormatter,
   getLocalTimeZone,
   CalendarDateTime,
   fromDate,
   toCalendarDate,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import AutoFormLabel from "./AutoFormLabel.vue";
import { beautifyObjectName } from "./utils";
import { ref, watch } from "vue";

const model = defineModel<Date | undefined>();

const props = defineProps<{
   fieldName: string
   label?: string
   required?: boolean
   disabled?: boolean
   config?: {
      label?: string
      description?: string
      hideLabel?: boolean
   }
}>();

const df = new DateFormatter("zh-TW", {
   dateStyle: "long",
});

const internalDate = ref<CalendarDate | undefined>();
watch(
   () => model.value,
   (val) => {
      if (val instanceof Date && !isNaN(val.getTime())) {
         try {
            internalDate.value = toCalendarDate(fromDate(val, getLocalTimeZone()));
         }
         catch {
            internalDate.value = undefined;
         }
      }
      else {
         internalDate.value = undefined;
      }
   },
   { immediate: true },
);

const handleUpdate = (val: CalendarDate | undefined) => {
   internalDate.value = val;
   const jsDate = val
      ? new CalendarDateTime(
         val.calendar,
         val.era,
         val.year,
         val.month,
         val.day,
         0,
         0,
         0,
         0,
      ).toDate(getLocalTimeZone())
      : undefined;
   model.value = jsDate;
};
</script>

<template>
   <FormField :name="props.fieldName">
      <FormItem>
         <AutoFormLabel
            v-if="!props.config?.hideLabel"
            :required="props.required"
         >
            {{ props.config?.label || beautifyObjectName(props.label ?? props.fieldName) }}
         </AutoFormLabel>
         <FormControl>
            <div>
               <Popover>
                  <PopoverTrigger
                     as-child
                     :disabled="props.disabled"
                  >
                     <Button
                        variant="outline"
                        :class="cn(
                           'w-full justify-start text-left font-normal',
                           !internalDate && 'text-muted-foreground',
                        )"
                     >
                        <CalendarIcon
                           class="mr-2 h-4 w-4"
                           :size="16"
                        />
                        {{
                           internalDate
                              ? df.format(
                                 new CalendarDateTime(
                                    internalDate.calendar,
                                    internalDate.era,
                                    internalDate.year,
                                    internalDate.month,
                                    internalDate.day,
                                    0,
                                    0,
                                    0,
                                    0
                                 ).toDate(getLocalTimeZone())
                              )
                              : "選擇日期"
                        }}
                     </Button>
                  </PopoverTrigger>
                  <PopoverContent class="w-auto p-0">
                     <Calendar
                        :value="internalDate"
                        @update:value="handleUpdate"
                     />
                  </PopoverContent>
               </Popover>
            </div>
         </FormControl>

         <FormDescription v-if="props.config?.description">
            {{ props.config.description }}
         </FormDescription>
         <FormMessage />
      </FormItem>
   </FormField>
</template>
