<template>
   <UiThingTabs
      default-value="Projects"
      orientation="vertical"
      class="mx-auto flex w-full justify-center gap-2 flex-1"
   >
      <UiThingTabsList
         :pill="false"
         class="relative flex-col gap-1 rounded-none bg-transparent px-1 py-0 text-foreground border-l border-border items-start justify-start h-fit"
      >
         <UiThingTabsTrigger
            v-for="t in tabs"
            :key="t.title"
            :pill="false"
            :value="t.title"
            class="relative w-full justify-start after:absolute after:inset-y-0 after:start-0 after:-ms-1 after:w-0.5 hover:bg-accent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-accent"
         >
            <Icon
               v-if="t.icon"
               :name="t.icon"
               class="-ms-0.5 me-1.5 size-4 opacity-60"
            />
            {{ t.title }}
         </UiThingTabsTrigger>
      </UiThingTabsList>

      <div
         class="grow rounded border border-border text-start bg-zinc-50 dark:bg-zinc-800"
      >
         <UiThingTabsContent
            v-for="t in tabs"
            :key="t.title"
            :value="t.title"
         >
            <p class="text-pretty px-3 text-sm text-muted-foreground">
            </p>
         </UiThingTabsContent>
      </div>
   </UiThingTabs>
</template>

<script lang="ts" setup>
const tabs = ref([
   {
      title: "專利費用繳款通知單",
      content:
         "This is the overview. Here you can see the overview of the project.",
   },
   {
      title: "費用分攤協議書",
      content: "These are the number of outstanding projects.",
   },
   {
      title: "系所分攤便函",
      content: "You have a few new packages awaiting your approval.",
   },
   {
      title: "支出機關分攤表",
      content: "You have a few new packages awaiting your approval.",
   },
   {
      title: "支出科目分攤表",
      content: "You have a few new packages awaiting your approval.",
   },
] as {
   title: string
   content: string
   icon?: string
}[]);
</script>
