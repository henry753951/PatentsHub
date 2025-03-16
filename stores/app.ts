import { defineStore } from "pinia";
import { toast } from "vue-sonner";
export const useAppStore = defineStore("appStore", {
   state: () => {
      return {
         logs: [],
      } as {
         logs: ILog[];
      };
   },
   actions: {
      insertLog(log: ILog) {
         log.id = this.logs.length;
         this.logs.push(log);
         if (log.type === "error") {
            toast(`Log ID: ${log.id}`, {
               description: `Type: ${log.type}, Message: ${log.message}`,
               action: {
                 label: "Undo",
                 onClick: () => console.log("Undo"),
               },
            });
         }
      },
   },
});
