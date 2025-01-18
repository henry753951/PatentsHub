<template>
   <div class="flex flex-col items-center gap-4">
      <SideMenuNavsItem
         v-for="item in items"
         :key="item.title"
         :icon="item.icon"
         :title="item.title"
         :route-key="item.to?.name?.toString() ?? item.to?.path"
         @click="onItemClick(item)"
      />
   </div>
</template>

<script lang="ts" setup>
const { items = [] } = defineProps<{
   items?: INavItem[]
}>();

const onItemClick = (item: INavItem) => {
   if (item.action) {
      item.action();
   }
   if (item.to) {
      navigateTo(item.to);
   }
};
</script>

<style scoped></style>
