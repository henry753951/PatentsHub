<template>
   <div class="p-3">
      <DataTable
         class="rounded-lg overflow-hidden"
         :value="logs"
         table-style="min-width: 50rem"
      >
         <Column
            field="id"
            header="代號"
         >
         </Column>
         <Column
            field="type"
            header="類別"
         >
         </Column>
         <Column
            field="message"
            header="訊息"
         >
         </Column>
         <Column
            field="object"
            header="來自"
         >
         </Column>
         <Column
            field="timestamp"
            header="時間"
         >
         </Column>
         <template #loading>
         </template>
      </DataTable>
   </div>
</template>

<script lang="ts" setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
definePageMeta({
   name: "debug-logs",
});

const appStore = useAppStore();
const { logs } = storeToRefs(appStore);
</script>

<style scoped></style>
