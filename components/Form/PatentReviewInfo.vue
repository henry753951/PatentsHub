<template>
   <div class="flex gap-4">
      <FormDatePicker
         v-model="reviewDate"
         label="技推委員會日期"
      />
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
import InputNumber from "primevue/inputnumber";
import FloatLabel from "primevue/floatlabel";
const reviewDate = defineModel("reviewDate", {
   type: null as unknown as PropType<Date | null>,
   required: true,
});

const reviewNumber = defineModel("reviewNumber", {
   type: Number as PropType<number | null>,
   required: false,
});
</script>

<style scoped></style>
