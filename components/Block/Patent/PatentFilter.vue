<template>
   <div>
      <Input
         v-model="textInput"
         placeholder="搜尋專利"
         class="w-full"
      />
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
         ],
      };
   },
   { throttle: 100 },
);
</script>

<style scoped></style>
