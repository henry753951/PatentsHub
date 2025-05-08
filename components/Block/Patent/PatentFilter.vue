<template>
   <div class="relative flex items-center gap-2">
      <Input
         v-model="textInput"
         placeholder="搜尋專利"
         class="w-full"
      />
      <div
         v-if="textInput"
         class="absolute right-2 top-1/2 -translate-y-1/2"
      >
         <CustomIconButton
            name="ic:round-close"
            @click="textInput = ''"
         />
      </div>
   </div>
</template>

<script lang="ts" setup>
import type { z } from "zod";
const textInput = ref("");
const filter = defineModel("patent-filter", {
   type: Object as PropType<z.infer<typeof dbZ.PatentWhereInputSchema>>,
});

watchThrottled(
   textInput,
   (value) => {
      filter.value = {
         OR: [
            { Title: { contains: value } },
            { InternalID: { contains: value } },
            {
               inventors: {
                  some: {
                     inventor: {
                        contactInfo: {
                           Name: { contains: value },
                        },
                     },
                  },
               },
            },
            {
               department: {
                  Name: { contains: value },
               },
            },
         ],
      };
   },
   { throttle: 100 },
);
</script>

<style scoped></style>
