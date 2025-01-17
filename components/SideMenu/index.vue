<template>
   <div class="h-full flex flex-col items-center outter">
      <OverlayScrollbarsComponent
         :options="{ scrollbars: { autoHide: 'leave' } }"
         class="px-2 py-2"
      >
         <div class="flex flex-col gap-4 items-center">
            <SideMenuToggle />
            <SideMenuNavs :items="navItems" />
            <SideMenuDivider />
            <SideMenuNavsItem
               icon="basil:add-outline"
               title="更多"
            />
         </div>
      </OverlayScrollbarsComponent>

      <SideMenuActions
         class="mt-auto"
         :items="navActions"
      />
   </div>
</template>

<script lang="ts" setup>
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const navItems = [
   {
      title: "首頁",
      icon: {
         normal: "basil:home-outline",
         active: "basil:home-solid",
      },
      to: { name: "home" },
   },
   {
      title: "專利列表",
      icon: {
         normal: "basil:box-outline",
         active: "basil:box-solid",
      },
      to: { name: "patents-view" },
   },
   {
      title: "搜尋",
      icon: {
         normal: "basil:search-outline",
         active: "basil:search-solid",
      },
      to: { name: "search" },
   },
   {
      title: "釘選專利",
      icon: {
         normal: "basil:pin-outline",
         active: "basil:pin-solid",
      },
      to: { name: "pins" },
   },
] as INavItem[];

const navActions = [
   {
      title: "備份",
      icon: "basil:save-outline",
      action: () => {},
   },
   {
      title: "設定",
      icon: "basil:settings-outline",
      action: () => {},
   },
];
</script>

<style scoped>
* {
   user-select: none;
}

.outter {
   position: relative;
}
.outter:before {
   content: "";
   position: absolute;
   top: 0px;
   right: -20px;
   height: 20px;
   width: 20px;
   background-color: white;
   mask-image: radial-gradient(
      circle 20px at 100% 100%,
      transparent 0,
      transparent 20px,
      black 21px
   );
}
.dark .outter:before {
   background-color: rgb(24, 24, 27);
}
</style>
