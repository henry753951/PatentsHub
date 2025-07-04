<template>
   <UiThingContextMenu>
      <UiThingContextMenuTrigger>
         <slot />
      </UiThingContextMenuTrigger>
      <UiThingContextMenuContent
         loop
         class="w-64"
      >
         <UiThingContextMenuItem
            title="快捷操作"
            disabled
         />
         <UiThingContextMenuItem
            title="開啟"
            inset
            @select="
               open('PatentModal', {
                  props: {
                     patentId: patent.PatentID,
                     defaultPage: 'basic',
                  },
               })
            "
         />
         <UiThingContextMenuItem
            title="維護"
            inset
            @select="
               open('PatentModal', {
                  props: {
                     patentId: patent.PatentID,
                     defaultPage: 'maintenance',
                  },
               })
            "
         />
         <UiThingContextMenuItem
            title="帳務"
            inset
            @select="
               open('PatentModal', {
                  props: {
                     patentId: patent.PatentID,
                     defaultPage: 'finance',
                  },
               })
            "
         />
         <UiThingContextMenuItem
            title="紀錄"
            inset
            @select="
               open('PatentModal', {
                  props: {
                     patentId: patent.PatentID,
                     defaultPage: 'record',
                  },
               })
            "
         />
         <UiThingContextMenuSeparator />
         <UiThingContextMenuCheckboxItem
            :model-value="patent.Pinned"
            title="釘選此專利"
            inset
            @select="togglePinned"
         />
         <UiThingContextMenuSeparator />
         <UiThingContextMenuItem
            title="更多"
            disabled
         />
         <UiThingContextMenuItem
            title="進階選項"
            inset
            @select="
               open('PatentActionsModal', {
                  props: {
                     patent: {
                        PatentId: patent.PatentID,
                        title:
                           patent.Title ||
                           patent.TitleEnglish ||
                           patent.DraftTitle,
                     },
                  },
               })
            "
         />
      </UiThingContextMenuContent>
   </UiThingContextMenu>
</template>

<script lang="ts" setup>
type Patent = RouterOutput["data"]["patent"]["getPatents"][0];
const patent = inject<Ref<PatentRowType | Patent>>("patent");

const { open } = useModals();
const { $trpc } = useNuxtApp();

const togglePinned = async () => {
   if (!patent) return;
   const newPinnedState = !patent.value.Pinned;
   patent.value.Pinned = newPinnedState;
   await $trpc.data.patent.updatePatent.mutate([
      {
         patentID: patent.value.PatentID,
         data: {
            Pinned: newPinnedState,
         },
      },
   ]);
   refreshNuxtData(["patents"]);
};
</script>
