export default <T>(value: T) => {
   const json = JSON.stringify(value, null, 2);
   const parsed = JSON.parse(json) as T;
   return parsed;
};
