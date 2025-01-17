<template>
   <div class="flex flex-col items-center gap-3 pb-6 pt-3">
      <SideMenuActionsButton
         v-for="item in props.items"
         :key="item.title"
         :icon="item.icon"
         :tooltip="item.title"
         @click="onItemClick(item)"
      />
   </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
   defineProps<{
      items?: INavAction[]
   }>(),
   {
      items: () => [] as INavAction[],
   },
);

const onItemClick = (item: INavItem) => {
   if (item.action) {
      item.action();
   }
};
</script>

<style scoped></style>
