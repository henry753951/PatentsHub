/**
 * @type {import('electron-builder').Configuration}
 */
const builderConfig = {
   appId: "com.jybk.patentshub",
   productName: "PatentsHub",
   directories: {
      output: ".output/electron",
   },
   icon: "assets/electron/icon-512x512.png",
   files: [
      {
         from: ".output/public",
         to: "public",
      },
      {
         from: "node_modules/@prisma/client/node_modules/.prisma",
         to: "node_modules/.prisma",
      },
      {
         from: "node_modules/@prisma",
         to: "node_modules/@prisma",
      },
      "dist-electron/**/*",
      "package.json",
   ],
   extraResources: [
      {
         from: ".importSystem/app.db",
         to: "app.db",
      },
      {
         from: "assets/electron",
         to: "assets",
      },
   ],
   removePackageScripts: true,
   compression: "maximum",
   asar: true, // 啟用 ASAR 壓縮
   win: {
      icon: "assets/electron/icon-512x512.png",
      target: [
         {
            target: "nsis", // Windows 使用 NSIS 安裝程式
         },
      ],
   },
   mac: {
      target: [
         {
            target: "dmg", // macOS 使用 DMG 格式
         },
      ],
   },
   linux: {
      target: [
         {
            target: "AppImage", // Linux 使用 AppImage 格式
         },
      ],
   },
};

module.exports = builderConfig;
