export const useElectronWindow = () => {
   const { $trpc } = useNuxtApp();
   return {
      minimize: () => {
         $trpc.window.minimizeCurrent.query();
      },
      close: () => {
         $trpc.window.closeCurrent.query();
      },
   };
};
