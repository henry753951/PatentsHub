<template>
   <Combobox
      v-model="keywords"
      v-model:open="open"
      :ignore-filter="true"
   >
      <ComboboxAnchor as-child>
         <TagsInput
            v-model="keywords"
            class="min-h-10"
         >
            <TagsInputItem
               v-for="item in keywords"
               :key="item.KeywordID"
               :value="item.Keyword"
            >
               <TagsInputItemText />
               <TagsInputItemDelete
                  @click.prevent="keywords.splice(keywords.indexOf(item), 1)"
               />
            </TagsInputItem>
            <ComboboxInput
               v-model="searchTerm"
               as-child
            >
               <TagsInputInput
                  placeholder="輸入關鍵字"
                  class="w-full p-0 border-none focus-visible:ring-0 h-auto shadow-none"
                  @keydown.enter.prevent="handleEnter()"
                  @click="
                     open = true;
                     keywordsAsyncData.refresh();
                  "
               />
            </ComboboxInput>
         </TagsInput>
      </ComboboxAnchor>
      <ComboboxList class="w-[--reka-popper-anchor-width] max-h-[20rem]">
         <ComboboxEmpty>
            <div>
               <div class="text-lg">
                  無符合條件
               </div>
               <div class="text-gray-500 dark:text-gray-400">
                  直接 <Tag>Enter</Tag> 可新增
               </div>
            </div>
         </ComboboxEmpty>
         <ComboboxGroup>
            <ComboboxItem
               v-for="keyword in filteredKeywords"
               :key="keyword.Keyword"
               :value="keyword"
               @select.prevent="
                  handleEnter({
                     Keyword: keyword.Keyword,
                     KeywordID: keyword.KeywordID,
                  })
               "
               @click.self.prevent
            >
               <div
                  class="flex items-center justify-between w-full group/item z-[6]"
               >
                  <div>{{ keyword.Keyword }}</div>
                  <div
                     class="text-xs bg-gray-200 dark:bg-zinc-600 p-1 rounded-full flex items-center justify-center opacity-0 transition-opacity"
                     :class="{
                        'group-hover/item:opacity-40 cursor-not-allowed':
                           keyword._count.patentTechnicalAttributes,
                        ' group-hover/item:opacity-100 cursor-pointer':
                           !keyword._count.patentTechnicalAttributes,
                     }"
                     @click.stop
                  >
                     <Icon
                        name="ic:baseline-close"
                        size="12"
                        @click="deleteKeyword(keyword.KeywordID)"
                     />
                  </div>
               </div>
            </ComboboxItem>
         </ComboboxGroup>
      </ComboboxList>
   </Combobox>
</template>

<script lang="ts" setup>
import {
   Combobox,
   ComboboxAnchor,
   ComboboxEmpty,
   ComboboxGroup,
   ComboboxInput,
   ComboboxItem,
   ComboboxList,
} from "@/components/ui/combobox";
import {
   TagsInput,
   TagsInputInput,
   TagsInputItem,
   TagsInputItemDelete,
   TagsInputItemText,
} from "@/components/ui/tags-input";
import Tag from "primevue/tag";

const keywords = defineModel({
   type: Array as PropType<{ Keyword: string, KeywordID: number }[]>,
   required: true,
});

const keywordsAsyncData = useAsyncData(async () => {
   const { $trpc } = useNuxtApp();
   const data = await $trpc.data.patent.getKeywords.query({});
   return data;
});

const filteredKeywords = computed(() => {
   if (!keywordsAsyncData.data.value) return [];
   const search = searchTerm.value.toLowerCase();
   return keywordsAsyncData.data.value.filter(
      (keyword) =>
         keyword.Keyword.toLowerCase().includes(search)
         && !keywords.value.some((k) => k.Keyword === keyword.Keyword),
   );
});

const searchTerm = ref("");
const open = ref(false);

const handleEnter = async (
   keyword:
     | { Keyword: string, KeywordID: number }
     | undefined = filteredKeywords.value.find(
      (k) => k.Keyword === searchTerm.value,
   ),
) => {
   if (searchTerm.value === "" && !keyword) return;
   if (keywords.value.some((k) => k.Keyword === searchTerm.value)) return;

   if (keyword) {
      keywords.value.push(keyword);
      searchTerm.value = "";
   }
   else {
      const { $trpc } = useNuxtApp();
      const data = await $trpc.data.patent.createKeyword.mutate({
         keyword: searchTerm.value,
      });
      await keywordsAsyncData.refresh();
      keywords.value.push({ Keyword: data.Keyword, KeywordID: data.KeywordID });
      searchTerm.value = "";
   }
};

const deleteKeyword = async (keywordID: number) => {
   const { $trpc } = useNuxtApp();
   await $trpc.data.patent.deleteKeyword.mutate({ keywordID });
   keywords.value = keywords.value.filter((k) => k.KeywordID !== keywordID);
   keywordsAsyncData.refresh();
};
</script>

<style scoped></style>
