<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { useModals } from "~/composables/useModals";
import type { Config } from "~/components/ui/auto-form/interface";
import LiaisonManage from "./LiaisonManage.vue";
// 定義模式和欄位
type Country = RouterOutput["data"]["country"]["getAllContries"][0];

// 載入初始資料
onMounted(async () => {
   await countriesStore.refresh();
});
// 勾選模式狀態
const isSelectionMode = ref(false);
const selectedCountries = ref<Set<Country>>(new Set());

// Pinia store
const countriesStore = useCountriesStore();
const { countries } = storeToRefs(countriesStore);

const schemas = {
   country: z.object({
      countryname: z
         .string({ required_error: "國家名稱不可為空" })
         .nonempty("國家名稱不可為空"),
      isocode: z
         .string({ required_error: "ISO 代碼不可為空" })
         .nonempty("ISO 代碼不可為空"),
   }),
};

const fields = {
   country: {
      countryname: {
         label: "國家名稱",
      },
      isocode: {
         label: "ISO 代碼(需用兩碼代碼，如 TW)",
      },
   } as Config<z.infer<typeof schemas.country>>,
};

// 新增國家
const addCountry = async (
   data: z.infer<typeof schemas.country>,
   passthrough: any,
) => {
   await countriesStore.insert(data.countryname, data.isocode);
};

// 編輯國家
const editCountryByCard = (country: Country) => {
   openAutoModal(
      "編輯國家",
      "編輯國家資訊",
      schemas.country,
      editCountry,
      fields.country,
      { countryID: country.CountryID },
      {
         countryname: country.CountryName,
         isocode: country.ISOCode || "",
      },
   );
};
const editCountry = async (
   data: z.infer<typeof schemas.country>,
   passthrough: { countryID: number },
) => {
   await countriesStore.updateCountry(
      passthrough.countryID,
      data.countryname,
      data.isocode,
   );
};
// 刪除單個國家
const deleteCountry = async (data: any, passthrough: { countryID: number }) => {
   await countriesStore.delete(passthrough.countryID);
};

// 刪除選擇的多個國家
const deleteSelectedCountries = async () => {
   for (const country of selectedCountries.value) {
      await deleteCountry({}, { countryID: country.CountryID });
   }
   selectedCountries.value.clear();
   await countriesStore.refresh(); // 確保狀態被正確更新
};

// 刪除所有國家
const deleteAllCountries = async () => {
   await countriesStore.clearCountries();
};

// 使用模態框
const { openAutoModal } = useModals();

// 檢查國家是否被選中
const isSelected = (country: Country) => {
   return selectedCountries.value.has(country);
};

// 選擇或取消選擇國家
const toggleCountrySelection = (country: Country) => {
   if (isSelected(country)) {
      selectedCountries.value.delete(country);
   } else {
      selectedCountries.value.add(country);
   }
};
</script>

<template>
   <div class="px-8 py-2.5 bg-gray-100 overflow-auto h-full">
      <div class="flex px-8 py-2.5 mt-2 mb-6 max-sm:px-4 max-sm:py-2.5">
         <div class="flex flex-col">
            <h1
               class="rounded-tr-lg rounded-bl-lg flex text-2xl font-bold mb-8 bg-gray-300 justify-center"
            >
               國家管理
            </h1>
            <div
               class="flex gap-4 px-2.5 py-0 bg-white rounded-xl max-sm:px-2 max-sm:py-0 dark:bg-black dark:border-2 dark:border-white"
            >
               <button
                  class="flex items-center justify-center p-2 hover:bg-gray-200 rounded-md hover:border-2 hover:border-black border-2 border-white"
                  v-tooltip.top="'新增國家'"
               >
                  <Icon
                     name="uil:create-dashboard"
                     class="w-6 h-6 text-black dark:text-white"
                     @click="
                        openAutoModal(
                           '新增國家',
                           '新增國家至清單',
                           schemas.country,
                           addCountry,
                           fields.country,
                        )
                     "
                  />
               </button>
               <button
                  class="flex items-center justify-center p-2 hover:bg-gray-200 rounded-md hover:border-2 hover:border-black border-2 border-white"
                  v-tooltip.top="'點選國家可以大量刪除'"
                  @click="
                     openAutoModal(
                        '確認刪除',
                        '你確定要刪除選擇的國家嗎？',
                        z.object({}),
                        deleteSelectedCountries,
                        undefined,
                     )
                  "
               >
                  <Icon
                     name="mdi:delete-sweep-outline"
                     class="w-6 h-6 text-black dark:text-white"
                  />
               </button>
               <button
                  class="flex items-center justify-center p-2 hover:bg-gray-200 rounded-md hover:border-2 hover:border-black border-2 border-white"
                  v-tooltip.top="'清空所有國家'"
                  @click="deleteAllCountries"
               >
                  <Icon
                     name="icon-park-outline:clear"
                     class="w-6 h-6 text-black dark:text-white"
                  />
               </button>
            </div>
         </div>
      </div>
      <div
         class="grid gap-12 px-8 py-0 grid-cols-[repeat(3,1fr)] max-md:px-4 max-md:py-0 max-md:grid-cols-[repeat(2,1fr)] max-sm:px-2 max-sm:py-0 max-sm:grid-cols-[1fr]"
      >
         <CountryCard
            v-for="country in countries"
            :key="country.CountryID"
            :title="country.CountryName"
            :iso-code="country.ISOCode"
            case-count="95"
            :is-selected="isSelected(country)"
            @click="toggleCountrySelection(country)"
            @edit="editCountryByCard(country)"
         />
      </div>
      <LiaisonManage class="mt-8" />
   </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css");
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap");
</style>
