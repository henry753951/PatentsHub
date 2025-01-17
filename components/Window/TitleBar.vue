<template>
   <div class="flex items-center w-full gap-4 window-control">
      <div class="flex gap-1 h-full pl-4">
         <div class="flex-1 flex items-center justify-center">
            <div class="flex items-center gap-2">
               <NuxtImg
                  src="/images/logo.jpg"
                  width="21"
                  height="21"
               />
               <div class="font-bold">
                  高大專利系統
               </div>
               <div>|</div>
               <div class="text-xs">
                  v1.0.0
               </div>
            </div>
         </div>
      </div>
      <div class="flex gap-1 ml-auto box">
         <Icon
            name="ic:round-dark-mode"
            size="20"
            @click="loopSwitchTheme"
         ></Icon>
      </div>
      <div class="flex gap-1">
         <div class="box">
            <Icon
               name="ic:round-minus"
               size="20"
            ></Icon>
         </div>
         <div class="box">
            <Icon
               name="material-symbols:square-outline-rounded"
               size="17"
            ></Icon>
         </div>
         <div class="box">
            <Icon
               name="ic:round-close"
               size="20"
            ></Icon>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
const { options, loopSwitchTheme } = useTheme();
</script>

<style lang="css" scoped>
* {
   -webkit-user-select: none;
   -moz-user-select: none;
   -ms-user-select: none;
   user-select: none;
}

.window-control {
   padding: 0.3rem;
   -webkit-app-region: no-drag;
   user-select: none;
   app-region: drag;
}

.window-control > * {
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
