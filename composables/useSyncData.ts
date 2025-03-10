export const useSyncData = <T>(
   refData: Ref<T>,
   onSave?: (data: T) => Promise<void>,
) => {
   const data = ref<T>(JSON.parse(JSON.stringify(refData.value)));
   const save = async () => {
      if (onSave) {
         await onSave(data.value);
      }
      else {
         refData.value = JSON.parse(JSON.stringify(data.value));
      }
   };
   const isSynced = computed(() => {
      return JSON.stringify(data.value) === JSON.stringify(refData.value);
   });
   return { data, refData, save, isSynced };
};
