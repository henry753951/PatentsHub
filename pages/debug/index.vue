<template>
   <div class="p-4 w-full prose dark:prose-invert space-y-2">
      <div>
         <h2>現有 Modals</h2>
         {{ modals }}
      </div>

      <div>
         <h2>專利 UI</h2>
         <div class="flex gap-2">
            <Button
               @click="
                  open('PatentCreateModal', {
                     props: {},
                  })
               "
            >
               建立專利
            </Button>
            <Button
               @click="
                  open('PatentModal', {
                     props: {
                        patentId: 1,
                     },
                  })
               "
            >
               瀏覽專利
            </Button>
            <Button
               @click="
                  open('Example2Modal', {
                     id: '1234',
                  })
               "
            >
               測試 Modal
            </Button>
         </div>
      </div>
      <div class="grid grid-cols-1 gap-4">
         <BlockPatentInventorRow
            class="h-[88px]"
            name="XXX"
            job="XX"
            :belong="{
               college: 'college',
               department: 'department',
            }"
         />
         <BlockPatentInventorEditList />
      </div>
      <div>
         <Button @click="open('ReminderRecentlyModal', { props: {} })">
            近期維護的專利
         </Button>
         <BlockPatentReminderStatus />
      </div>
   </div>
</template>

<script lang="ts" setup>
definePageMeta({
   name: "debug",
});

const { open, modals } = useModals();
const { $trpc } = useNuxtApp();
</script>

<style></style>
