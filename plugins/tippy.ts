import VueTippy from "vue-tippy";
import type { TippyPluginOptions } from "vue-tippy";

import "tippy.js/dist/tippy.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueTippy, {
    component: "Tippy",
    directive: "tippy",
    defaultProps: {
      animation: "shift-away",
      delay: [200, 100],
      trigger: "mouseenter",
      touch: ["hold", 500],
      arrow: false,
    },
  } satisfies TippyPluginOptions);
});
