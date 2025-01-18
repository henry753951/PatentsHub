export const useElectronWindow = () => {
   const { $trpc } = useNuxtApp();
   return {
      minimize: () => {
         $trpc.window.minimizeCurrent.query();
      },
      maximize: () => {
         $trpc.window.maximizeCurrent.query();
      },
      close: () => {
         $trpc.window.closeCurrent.query();
      },
   };
};
