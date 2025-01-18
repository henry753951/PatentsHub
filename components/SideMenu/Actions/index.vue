<template>
   <div class="flex flex-col items-center gap-3 pb-6 pt-3">
      <SideMenuActionsButton
         v-for="item in items"
         :key="item.title"
         :icon="item.icon"
         :tooltip="item.title"
         @click="onItemClick(item)"
      />
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
