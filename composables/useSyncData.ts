import type { Ref } from "vue";

const updateRefData = <T>(target: Ref<T> | T, source: Partial<T>) => {
   // 取得 target 的真實值（如果是 ref 則取 .value，否則直接使用）
   const targetValue = isRef(target) ? unref(target) : target;

   for (const key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
         const sourceValue = source[key];
         const targetField = (targetValue as any)[key];

         if (
            typeof sourceValue === "object"
            && sourceValue !== null
            && !Array.isArray(sourceValue)
         ) {
            if (
               !targetField
               || typeof targetField !== "object"
               || Array.isArray(targetField)
            ) {
               (targetValue as any)[key] = {};
            }
            updateRefData((targetValue as any)[key], sourceValue);
         }
         else {
            (targetValue as any)[key] = sourceValue;
         }
      }
   }
   // 如果收斂目標是 ref，則將值寫回.value
   if (isRef(target)) {
      (target as Ref<T>).value = targetValue;
   }
};
export const useSyncData = <T>(
   refData: Ref<T>,
   onSave?: (data: T) => Promise<void>,
   options: {
      changeRefData: boolean
   } = { changeRefData: true },
) => {
   const data = ref<T>(JSON.parse(JSON.stringify(refData.value)));
   const save = async () => {
      if (options.changeRefData) {
         const newData = JSON.parse(JSON.stringify(data.value));
         console.log("refData", refData.value);
         updateRefData(refData, newData);
         console.log("refData", refData.value);
      }

      if (onSave) await onSave(data.value);
   };
   const unWatch = watch(
      refData,
      () => {
         if (isSynced.value) return;
         data.value = JSON.parse(JSON.stringify(refData.value));
      },
      { deep: true },
   );
   onUnmounted(() => {
      unWatch();
   });

   const isSynced = computed(() => {
      return JSON.stringify(data.value) === JSON.stringify(refData.value);
   });
   return { data, refData, save, isSynced };
};
