import type { RouteLocationAsRelativeTyped } from "vue-router";

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
      to?: RouteLocationAsRelativeTyped
      action?: () => void
   }
   interface INavAction {
      icon: string
      title: string
      action: () => void
   }

   interface IFormStep {
      title: string
      description?: string
   }

   interface ILog {
      id?: number
      timestamp: Date
      type: "info" | "warning" | "error"
      message: string
      object?: any
   }
}

export {};
