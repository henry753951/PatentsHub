<script setup lang="ts">
import { ref } from "vue";
import { z } from "zod";
import { useModals } from "~/composables/useModals";
import type { Config } from "~/components/ui/auto-form/interface";
// 定義模式和欄位
type Country = RouterOutput["data"]["country"]["getAllContries"][0];

// 載入初始資料
onMounted(async () => {
   await countriesStore.refresh();
});

// Pinia store
const countriesStore = useCountriesStore();
const { countries } = storeToRefs(countriesStore);

const schemas = {
   country: z.object({
      id: z.number({ message: "無效的 ID" }),
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
      id: {
         label: "ID",
      },
      countryname: {
         label: "國家名稱",
      },
      isocode: {
         label: "ISO 代碼",
      },
   } as Config<z.infer<typeof schemas.country>>,
};

// 新增國家
const addCountry = async (
   data: z.infer<typeof schemas.country>,
   passthrough: any,
) => {
   await countriesStore.insert(data.id, data.countryname, data.isocode);
};

// 使用模態框
const { openAutoModal } = useModals();
</script>

<template>
   <div class="px-8 py-2.5 min-h-screen bg-gray-100">
      <div class="flex px-8 py-2.5 mt-2 mb-6 max-sm:px-4 max-sm:py-2.5">
         <div
            class="flex gap-4 px-2.5 py-0 bg-white rounded-xl max-sm:px-2 max-sm:py-0 dark:bg-black dark:border-2 dark:border-white"
         >
            <button
               class="flex items-center justify-center p-2 hover:bg-gray-200 rounded-md hover:border-2 hover:border-black border-2 border-white"
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
            >
               <Icon
                  name="mdi:delete-sweep-outline"
                  class="w-6 h-6 text-black dark:text-white"
               />
            </button>
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
         />
      </div>
   </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css");
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap");
</style>
