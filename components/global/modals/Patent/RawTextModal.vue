<template>
   <div>
      <Dialog v-model:open="isOpen">
         <DialogContent
            class="max-w-screen-xl"
            @interact-outside.prevent
         >
            <DialogHeader>
               <DialogTitle>專利資訊 - 純文字</DialogTitle>
               <DialogDescription></DialogDescription>
            </DialogHeader>
            <OverlayScrollbarsComponent
               class="w-full"
               style="max-height: 80vh; overflow: auto"
               :options="{ scrollbars: { autoHide: 'leave' } }"
            >
               <div class="prose">
                  <div class="grid grid-cols-2">
                     <div><leftColumnText /></div>
                     <div><rightColumnText /></div>
                  </div>
               </div>
            </OverlayScrollbarsComponent>
         </DialogContent>
      </Dialog>
   </div>
</template>

<script lang="tsx" setup>
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { OverlayScrollbarsComponent } from "overlayscrollbars-vue";

const isOpen = defineModel("open", {
   type: Boolean,
   default: false,
});

const props = defineProps<{
   patent: RouterOutput["data"]["patent"]["getPatent"]
}>();

const { patent } = toRefs(props);

const patentTypeMap = {
   INVENTION: "發明專利",
   UTILITY_MODEL: "新型專利",
   DESIGN: "設計專利",
   PLANT: "植物專利",
};

// Left column text computation
const leftColumnText = computed(() => {
   return (
      <>
         {patent.value?.application && (
            <>
               <h2>申請資訊</h2>
               <p>
                  <b>申請日期:</b>
                  {" "}
                  {patent.value.application.FilingDate
                     ? format(patent.value.application.FilingDate, "yyyy-MM-dd")
                     : "無資料"}
               </p>
               <p>
                  <b>申請案號:</b>
                  {" "}
                  {patent.value.application.ApplicationNumber || "無資料"}
               </p>
               <p>
                  <b>研發成果編號:</b>
                  {" "}
                  {patent.value.application.RDResultNumber || "無資料"}
               </p>
               <p>
                  <b>國科會編號:</b>
                  {" "}
                  {patent.value.application.NSCNumber || "無資料"}
               </p>
            </>
         )}

         {patent.value?.funding && (
            <>
               <h2>帳務資訊</h2>
               <p>
                  <b>資助單位:</b>
                  {" "}
                  {patent.value.funding.fundingUnits
                     ?.map(
                        (unit) =>
                           `${unit.fundingUnit.Name || "未知單位"} (專案編號:${unit.ProjectCode || "無專案代碼"})`,
                     )
                     .join(", ") || "無資料"}
               </p>
               <p>
                  <b>資助類別:</b>
                  {" "}
                  {patent.value.funding.plan?.Name || "無資料"}
               </p>
               <p>
                  <b>分配比例:</b>
                  {" "}
                  {patent.value.funding.plan?.planAllocations
                     ?.map(
                        (alloc) => `${alloc.target.Name}: ${alloc.Percentage}%`,
                     )
                     .join(", ") || "無資料"}
               </p>
            </>
         )}

         {patent.value?.external && (
            <>
               <h2>證書資訊</h2>
               <p>
                  <b>專利號碼:</b>
                  {" "}
                  {patent.value.external.PatentNumber || "無資料"}
               </p>
               <p>
                  <b>公告獲證日期:</b>
                  {" "}
                  {patent.value.external.PublicationDate
                     ? format(
                        patent.value.external.PublicationDate,
                        "yyyy-MM-dd",
                     )
                     : "無資料"}
               </p>
               <p>
                  <b>專利權期間 - 起始日期:</b>
                  {" "}
                  {patent.value.external.StartDate
                     ? format(patent.value.external.StartDate, "yyyy-MM-dd")
                     : "無資料"}
               </p>
               <p>
                  <b>專利權期間 - 結束日期:</b>
                  {" "}
                  {patent.value.external.EndDate
                     ? format(patent.value.external.EndDate, "yyyy-MM-dd")
                     : "無資料"}
               </p>
               <p>
                  <b>國際專利分類號IPC:</b>
                  {" "}
                  {patent.value.external.IPCNumber || "無資料"}
               </p>
               <p>
                  <b>專利範圍:</b>
                  {" "}
                  {patent.value.external.PatentScope || "無資料"}
               </p>
            </>
         )}

         {patent.value?.technical && (
            <>
               <h2>技術資訊</h2>
               <p>
                  <b>技術關鍵字:</b>
                  {" "}
                  {patent.value.technical.keywords
                     ?.map((keyword) => keyword.Keyword)
                     .join(", ") || "無資料"}
               </p>
               <p>
                  <b>技術成熟度 RTL:</b>
                  {" "}
                  {patent.value.technical.MaturityLevel || "無資料"}
               </p>
            </>
         )}

         {patent.value?.internal && (
            <>
               <h2>事務所資訊</h2>
               <p>
                  <b>初評事務所:</b>
                  {" "}
                  {patent.value.internal.InitialReviewAgencies?.map(
                     (agency) => agency.agencyUnit.Name || "無資料",
                  ).join(", ") || "無資料"}
               </p>
               <p>
                  <b>承辦事務所:</b>
                  {" "}
                  {patent.value.internal.TakerAgencies?.map(
                     (agency) =>
                        `${agency.agencyUnit.Name} (檔案編號:${agency.FileCode || "無檔案代碼"})`,
                  ).join(", ") || "無資料"}
               </p>
            </>
         )}
      </>
   );
});

// Right column text computation
const rightColumnText = computed(() => {
   return (
      <>
         {patent.value && (
            <>
               <h2>基本資訊</h2>
               <p>
                  <b>校內編號:</b>
                  {" "}
                  {patent.value.InternalID || "無資料"}
               </p>
               <p>
                  <b>年度:</b>
                  {" "}
                  {patent.value.Year || "無資料"}
               </p>
               <p>
                  <b>國家:</b>
                  {" "}
                  {patent.value.country?.CountryName || "無資料"}
               </p>
               <p>
                  <b>專利類別:</b>
                  {" "}
                  {patentTypeMap[patent.value.PatentType!] || "無資料"}
               </p>
               <p>
                  <b>技推資訊 - 技推委員會日期:</b>
                  {" "}
                  {patent.value.InitialReviewDate
                     ? format(patent.value.InitialReviewDate, "yyyy-MM-dd")
                     : "無資料"}
               </p>
               <p>
                  <b>技推資訊 - 技推委員會次數:</b>
                  {" "}
                  第
                  {patent.value.InitialReviewNumber || "無資料"}
                  次技推委員會
               </p>
               <p>
                  <b>發明名稱:</b>
                  {" "}
                  {patent.value.Title || "無資料"}
               </p>
               <p>
                  <b>發明名稱(英):</b>
                  {" "}
                  {patent.value.TitleEnglish || "無資料"}
               </p>
               <p>
                  <b>草案名稱:</b>
                  {" "}
                  {patent.value.DraftTitle || "無資料"}
               </p>
               <p>
                  <b>學院與系所:</b>
                  {" "}
                  {patent.value.department.Name || "無資料"}
               </p>
            </>
         )}

         {patent.value?.inventors && Array.isArray(patent.value.inventors) && (
            <>
               <h2>發明人</h2>
               {patent.value.inventors.map((inventor, index: number) => (
                  <p key={index}>
                     <b>
                        發明人
                        {index + 1}
                        :
                     </b>
                     {" "}
                     名稱:
                     {" "}
                     {inventor.inventor.contactInfo.Name || "未知發明人"}
                     ,
                     貢獻:
                     {" "}
                     {inventor.Contribution || "無資料"}
                     , 是否主要發明人:
                     {" "}
                     {inventor.Main ? "是" : "否"}
                  </p>
               ))}
            </>
         )}

         {patent.value?.owners && Array.isArray(patent.value.owners) && (
            <>
               <h2>專利所有權人</h2>
               {patent.value.owners.map((owner, index: number) => (
                  <p key={index}>
                     <b>
                        所有權人
                        {index + 1}
                        :
                     </b>
                     {" "}
                     名稱:
                     {owner.Name || "無資料"}
                     , 所有權百分比:
                     {" "}
                     {owner.OwnershipPercentage || 0}
                     %
                  </p>
               ))}
            </>
         )}
      </>
   );
});
</script>

<style scoped></style>
