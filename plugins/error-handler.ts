export default defineNuxtPlugin((nuxtApp) => {
   const appStore = useAppStore(); // 在插件中獲取 store

   // 自定義錯誤處理
   nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
      console.error("Custom Error Handler:", error, instance, info);
      const errorLog: ILog = {
         type: "error",
         message: JSON.stringify(error) || "未知錯誤",
         timestamp: new Date(),
         object: {
            instance,
            info,
         },
      };
      appStore.insertLog(errorLog);
   };

   // Vue 錯誤鉤子
   nuxtApp.hook("vue:error", (error, instance, info) => {
      console.error("Custom Error Handler:", error, instance, info);
      const errorLog: ILog = {
         type: "error",
         message: JSON.stringify(error) || "未知錯誤",
         timestamp: new Date(),
         object: {
            instance,
            info,
         },
      };
      appStore.insertLog(errorLog);
   });
});
