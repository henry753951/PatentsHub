export const useApiAnnuity = (
   patent: Ref<RouterOutput["data"]["patent"]["getPatent"]>,
) => {
   const { data, refresh } = useAsyncData(async () => {
      if (
         !patent.value?.application?.ApplicationNumber
         || patent.value.country?.ISOCode !== "TW"
      ) {
         return null;
      }
      const { data } = await useFetch<AnnuityData>(
         `https://tiponet.tipo.gov.tw/S080BV1/api/annuity?applNo=${patent.value?.application?.ApplicationNumber}`,
      );
      return data.value;
   });
   return { data, refresh };
};

export interface AnnuityData {
   patentNameC: string // 專利名稱(中文)
   idType: string // ID類型
   applicantNameC: string // 申請人名稱(中文)
   chargeExpirYear: string // 費用到期年度
   applNo: string // 申請號
   caseLink: string // 案件連結
   patentNo: string // 專利號
   applicantId: string // 申請人ID
   annuityEnd: number // 年金結束年限
   patentClass: string // 專利類別
   chargeExpirDate: string // 費用到期日期
   isPaying: string // 是否付款中
}
