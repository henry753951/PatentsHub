<template>
  <Primitive :as="as || 'span'" :as-child="asChild" :class="styles({ class: props.class })">
    <slot />
  </Primitive>
</template>

<script lang="ts" setup>
  import { Primitive } from "reka-ui";
  import type { PrimitiveProps } from "reka-ui";

  const props = defineProps<
    PrimitiveProps & {
      class?: any;
    }
  >();

  const styles = tv({
    base: "ml-auto text-xs tracking-widest text-muted-foreground",
  });
</script>
