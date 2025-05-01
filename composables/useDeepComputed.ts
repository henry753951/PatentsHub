import { ref, onUnmounted, watch } from "vue";
import type { WritableComputedRef } from "vue";
import { cloneDeep } from "lodash-es";

export const useDeepComputed = <T>(refParam: WritableComputedRef<T>) => {
   const cache = ref(cloneDeep(refParam.value));
   let oldRefParam = cloneDeep(refParam.value);
   // 監聽 refParam 的變化，同步更新 cache
   const watchCache = watchPausable(
      refParam,
      (newValue) => {
         if (JSON.stringify(newValue) !== JSON.stringify(oldRefParam)) {
            cache.value = cloneDeep(newValue);
            oldRefParam = cloneDeep(newValue); // 更新 refParam 的舊值
         }
      },
      { deep: true },
   );

   // 監聽 cache 的變化，同步更新 refParam
   const watchRef = watchPausable(
      cache,
      (newValue) => {
         refParam.value = cloneDeep(newValue); // 觸發 computed 的 setter
         oldRefParam = cloneDeep(newValue); // 更新 refParam 的舊值
      },
      { deep: true },
   );

   // 組件卸載時停止監聽
   onUnmounted(() => {
      watchCache.stop();
      watchRef.stop();
   });

   return cache;
};
