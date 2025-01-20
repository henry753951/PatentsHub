import type { RouteLocationAsRelativeGeneric } from "vue-router";

declare global {
   interface INavItem {
      icon?:
        | string
        | {
           normal: string
           active: string
        }
      title: string
      tooltip?: string
      to?: RouteLocationAsRelativeGeneric
      action?: () => void
   }
   interface INavAction {
      icon: string
      title: string
      action: () => void
   }

   interface IFormStep {
      component: Component
      name: string
      description?: string
      step: number
   }
}

export {};
