<template>
   <UiThingTabs
      default-value="Projects"
      orientation="vertical"
      class="mx-auto flex w-full justify-center min-h-[340px] gap-2"
   >
      <UiThingTabsList
         :pill="false"
         class="h-auto flex-col gap-1 py-0 justify-start"
      >
         <UiThingTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :pill="false"
            :value="t.title"
            class="w-full justify-start data-[state=active]:bg-muted data-[state=active]:shadow-none"
         >
            <Icon
               :name="t.icon"
               class="mr-2 h-4 w-4"
            />
            {{ t.title }}
         </UiThingTabsTrigger>
      </UiThingTabsList>

      <div className="grow rounded-lg border border-border text-start px-3">
         <UiThingTabsContent
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
         >
            <p class="text-pretty text-sm text-muted-foreground">
               {{ t.content }}
            </p>
            <component
               :is="t.component"
               v-if="t.component"
            />
         </UiThingTabsContent>
      </div>
   </UiThingTabs>
</template>

<script lang="ts" setup>
import type { Component } from "vue";
import Version from "./Tabs/Version.vue";

interface Tab {
   title: string
   icon: string
   component: Component | null
   content: string | null
}
const tabs = ref<Tab[]>([
   {
      title: "一般",
      icon: "lucide:settings",
      component: null,
      content: null,
   },
   {
      title: "資料與備份",
      icon: "lucide:database",
      component: null,
      content: null,
   },
   {
      title: "自定義腳本",
      icon: "lucide:code",
      component: null,
      content:
         "讓你可以與執行開發者的雲端腳本等等，例如更新資料庫架構、 修正錯誤等等。",
   },
   {
      title: "版本與更新",
      icon: "lucide:box",
      component: Version,
      content: null,
   },
]);
</script>

<style scoped></style>
