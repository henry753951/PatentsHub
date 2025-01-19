export const useElectronWindow = () => {
   const { $trpc } = useNuxtApp();
   return {
      minimize: () => {
         $trpc.app.window.minimizeCurrent.query();
      },
      maximize: () => {
         $trpc.app.window.maximizeCurrent.query();
      },
      close: () => {
         $trpc.app.window.closeCurrent.query();
      },
   };
};
