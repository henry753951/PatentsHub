<template>
   <div class="p-4 w-full prose dark:prose-invert">
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
            @click="
               open('PatentCreateModal', {
                  id: '123',
                  props: {},
               })
            "
         >
            Open Sheet
         </Button>
         <Button
            @click="
               open('Example2Modal', {
                  id: '1234',
               })
            "
         >
            Open Sheet
         </Button>
         <BlockPatentRow
            name="hi"
            :expiry-date="'2025/01/30'"
            author="me"
         />
      </div>
      <BlockPatentInventorEditList />
   </div>
</template>

<script lang="ts" setup>
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
