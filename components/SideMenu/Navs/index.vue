<template>
   <div class="flex flex-col items-center gap-4">
      <SideMenuNavsItem
         v-for="item in props.items"
         :key="item.title"
         :icon="item.icon"
         :title="item.title"
         :route-key="item.to?.name?.toString() ?? item.to?.path"
         @click="onItemClick(item)"
      />
   </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
   defineProps<{
      items?: INavItem[]
   }>(),
   {
      items: () => [] as INavItem[],
   },
);

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
