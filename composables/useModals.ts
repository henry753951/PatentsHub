import type { ZodObjectOrWrapped } from "~/components/ui/auto-form/utils";
import type { Config } from "~/components/ui/auto-form";
import type { z } from "zod";

interface ModalInstance {
   id: string // 的唯一標識
   modalName: `Modals${ModalName}` // 模態框名稱
   isOpen: boolean // 是否打開
   props: Record<string, any> // 傳遞給模態框的屬性
}

export const useModals = () => {
   const modals = useState<ModalInstance[]>("modals", () => []);

   /**
    * 打開模態框
    * @param modalName - 模態框名稱
    * @param event - 點擊事件 (用於插入位置)
    * @param options - 傳遞的屬性和可選的 ID
    * @returns 模態框的唯一標識 ID
    */
   const open = (
      modalName: ModalName,
      options?: { id?: string, props?: Record<string, any> },
   ) => {
      const id = options?.id || "temp-" + Math.random().toString(36).slice(2);
      const existingModal = options?.id
         ? modals.value.find(
            (modal) =>
               modal.id === options.id
               && modal.modalName === `Modals${modalName}`,
         )
         : undefined;

      if (existingModal) {
         existingModal.isOpen = true;
      }
      else {
         modals.value.push({
            id: id,
            modalName: `Modals${modalName}`,
            isOpen: true,
            props: options?.props || {},
         });
      }
      return id;
   };

   /**
    * 當模態框發出 close 時的行為
    * @param id - 模態框的唯一標識
    * @param remove - 是否從列表中刪除 (是否保留資料)
    */
   const close = (id: string, remove: boolean = false) => {
      if (remove) {
         const index = modals.value.findIndex((modal) => modal.id === id);
         if (index !== -1) {
            modals.value.splice(index, 1);
         }
         return;
      }
      else {
         const modal = modals.value.find((modal) => modal.id === id);
         if (modal) {
            modal.isOpen = false;
         }
      }
   };

   /**
    * 打開自動生成的模態框
    * @param title - 標題
    * @param description - 描述
    * @param schema - Zod 格式
    * @param callback - 回調函數
    * @param fieldConfig - 欄位設定
    * @param passthrough - 透傳參數
    * @param defaultValues - 預設值
    * @returns 模態框的唯一標識 ID
    *
    * @example
    * 參考 `components\Form\CollageManage.vue` 使用的範例
    */
   const openAutoModal = <T extends ZodObjectOrWrapped>(
      title: string,
      description: string,
      schema: T,
      callback: (data: z.infer<T>, passthrough?: any) => Promise<void>,
      fieldConfig?: Config<z.infer<T>>,
      passthrough?: any,
      defaultValues?: z.infer<T>,
   ) => {
      const id = open("AutoModal", {
         props: {
            title,
            description,
            schema,
            fieldConfig,
            callback,
            passthrough,
            defaultValues,
         },
      });
      return id;
   };

   return {
      modals,
      open,
      close,
      openAutoModal,
   };
};
