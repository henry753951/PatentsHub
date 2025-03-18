<template>
   <div class="flex gap-4">
      <FloatLabel
         variant="in"
         class="w-full"
      >
         <DatePicker
            v-model="reviewDateFormatted"
            show-icon
            fluid
            date-format="yy/mm/dd"
            icon-display="input"
            show-button-bar
            size="small"
            input-id="review-date_input"
         >
            <template #weekheaderlabel>
            </template>
         </DatePicker>
         <label for="review-date_input">技推委員會審理日期</label>
      </FloatLabel>
      <FloatLabel
         variant="in"
         class="w-full"
      >
         <InputNumber
            v-model="reviewNumber"
            prefix="第 "
            suffix=" 次技推委員會"
            show-buttons
            size="small"
            :min="1"
            fluid
            input-id="review-number_input"
         />
         <label for="review-number_input">技推委員會次數</label>
      </FloatLabel>
   </div>
</template>

<script lang="ts" setup>
import DatePicker from "primevue/datepicker";
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";
const reviewDate = defineModel("reviewDate", {
   type: String as PropType<string | Date | null>,
   required: true,
});
const reviewNumber = defineModel("reviewNumber", {
   type: Number as PropType<number | null>,
   required: true,
});

const reviewDateFormatted = computed({
   get: () => reviewDate.value ? new Date(reviewDate.value) : null,
   set: (value: Date) => {
      reviewDate.value = value.toISOString();
   },
});
</script>

<style scoped></style>
