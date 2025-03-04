<template>
   <div class="flex flex-col gap-4">
      <div>
         <div>主要發明人</div>
         <BlockPatentInventorRow
            v-if="mainInventor"
            v-model:contribution="mainInventor.contribution"
            class="h-[88px]"
            :name="mainInventor.name"
            :job="mainInventor.job"
            :belong="mainInventor.belong"
         />
         <BlockPatentInventorAdd
            class="h-[88px]"
         />
      </div>
      <div>
         <div>其他發明人</div>
         <div class="flex flex-col gap-3">
            <BlockPatentInventorRow
               v-for="inventor in otherInventors"
               :key="inventor.id"
               v-model:contribution="inventor.contribution"
               :name="inventor.name"
               :job="inventor.job"
               :belong="inventor.belong"
            />
         </div>
      </div>
   </div>
</template>

<script lang="ts" setup>
import type { z } from "zod";
import type CustomZodType from "~/zod.dto";
const inventors = ref<
   {
      id: number
      isMain: boolean
      name: string
      job: string
      belong: {
         college: string
         department: string
      }
      contribution: number
   }[]
>([]);

watch(inventors, (value) => {
   formInventors.value = value.map((inventor) => ({
      inventorID: inventor.id,
      isMain: inventor.isMain,
      contribution: inventor.contribution,
   }));
});
const formInventors = defineModel({
   type: Array as PropType<
      z.infer<typeof CustomZodType.PatentInventor.shape.inventors>
   >,
   required: false,
   default: [],
});

const mainInventor = computed(() =>
   inventors.value.find((inventor) => inventor.isMain),
);

const otherInventors = computed(() =>
   inventors.value.filter((inventor) => !inventor.isMain),
);
</script>

<style scoped></style>
