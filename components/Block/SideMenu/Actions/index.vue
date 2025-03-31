<template>
   <div class="flex flex-col items-center gap-3 pb-6 pt-3">
      <div
         v-for="item in items"
         :key="item.title"
         @click="onItemClick(item)"
      >
         <BlockSideMenuActionsButton
            :icon="item.icon"
            :tooltip="item.title"
         />
      </div>
   </div>
</template>

<script lang="ts" setup>
const { items = [] } = defineProps<{
   items?: INavAction[]
}>();

const onItemClick = (item: INavItem) => {
   if (item.action) {
      item.action();
   }
};
</script>

<style scoped></style>
