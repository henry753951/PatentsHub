import {
   FilterDate,
   FilterInput,
   FilterNumberInput,
   FilterSelect,
} from "#components";
import { format } from "date-fns";
import type { Component, Ref } from "vue";
import { ref, computed, watch, onMounted } from "vue";

// Define FilterItem type with explicit structure
export type FilterItem =
  | {
     label: string
     type: "string"
     value: Ref<string>
  }
  | {
     label: string
     type: "select"
     value: Ref<string | null>
     options?: Ref<Array<{ value: string, label: string }>>
  }
  | {
     label: string
     type: "date"
     value: Ref<Date | null>
  }
  | {
     label: string
     type: "number"
     value: Ref<number | null>
  };

type FilterType = FilterItem["type"];

// Map filter types to components
const componentMap: Record<FilterType, Component> = {
   string: FilterInput,
   select: FilterSelect,
   date: FilterDate,
   number: FilterNumberInput,
};

// Get component by filter type
function getComponent(type: FilterType): Component {
   const component = componentMap[type];
   if (!component) {
      throw new Error(`Unknown filter type: ${type}`);
   }
   return component;
}

// Main composable function
export const useFilterComponent = <T extends Record<string, FilterItem>>(
   filterItemList: T,
   inputRef: Ref<HTMLInputElement | null>,
) => {
   // Initialize default values
   const defaultValue = Object.keys(filterItemList).reduce(
      (acc, key) => ({
         ...acc,
         [key]: filterItemList[key].value.value,
      }),
      {} as Record<keyof T, any>,
   );

   // Compute filter components
   const filterComponents = computed(() =>
      Object.entries(filterItemList).map(([key, item]) => ({
         component: getComponent(item.type),
         bind: {
            "modelValue": item.value.value,
            "onUpdate:modelValue": (val: any) => {
               item.value.value = val;
               nextTick(() => {
                  updateContentFromFilter(key as keyof T);
               });
            },
            ...(item.type === "select" && item.options?.value
               ? { options: item.options.value }
               : {}),
         },
         label: item.label,
         id: key,
         type: item.type,
      })),
   );

   const content = useState<string>("searchContent", () => "");
   const cursorPosition = ref(0);

   // Parse content into filters and search texts
   const parseContent = (text: string) => {
      const words = text.trim().split(/\s+/);
      const filters: { label: string, value: any }[] = [];
      const searchTexts: string[] = [];
      const regex = /^([\p{L}\p{N}_]+):(.+)?$/u;

      words.forEach((word) => {
         const match = word.match(regex);
         if (match) {
            const [, label, value] = match;
            const id = Object.keys(filterItemList).find(
               (key) => filterItemList[key].label === label,
            );
            const type = id ? filterItemList[id].type : null;
            const value_ = formatValueToFilter(value, type);

            filters.push({
               label,
               value: value_,
            });
         }
         else {
            if (word) searchTexts.push(word);
         }
      });

      return { filters, searchTexts };
   };

   // Update content based on filter state
   const updateContentFromFilter = (id: keyof T) => {
      const filter = filterItemList[id];
      if (!filter) return;

      const label = filter.label;
      const words = content.value
         .trim()
         .split(/\s+/)
         .filter((w) => w);
      const filterIndex = words.findIndex((w) => w.startsWith(`${label}:`));

      // Prepare the new filter string if active
      let newFilterStr = "";

      const valueStr = formatValue(filter.value.value, filter.type);
      newFilterStr = `${label}:${valueStr}`;

      // Update words array

      if (filterIndex !== -1) {
         // Replace existing filter
         words[filterIndex] = newFilterStr;
      }
      else {
         // Insert new filter after the last existing filter or at the start
         const lastFilterIndex = words.findLastIndex((w) =>
            Object.keys(filterItemList).some((key) =>
               w.startsWith(`${filterItemList[key].label}:`),
            ),
         );
         const insertIndex = lastFilterIndex !== -1 ? lastFilterIndex + 1 : 0;
         words.splice(insertIndex, 0, newFilterStr);
      }

      // Update content
      content.value = words.join(" ") || "";
      updateFiltersFromContent(content.value);
   };

   // Update filters based on content
   const updateFiltersFromContent = (text: string) => {
      const { filters, searchTexts } = parseContent(text);

      Object.keys(filterItemList).forEach((id) => {
         const filter = filters.find(
            (f) => f.label === filterItemList[id].label,
         );
         const filterItem = filterItemList[id];
         if (filter && filter.value !== undefined) {
            filterItem.value.value = filter.value;
         }
         else {
            filterItem.value.value = defaultValue[id];
         }
      });

      return searchTexts;
   };

   // Toggle filter activation
   const toggleFilter = (id: keyof T, value?: boolean) => {
      const filter = filterItemList[id];
      if (!filter) return;
      if (content.value.includes(`${filter.label}:`)) {
         // Remove filter
         content.value = content.value.replace(
            new RegExp(`\\b${filter.label}:[^\\s]*\\s*`, "g"),
            "",
         );
      }
      else {
         content.value += ` ${filter.label}:${formatValue(
            filter.value.value,
            filter.type,
         )}`;
      }
      content.value = content.value.trim();

      filter.value.value = defaultValue[id];
   };

   const formatValue = (value: any, type: FilterType | null) => {
      switch (type) {
         case "date":
            try {
               return value ? format(value, "yyyy-MM-dd") : "";
            }
            catch (error) {
               return "";
            }
         case "number":
            return value !== null && value !== undefined
               ? value.toString()
               : "";
         default:
            return value || "";
      }
   };

   const formatValueToFilter = (value: any, type: FilterType | null) => {
      switch (type) {
         case "date":
            try {
               return value ? new Date(value) : null;
            }
            catch (error) {
               return null;
            }
         case "number":
            return value !== null && value !== undefined ? Number(value) : null;
         default:
            return value || null;
      }
   };

   // Update cursor position
   const updateCursorPosition = () => {
      if (inputRef.value) {
         cursorPosition.value = inputRef.value.selectionStart || 0;
      }
   };

   // Compute current filter based on cursor position
   const currentFilter = computed(() => {
      const cursor = cursorPosition.value;
      const text = content.value;
      const words = text.trim().split(/\s+/);
      let currentPos = 0;

      for (const word of words) {
         const wordStart = currentPos;
         const wordEnd = currentPos + word.length + 1; // +1 for space
         if (cursor >= wordStart && cursor < wordEnd) {
            // Try matching full filter (label:value)
            const fullRegex = /^([\p{L}\p{N}_]+):(.+)?$/u;
            const fullMatch = word.match(fullRegex);
            if (fullMatch) {
               const [, label] = fullMatch;
               const index = filterComponents.value.findIndex(
                  (fc) => fc.label === label,
               );
               return index !== -1 ? filterComponents.value[index] : null;
            }
         }
         currentPos = wordEnd;
      }
      return null;
   });

   // Watch content changes
   watch(content, (newValue) => {
      updateFiltersFromContent(newValue);
   });

   // Setup event listeners
   onMounted(() => {
      if (inputRef.value) {
         inputRef.value.addEventListener("click", updateCursorPosition);
         inputRef.value.addEventListener("input", updateCursorPosition);
      }
      updateFiltersFromContent(content.value);
      consola.log("Filter component initialized with content:", content.value);
   });

   const searchTexts = computed(() => {
      const { searchTexts } = parseContent(content.value);
      return searchTexts;
   });

   const getFilterActive = (id: keyof T) => {
      const filter = filterItemList[id];
      if (!filter) return false;
      const filterStr = `${filter.label}:`;
      return content.value.includes(filterStr);
   };

   return {
      getFilterActive,
      filterComponents,
      searchTexts,
      toggleFilter,
      content,
      currentFilter,
   };
};
