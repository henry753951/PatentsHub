import { defineStore } from "pinia";
import { toast } from "vue-sonner";
import type { dbZ, z } from "#imports";
export const useAppStore = defineStore("appStore", {
   state: () => {
      return {
         logs: [] as ILog[],
         note: new Map<
            string,
            {
               Title: string
               Body: string
               Date: Date
            }
         >(),
      };
   },
   actions: {
      async insertLog(log: ILog) {
         log.id = this.logs.length;
         this.logs.push(log);
         if (log.type === "error") {
            setTimeout(() => {
               toast.error("發生意外錯誤", {
                  description: `Message: ${log.message}`,
                  action: {
                     label: "查看",
                     onClick: async () =>
                        await navigateTo({
                           name: "debug-logs",
                        }),
                  },
               });
            }, 0);
         }
      },
   },
});
