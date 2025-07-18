<template>
   <component
      :is="elementType"
      :class="
         buttonStyles({
            hasIcon: !!icon,
            disabled: disabled || loading,
            variant: variant,
            size: size,
            class: props.class,
         })
      "
      :disabled="disabled || loading"
      v-bind="forwarded"
   >
      <slot name="iconLeft">
         <div
            v-if="icon && iconPlacement == 'left'"
            class="group-hover:translate-x-100 flex w-0 shrink-0 translate-x-[0%] items-center justify-center pr-0 opacity-0 transition-all duration-200 group-hover:w-6 group-hover:pr-2 group-hover:opacity-100"
         >
            <Icon
               :name="icon"
               class="size-5"
            />
         </div>
      </slot>
      <slot name="loading">
         <Icon
            v-if="loading"
            class="size-4 shrink-0"
            :name="loadingIcon"
         />
      </slot>
      <slot>
         <span v-if="text">{{ text }}</span>
      </slot>
      <slot name="iconRight">
         <div
            v-if="icon && iconPlacement == 'right'"
            class="flex w-0 shrink-0 translate-x-[100%] items-center justify-center pl-0 opacity-0 transition-all duration-200 group-hover:w-6 group-hover:translate-x-0 group-hover:pl-2 group-hover:opacity-100"
         >
            <Icon
               :name="icon"
               class="size-5"
            />
         </div>
      </slot>
   </component>
</template>

<script setup lang="ts">
import { reactiveOmit } from "@vueuse/core";
import { useForwardProps } from "reka-ui";
import type { NuxtLinkProps } from "#app/components";
import type { VariantProps } from "class-variance-authority";

  type ButtonProps = VariantProps<typeof buttonStyles>;
const props = withDefaults(
   defineProps<
     NuxtLinkProps & {
        /** The type for the button */
        type?: "button" | "submit" | "reset"
        /** Whether the button is disabled */
        disabled?: boolean
        /** Whether the button is loading */
        loading?: boolean
        /** The action to perform when the button is clicked */
        onClick?: any
        /** The element to render the button as */
        as?: string
        /** Custom class(es) to add to parent element */
        class?: any
        /** The variant of the button */
        variant?: ButtonProps["variant"]
        /** The size of the button */
        size?: ButtonProps["size"]
        /** The text to display in the button */
        text?: string
        /** Should the icon be displayed on the `left` or the `right`? */
        iconPlacement?: "left" | "right"
        /** The icon to display in the button */
        icon?: string
        /** The icon to display when the button is loading */
        loadingIcon?: string
     }
   >(),
   {
      type: "button",
      loadingIcon: "line-md:loading-loop",
      iconPlacement: "left",
      loading: false,
   },
);

const elementType = computed(() => {
   if (props.as) return props.as;
   if (props.href || props.to || props.target) return resolveComponent("NuxtLink");
   return "button";
});

const forwarded = useForwardProps(
   reactiveOmit(
      props,
      "class",
      "text",
      "icon",
      "iconPlacement",
      "size",
      "variant",
      "as",
      "loading",
      "disabled",
      "loadingIcon",
   ),
);
</script>
