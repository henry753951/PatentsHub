<!-- components/EditList.vue -->
<template>
   <div class="space-y-2">
      <div class="font-semibold">
         專利所有權人
      </div>
      <div class="flex flex-col gap-3">
         <BlockPatentOwnnershipRow
            v-for="owner in owners"
            :key="owner.ownerID"
            v-model:ownership-percentage="owner.ownershipPercentage"
            :name="owner.name"
            :max="100 - totalOwnership + (owner.ownershipPercentage || 0)"
            :ownership-input="true"
            :compact="true"
         >
            <template #actions>
               <div class="ps-6 h-full flex items-center">
                  <CustomIconButton
                     name="material-symbols:close-rounded"
                     @click="deleteOwner(owner.ownerID)"
                  />
               </div>
            </template>
         </BlockPatentOwnnershipRow>

         <BlockPatentOwnnershipAdd
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

// 型別定義
interface Owner {
   ownerID: number
   name: string
   ownershipPercentage: number
}

// Model
const owners = defineModel<Owner[]>({ required: false, default: [] });

// 計算總持有度
const totalOwnership = computed(() =>
   owners.value.reduce((acc, o) => acc + (o.ownershipPercentage || 0), 0),
);

// 新增所有權人
const addOwner = (newOwner: Owner) => {
   // 檢查總持有度
   const total = totalOwnership.value + newOwner.ownershipPercentage;
   if (total > 100) {
      alert("總持有度超過 100%，請調整");
      return;
   }

   // 檢查是否已存在
   const existing = owners.value.find((o) => o.ownerID === newOwner.ownerID);
   if (existing) {
      alert("此所有權人已存在");
      return;
   }

   owners.value.push({
      ownerID: newOwner.ownerID,
      name: newOwner.name,
      ownershipPercentage: newOwner.ownershipPercentage,
   });
};

// 刪除所有權人
const deleteOwner = (id: number) => {
   const index = owners.value.findIndex((o) => o.ownerID === id);
   if (index !== -1) {
      owners.value.splice(index, 1);
   }
};
</script>

<style scoped></style>
