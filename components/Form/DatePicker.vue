<template>
   <FloatLabel
      v-if="label"
      variant="in"
   >
      <DatePicker
         v-model="dateFormatted"
         show-icon
         fluid
         date-format="yy/mm/dd"
         icon-display="input"
         show-button-bar
         size="small"
         input-id="date_input"
         :min-date="minDate"
         :max-date="maxDate"
      >
         <template #weekheaderlabel>
         </template>
      </DatePicker>
      <label for="date_input">
         {{ label }}
      </label>
   </FloatLabel>
   <DatePicker
      v-else
      v-model="dateFormatted"
      show-icon
      fluid
      date-format="yy/mm/dd"
      icon-display="input"
      show-button-bar
      size="small"
      :min-date="minDate"
      :max-date="maxDate"
   >
      <template #weekheaderlabel>
      </template>
   </DatePicker>
</template>

<script lang="ts" setup>
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";

const date = defineModel({
   type: null,
   required: true,
});

const props = defineProps({
   label: {
      type: String,
      required: false,
      default: undefined,
   },
   minDate: {
      type: Date,
      required: false,
      default: undefined,
   },
   maxDate: {
      type: Date,
      required: false,
      default: undefined,
   },
});

const dateFormatted = computed({
   get: () => (date.value ? new Date(date.value as any) : null),
   set: (value: Date | string | null) => {
      if (typeof value === "string") {
         date.value = new Date(value);
      }
      else if (value instanceof Date) {
         date.value = value;
      }
      else {
         date.value = null;
      }
   },
});
</script>

<style scoped></style>
