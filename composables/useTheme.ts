export const useTheme = () => {
   const colorMode = useColorMode();
   const options = [
      { value: "light", label: "亮色模式" },
      { value: "dark", label: "深色模式" },
      { value: "system", label: "跟隨系統" },
   ];
   const loopSwitchTheme = () => {
      const index = options.findIndex(
         (option) => option.value === colorMode.preference,
      );
      const nextIndex = (index + 1) % options.length;
      colorMode.preference = options[nextIndex].value;
   };

   return {
      colorMode,
      options,
      loopSwitchTheme,
      currentTheme: computed({
         get: () => colorMode.preference,
         set: (value) => {
            const option = options.find((option) => option.value === value);
            if (option) {
               colorMode.preference = option.value;
            }
         },
      }),
   };
};
