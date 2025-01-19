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
    */
   const open = (
      modalName: ModalName,
      options?: { id?: string, props?: Record<string, any> },
   ) => {
      const existingModal = options?.id
         ? modals.value.find(modal => modal.id === options.id)
         : undefined;

      if (existingModal) {
         existingModal.isOpen = true;
      }
      else {
         modals.value.push({
            id: options?.id || "TEMP-" + Math.random().toString(36).slice(2),
            modalName: `Modals${modalName}`,
            isOpen: true,
            props: options?.props || {},
         });
      }
   };

   /**
    * 當模態框發出 close 時的行為
    * @param id - 模態框的唯一標識
    * @param modal - 關閉的模態框實例
    */
   const close = (id: string) => {
      const index = modals.value.findIndex(modal => modal.id === id);
      if (index !== -1) {
         modals.value.splice(index, 1);
      }
   };

   return {
      modals,
      open,
      close,
   };
};
