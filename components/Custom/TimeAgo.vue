<template>
   <UseTimeAgo
      v-slot="{ timeAgo }"
      :time="props.time"
      :messages="messages"
      :update-interval="1000"
   >
      {{ timeAgo }}
   </UseTimeAgo>
</template>

<script lang="ts" setup>
import { UseTimeAgo } from "@vueuse/components";
import type { UseTimeAgoMessages } from "@vueuse/core";
const messages = {
   justNow: "剛剛",
   past: (n) => (n.match(/\d/) ? `${n}前` : n),
   future: (n) => (n.match(/\d/) ? `${n}後` : n),
   second: (n) => `${n}秒`,
   minute: (n) => `${n}分鐘`,
   hour: (n) => `${n}小時`,
   day: (n, past) => (n === 1 ? (past ? "昨天" : "明天") : `${n} 天`),
   week: (n, past) => (n === 1 ? (past ? "上週" : "下週") : `${n} 週`),
   month: (n, past) => (n === 1 ? (past ? "上個月" : "下個月") : `${n} 個月`),
   year: (n, past) => (n === 1 ? (past ? "去年" : "明年") : `${n} 年`),
   invalid: "",
} as UseTimeAgoMessages;

const props = defineProps<{
   time: Date
}>();

</script>

<style scoped></style>
