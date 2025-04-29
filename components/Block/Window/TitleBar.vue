<template>
   <div
      class="flex items-center w-full gap-4 window-control"
      :style="draggableStyle"
   >
      <div class="flex gap-1 h-full pl-4">
         <div class="flex-1 flex items-center justify-center">
            <div class="flex items-center gap-2 h-full">
               <div class="w-5 h-5">
                  <img
                     src="/images/logo.jpg"
                     class="w-full h-full rounded-sm"
                     width="100"
                     height="100"
                     draggable="false"
                  />
               </div>
               <div class="font-bold text-xl whitespace-nowrap">
                  高大專利系統
               </div>
               <div
                  class="bg-gray-400"
                  style="width: 1px; height: 20px"
               ></div>
               <div class="text-xs">
                  {{ version }}
               </div>
               <BlockSettingsUpdateButton rounded />
            </div>
         </div>
      </div>
      <div class="flex gap-1 ml-auto box">
         <Icon
            name="ic:round-dark-mode"
            size="20"
            @click="loopSwitchTheme"
         />
      </div>
      <div class="flex gap-1">
         <div
            class="box"
            @click="minimize"
         >
            <Icon
               name="ic:round-minus"
               size="20"
            />
         </div>
         <div
            class="box"
            @click="maximize"
         >
            <Icon
               name="material-symbols:square-outline-rounded"
               size="17"
            />
         </div>
         <div
            class="box"
            @click="close"
         >
            <Icon
               name="ic:round-close"
               size="20"
            />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
const { options, loopSwitchTheme } = useTheme();
const { close, maximize, minimize } = useElectronWindow();
const modalService = useModals();
const draggableStyle = computed(() => {
   if (modalService.modals.value.length > 0) {
      return {
         "app-region": "no-drag",
      };
   }
   return {
      "app-region": "drag",
   };
});
const { $trpc } = useNuxtApp();
const { data: version } = useAsyncData(
   "getVersion",
   async () => {
      const version = await $trpc.app.version.query();
      return `v${version}`;
   },
   {
      immediate: true,
   },
);
</script>

<style lang="css">
* {
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
}

.window-control {
   padding: 0.3rem;
   user-select: none;
}

.window-control > *{
   -webkit-app-region: no-drag;
   app-region: no-drag;
}

.box {
   height: 35px;
   width: 35px;
   border-radius: 0.35rem;
   background-color: transparent;
   display: flex;
   justify-content: center;
   align-items: center;
   cursor: pointer;
   transition: background-color 0.2s ease-in-out;
   padding: 5px;
}

.box:hover {
   background-color: rgba(231, 231, 231, 0.3);
}

.box:last-child:hover {
   background-color: rgba(255, 0, 0, 0.4);
}
</style>
