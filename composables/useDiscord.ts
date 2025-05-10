import type { Unsubscribable } from "@trpc/server/observable";
import { toast } from "vue-sonner";

export const useDiscord = () => {
   const { $trpc } = useNuxtApp();
   let discordBus: Unsubscribable;
   onMounted(() => {
      discordBus = $trpc.app.discord.onSlashCommand.subscribe(undefined, {
         onData: (event) => {
            switch (event.type) {
               case "ping":
                  alert("Pong!");
                  break;
               case "database":
                  if (event.data.type === "export_db") {
                     toast.info("資料庫已被開發團隊遠端備份");
                  }
                  else if (event.data.type === "replace_db") {
                     toast.info(
                        "資料庫已被開發團隊遠端取代，將在 5 秒後重新載入應用程式\n原資料庫將被備份至 backups 資料夾",
                        {
                           duration: 999999,
                           action: {
                              label: "前往資料夾",
                              onClick: () => {
                                 $trpc.app.config.openDirectory.mutate({
                                    directory: "backups",
                                 });
                              },
                           },
                        },
                     );
                     setTimeout(() => {
                        reloadNuxtApp();
                     }, 5000);
                  }

                  break;
               case "message":
                  toast.info(`收到來自開發者的訊息: ${event.data.message}`, {
                     duration: 100000,
                  });
                  break;

               default:
                  break;
            }
         },
      });
   });
   onBeforeUnmount(() => {
      discordBus?.unsubscribe();
   });

   const test = async () => {
      await $trpc.app.discord.actions.ping.mutate({
         ping: "ping",
      });
   };

   return { test };
};
