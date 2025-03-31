<script setup lang="ts" generic="U extends ZodAny">
import type { ZodAny } from "zod";
import type { Config, ConfigItem, Shape } from "./interface";
import { computed, inject } from "vue";
import { DEFAULT_ZOD_HANDLERS, INPUT_COMPONENTS } from "./constant";
import useDependencies from "./dependencies";
import type { FormContext, GenericObject } from "vee-validate";

const props = defineProps<{
   fieldName: string
   shape: Shape
   config?: ConfigItem | Config<U>
}>();

function isValidConfig(config: any): config is ConfigItem {
   return !!config?.component;
}

const form = inject<FormContext<GenericObject>>("_form");
if (!form) {
   throw new Error("❌ AutoFormField 必須在 <AutoForm> 或 <Form> 中使用，未提供 _form context");
}

const delegatedProps = computed(() => {
   if (["ZodObject", "ZodArray"].includes(props.shape?.type))
      return { schema: props.shape?.schema };
   return undefined;
});

const resolvedComponent = computed(() => {
   if (isValidConfig(props.config)) {
      return typeof props.config.component === "string"
         ? INPUT_COMPONENTS[props.config.component!]
         : props.config.component;
   }
   else {
      return INPUT_COMPONENTS[DEFAULT_ZOD_HANDLERS[props.shape.type]];
   }
});

const { isDisabled, isHidden, isRequired, overrideOptions } = useDependencies(props.fieldName);
</script>

<template>
   <component
      :is="resolvedComponent"
      v-if="!isHidden"
      :field-name="fieldName"
      :label="shape.schema?.description"
      :required="isRequired || shape.required"
      :options="overrideOptions || shape.options"
      :disabled="isDisabled"
      :config="config"
      v-bind="delegatedProps"
      :model-value="form.values[fieldName]"
      @update:model-value="(value) => form.setFieldValue(fieldName, value)"
   >
      <slot />
   </component>
</template>
