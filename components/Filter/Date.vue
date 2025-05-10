<template>
   <div class="w-fit">
      <DatePicker
         v-bind="$attrs"
         inline
         :show-button-bar="true"
         date-format="yy-mm-dd"
         :panel-style="{ backgroundColor: 'transparent', border: 'none' }"
         :pt="{
            header: {
               style: {
                  backgroundColor: 'transparent',
                  border: 'none',
               },
            },
         }"
      >
      </DatePicker>
   </div>
</template>

<script lang="ts" setup>
import { DatePicker } from "primevue";
</script>

<style scoped></style>
