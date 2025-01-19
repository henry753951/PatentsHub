<template>
   <div class="p-4 w-full prose">
      <div>
         <h2>現有 Modals</h2>
         {{ modals }}
      </div>
      <div>
         <h2>測試資料庫</h2>
         <div class="flex gap-2">
            <Button @click="refresh()">
               Refresh
            </Button>
            <Button @click="insert()">
               Insert
            </Button>
            <Button @click="clear()">
               Clear
            </Button>
         </div>
         <p>{{ data }}</p>
      </div>
      <div>
         <h2>專利 UI</h2>
         <Button
            @click="open('PatentCreateModal', { props: { side: 'bottom' } })"
         >
            Open Sheet
         </Button>
         <PatentRow
            name="hi"
            :expiry-date="'2025/01/30'"
            author="me"
         />
      </div>
   </div>
</template>

<script lang="ts" setup>
import type { SideMenu } from "#components";

definePageMeta({
   name: "debug",
});

const { open, modals } = useModals();
const { $trpc } = useNuxtApp();

const { data, refresh } = useAsyncData("getGreetings", async () => {
   const data = await $trpc.test.testDB.getAllContries.query();
   consola.info("Fetching data", data);
   return data;
});

const insert = async () => {
   const data = await $trpc.test.testDB.insertCountry.mutate({
      CountryName: "India",
      ISOCode: "IN",
   });
   consola.info("Inserting data", data);
   refresh();
};

const clear = async () => {
   const data = await $trpc.test.testDB.clearCountries.mutate();
   consola.info("Clearing data", data);
   refresh();
};
</script>

<style></style>
