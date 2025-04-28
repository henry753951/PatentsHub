div
<template>
   <div class="h-full flex flex-col items-center outter">
      <div class="flex flex-col gap-4 items-center px-1.5">
         <BlockSideMenuToggle />
         <BlockSideMenuNavs :items="navItems" />
         <BlockSideMenuDivider />
         <BlockSideMenuNavsItem
            icon="basil:add-outline"
            title="更多"
         >
            <BlockSideMenuNavs :items="moreNavItems" />
         </BlockSideMenuNavsItem>
         <BlockSideMenuNavsItem
            icon="basil:explore-outline"
            title="Debug"
            @click="() => navigateTo({ name: 'debug' })"
         />
      </div>

      <BlockSideMenuActions
         class="mt-auto"
         :items="navActions"
      />
   </div>
</template>

<script lang="ts" setup>
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
      title: "篩選專利",
      icon: {
         normal: "basil:filter-outline",
         active: "basil:filter-solid",
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

const moreNavItems = [
   {
      title: "國家管理",
      icon: {
         normal: "solar:flag-linear",
         active: "solar:flag-bold-duotone",
      },
      to: { name: "common-countryManage" },
   },
   {
      title: "學院管理",
      icon: {
         normal: "material-symbols-light:school-outline-rounded",
         active: "material-symbols-light:school-rounded",
      },
      to: { name: "common-collegeManage" },
   },
   {
      title: "事務所管理",
      icon: {
         normal: "ph:building-office",
         active: "ph:building-office-fill",
      },
      to: { name: "common-agencyManage" },
   },
   {
      title: "方案管理",
      icon: {
         normal: "basil:chart-pie-alt-outline",
         active: "basil:chart-pie-alt-solid",
      },
      to: { name: "common-fundingPlanManage" },
   },
] as INavItem[];

const navActions = [
   {
      title: "備份",
      icon: "basil:save-outline",
      action: async () => {
         const { downloadDb } = useBackup();
         await downloadDb();
      },
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
   right: -15px;
   height: 15px;
   width: 15px;
   background-color: white;
   mask-image: radial-gradient(
      circle 15px at 100% 100%,
      transparent 0,
      transparent 15px,
      black 16px
   );
}
.dark .outter:before {
   background-color: rgb(24, 24, 27);
}
</style>
