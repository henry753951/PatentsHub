import type { z } from "zod";
import type { RouterOutput, dbZ } from "~/server";
import { useNow, watchThrottled } from "@vueuse/core";
import {
   addDays,
   format,
   eachDayOfInterval,
   eachWeekOfInterval,
   eachMonthOfInterval,
   eachYearOfInterval,
   endOfDay,
   endOfWeek,
   endOfMonth,
   endOfYear,
} from "date-fns";

function getPeriods(
   periodType: string,
   startDate: Date,
   endDate: Date,
): { start: Date, end: Date }[] {
   let starts: Date[];
   switch (periodType) {
      case "days":
         starts = eachDayOfInterval({ start: startDate, end: endDate });
         break;
      case "weeks":
         starts = eachWeekOfInterval(
            { start: startDate, end: endDate },
            { weekStartsOn: 1 },
         ); // 週從星期一開始
         break;
      case "months":
         starts = eachMonthOfInterval({ start: startDate, end: endDate });
         break;
      case "years":
         starts = eachYearOfInterval({ start: startDate, end: endDate });
         break;
      default:
         throw new Error("Invalid period type");
   }
   const periods: { start: Date, end: Date }[] = [];
   for (const start of starts) {
      let end: Date;
      switch (periodType) {
         case "days":
            end = endOfDay(start); // 一天的結束
            break;
         case "weeks":
            end = endOfWeek(start, { weekStartsOn: 1 }); // 週的結束（星期日）
            break;
         case "months":
            end = endOfMonth(start); // 月的結束
            break;
         case "years":
            end = endOfYear(start); // 年的結束
            break;
      }
      if (end > endDate) {
         end = endDate; // 確保不超過 dateRange 的結束日期
      }
      periods.push({ start, end });
   }
   return periods;
}

export const useDatabasePatentsReminder = () => {
   const { $trpc } = useNuxtApp();
   const now = useNow({ interval: 10 * 1000 });
   const settingsStore = useSettingsStore();

   const { reminderSettings: settings } = storeToRefs(settingsStore);

   const dateRange = computed(() => {
      const startDate = addDays(
         new Date(now.value),
         -settings.value.dateRange.daysBefore,
      );
      const endDate = addDays(
         new Date(now.value),
         settings.value.dateRange.daysAfter,
      );
      return {
         startDate: new Date(format(startDate, "yyyy-MM-dd")),
         endDate: new Date(format(endDate, "yyyy-MM-dd")),
      };
   });

   const { data, refresh, status } = useAsyncData<
      RouterOutput["data"]["patentStatus"]["getExpiringPatents"]
   >(
      "patents-reminder",
      async () => {
         const data = await $trpc.data.patentStatus.getExpiringPatents.query(
            dateRange.value,
         );
         return data;
      },
      {
         lazy: false,
      },
   );

   const dateArray = computed(() => {
      const array = [] as {
         date: Date
         expireds: {
            patent: RouterOutput["data"]["patentStatus"]["getExpiringPatents"][number]["patent"]
            expireDate: Date
         }[]
         expirings: {
            patent: RouterOutput["data"]["patentStatus"]["getExpiringPatents"][number]["patent"]
            expireDate: Date
         }[]
         type: "before" | "after" | "current"
      }[];

      if (!data.value)
         return {
            period: settings.value.period as
            | "days"
            | "weeks"
            | "months"
            | "years",
            dateRange: dateRange.value,
            result: array,
         };

      const { startDate, endDate } = dateRange.value;
      const currentDate = now.value;

      const periods = getPeriods(settings.value.period, startDate, endDate);
      for (const period of periods) {
         const expireds: (typeof array)[number]["expireds"] = [];
         const expirings: (typeof array)[number]["expirings"] = [];
         for (const item of data.value) {
            const patent = item.patent;
            const { status } = usePatentStatus({ data: ref(item.patent) });
            const lastStatus = status.value.reverse().find((s) => s.active);
            if (!lastStatus || !lastStatus.date) continue;

            if (lastStatus.status === "EXPIRED") {
               if (
                  lastStatus.date < period.start
                  || lastStatus.date > period.end
               )
                  continue;
               expireds.push({
                  patent,
                  expireDate: lastStatus.date,
               });
            }
            else if (lastStatus.status === "CERTIFIED") {
               const expireDate = status.value.find(
                  (s) => s.status === "EXPIRED",
               )?.date;
               if (!expireDate || expireDate < period.start || expireDate > period.end)
                  continue;
               expirings.push({
                  patent,
                  expireDate: lastStatus.date,
               });
            }
         }
         const type
            = period.end < currentDate
               ? "before"
               : period.start > currentDate
                  ? "after"
                  : "current";
         array.push({
            date: period.start,
            expireds,
            expirings,
            type,
         });
      }

      return {
         period: settings.value.period as "days" | "weeks" | "months" | "years",
         dateRange: dateRange.value,
         result: array,
      };
   });

   const unwatch = watchThrottled(
      settings.value.dateRange,
      () => {
         refresh();
      },
      { throttle: 1000 },
   );

   onMounted(() => {});

   onBeforeUnmount(() => {
      unwatch();
   });

   return {
      data,
      dateArray,
      status,
      settings,
      forceRefresh: refresh,
   };
};
