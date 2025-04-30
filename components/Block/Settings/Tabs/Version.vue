<template>
   <div class="flex flex-col gap-4 py-2">
      <div class="flex flex-col items-center gap-5 pt-5">
         <div class="flex gap-6">
            <div
               class="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl hover:shadow-yellow-100 transition-all duration-300 hover:scale-[115%] group"
            >
               <img
                  src="/images/icon.png"
                  class="w-[90px] h-[90px] object-cover"
                  draggable="false"
               />
               <div
                  class="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               ></div>
            </div>
            <div
               class="relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl hover:shadow-orange-300 transition-all duration-300 hover:scale-[115%] group"
            >
               <img
                  src="/images/logo.jpg"
                  class="w-[90px] h-[90px] object-cover"
                  draggable="false"
               />
               <div
                  class="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               ></div>
            </div>
         </div>
         <div class="flex flex-col items-center gap-2">
            <p
               class="text-2xl dark:text-gray-400 font-bold"
               @click="discordService.test"
            >
               國立高雄大學 專利管理系統
            </p>
            <div>
               <span
                  v-for="(link, index) in links"
                  :key="index"
               >
                  <a
                     :href="link.url"
                     target="_blank"
                     class="text-blue-500 hover:underline"
                  >
                     {{ link.name }}
                  </a>
                  <span
                     v-if="index < links.length - 1"
                     class="mx-1 text-gray-400"
                  >
                     ·
                  </span>
               </span>
            </div>
            <div class="flex flex-col items-center gap-2">
               <div class="flex gap-2">
                  <div
                     v-for="(author, index) in authors"
                     :key="index"
                     class="flex items-center justify-center cursor-pointer"
                     @mouseover="currentAuthor = author"
                     @mouseleave="currentAuthor = null"
                     @click="openAuthorLink(author)"
                  >
                     <img
                        class="w-10 h-10 rounded hover:shadow shadow-gray-300 dark:shadow-gray-700 transition-all duration-300 hover:scale-110"
                        :src="author.avatar"
                     />
                  </div>
               </div>
               <div v-if="currentAuthor">
                  {{ currentAuthor?.name }} ( {{ currentAuthor?.nickname }} )
               </div>
               <div v-else>
                  JYBK
               </div>
            </div>
         </div>
      </div>

      <div class="px-2 flex justify-center">
         <p class="text-xs text-gray-500 dark:text-gray-400">
            <span> 系統版本 v{{ currentVersion }} </span>
            <span class="mx-1 text-gray-400">·</span>
            <span class="text-gray-600 dark:text-gray-400">
               © {{ new Date().getFullYear() }} 國立高雄大學 & JYBK
            </span>
         </p>
      </div>
      <BlockSettingsUpdateButton />
   </div>
</template>

<script lang="ts" setup>
const { currentVersion } = useUpdater();
const discordService = useDiscord();
const openAuthorLink = (author: { nickname: string }) => {
   const url = `https://github.com/${author.nickname}`;
   window.open(url, "_blank");
};
const links = [
   {
      name: "Release",
      url: "https://patent-hub-hazel.vercel.app",
   },
   {
      name: "GitHub Repo",
      url: "https://github.com/henry753951/PatentsHub",
   },
   {
      name: "JYBK.ORG",
      url: "https://github.com/JYBK-nuk",
   },
];

const authors = [
   {
      name: "張宏宇",
      nickname: "henry753951",
      avatar: "https://avatars.githubusercontent.com/henry753951",
   },
   {
      name: "鍾秉翰",
      nickname: "binhan0713",
      avatar: "https://avatars.githubusercontent.com/binhan0713",
   },
   {
      name: "陳駿杰",
      nickname: "sam920714",
      avatar: "https://avatars.githubusercontent.com/sam920714",
   },
   {
      name: "林凱彬",
      nickname: "scott0127",
      avatar: "https://avatars.githubusercontent.com/scott0127",
   },
];

const currentAuthor = ref<{
   name: string
   nickname: string
   avatar: string
} | null>(null);
</script>

<style scoped></style>
