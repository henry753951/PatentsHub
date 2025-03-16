export default defineNuxtPlugin((nuxtApp) => {
   const appStore = useAppStore(); // 在插件中獲取 store
   // Vue 錯誤鉤子
   nuxtApp.hook("vue:error", (error, instance, info) => {
      console.error("Custom Error Handler:", error, instance, info);
      const errorLog: ILog = {
         type: "error",
         message: String(error),
         timestamp: new Date(),
         object: {
            instance,
            info,
         },
      };
      appStore.insertLog(errorLog);
   });
});
