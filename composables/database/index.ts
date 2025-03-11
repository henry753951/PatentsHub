import { useInventor } from "./inventor";
import { usePatent } from "./patent";
import { usePatents } from "./patents";

export const useDatabase = () => {
   return {
      useInventor,
      usePatent,
      usePatents,
   };
};
