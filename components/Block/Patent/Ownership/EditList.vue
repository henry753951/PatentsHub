<!-- components/BlockPatentOwnershipEditList.vue -->
<template>
   <div class="space-y-2">
      <div class="flex flex-col gap-3">
         <BlockPatentOwnershipRow
            v-for="owner in owners"
            :key="owner.OwnerID"
            v-model:ownership-percentage="owner.OwnershipPercentage"
            :name="owner.Name"
            :max="100 - totalOwnership + (owner.OwnershipPercentage || 0)"
            :ownership-input="true"
            :compact="true"
         >
            <template #actions>
               <div class="ps-6 h-full flex items-center">
                  <CustomIconButton
                     name="material-symbols:close-rounded"
                     @click="deleteOwner(owner.OwnerID)"
                  />
               </div>
            </template>
         </BlockPatentOwnershipRow>

         <BlockPatentOwnershipAdd
            :patent-i-d="patentID"
            choose-text="新增所有權人"
            @select="addOwner"
         />
      </div>
   </div>
</template>

<script setup lang="ts">
// Props
const { patentID } = defineProps<{
   patentID: number
}>();

// 型別定義，與 patent.owners 對齊
interface Owner {
   OwnerID: number
   Name: string
   OwnershipPercentage: number
   PatentID: number
}

// Model
const owners = defineModel<Owner[]>({ required: false, default: [] });

// 確保 owners.value 始終是陣列
const safeOwners = computed({
   get: () => Array.isArray(owners.value) ? owners.value : [],
   set: (value) => { owners.value = value; },
});

// 計算總持有度，新增防護
const totalOwnership = computed(() =>
   safeOwners.value.reduce((acc, o) => acc + (o.OwnershipPercentage || 0), 0),
);

// 新增所有權人
const addOwner = (newOwner: { OwnerID: number, Name: string, OwnershipPercentage: number }) => {
   // 檢查總持有度
   const total = totalOwnership.value + newOwner.OwnershipPercentage;
   if (total > 100) {
      alert("總持有度超過 100%，請調整");
      return;
   }

   // 檢查名字是否重複
   const existing = safeOwners.value.find((o) => o.Name === newOwner.Name);
   if (existing) {
      alert("此所有權人名字已存在");
      return;
   }

   // 映射 newOwner 到完整的 Owner 類型
   owners.value = [
      ...safeOwners.value,
      {
         OwnerID: newOwner.OwnerID || 0,
         Name: newOwner.Name,
         OwnershipPercentage: newOwner.OwnershipPercentage,
         PatentID: patentID,
      },
   ];
};

// 刪除所有權人
const deleteOwner = (ownerID: number) => {
   const index = safeOwners.value.findIndex((o) => o.OwnerID === ownerID);
   if (index !== -1) {
      const newOwners = [...safeOwners.value];
      newOwners.splice(index, 1);
      owners.value = newOwners;
   }
};
</script>

<style scoped></style>
