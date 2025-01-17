export const useTheme = () => {
   const colorMode = useColorMode();
   const options = [
      { value: "light", label: "Light" },
      { value: "dark", label: "Dark" },
      { value: "system", label: "System" },
   ];
   const loopSwitchTheme = () => {
      const index = options.findIndex(
         option => option.value === colorMode.preference,
      );
      const nextIndex = (index + 1) % options.length;
      colorMode.preference = options[nextIndex].value;
   };

   return { colorMode, options, loopSwitchTheme };
};
