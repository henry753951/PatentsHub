import { useNuxtApp, useAsyncData } from "#app";

export const useContactInfo = (contactInfoId: number) => {
   const { $trpc } = useNuxtApp();

   // 獲取聯絡人資料
   const { data, refresh, status } = useAsyncData(
      "contactInfo-" + contactInfoId,
      async () => {
         if (!contactInfoId) return null;
         const result = await $trpc.data.contactInfo.getContactInfos.query({
            where: { ContactInfoID: contactInfoId },
         });
         return result[0] || null;
      },
   );

   // 更新聯絡人資料
   const updateContactInfo = async (contactInfo: {
      contactInfoID: number
      Name?: string
      Email?: string | null
      OfficeNumber?: string | null
      PhoneNumber?: string | null
      Role?: string | null
      Note?: string | null
   }) => {
      await $trpc.data.contactInfo.updateContactInfo.mutate({
         ...contactInfo,
         Note: contactInfo.Note ?? undefined,
         Email: contactInfo.Email ?? undefined,
         OfficeNumber: contactInfo.OfficeNumber ?? undefined,
         PhoneNumber: contactInfo.PhoneNumber ?? undefined,
         Role: contactInfo.Role ?? undefined,
      });
   };

   return {
      data,
      status,
      forceRefresh: refresh,
      updateContactInfo,
   };
};
