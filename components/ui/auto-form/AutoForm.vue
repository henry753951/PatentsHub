<script setup lang="ts" generic="T extends ZodObjectOrWrapped">
import { Form } from "@/components/ui/form";
import AutoFormField from "./AutoFormField.vue";
import { computed, toRefs, provide } from "vue";
import type { z, ZodAny } from "zod";
import type { FormContext, GenericObject } from "vee-validate";
import type { Config, ConfigItem, Dependency, Shape } from "./interface";
import { toTypedSchema } from "@vee-validate/zod";
import {
   getBaseSchema,
   getBaseType,
   getDefaultValueInZodStack,
   getObjectFormSchema,
   type ZodObjectOrWrapped,
} from "./utils";
import { provideDependencies } from "./dependencies";

const props = defineProps<{
   schema: T
   form?: FormContext<GenericObject>
   fieldConfig?: Config<z.infer<T>>
   dependencies?: Dependency<z.infer<T>>[]
}>();

const emits = defineEmits<{
   submit: [event: z.infer<T>]
}>();

const { dependencies } = toRefs(props);
provideDependencies(dependencies);

// 建立每個欄位的 schema metadata
const shapes = computed(() => {
   const val: Record<string, Shape> = {};
   const baseSchema = getObjectFormSchema(props.schema);
   const shape = baseSchema.shape;
   for (const name in shape) {
      const item = shape[name] as ZodAny;
      const baseItem = getBaseSchema(item) as ZodAny;
      let options = "values" in baseItem._def ? baseItem._def.values : undefined;
      if (!Array.isArray(options) && typeof options === "object")
         options = Object.values(options);

      val[name] = {
         type: getBaseType(item),
         default: getDefaultValueInZodStack(item),
         options,
         required: !["ZodOptional", "ZodNullable"].includes(item._def.typeName),
         schema: baseItem,
      };
   }
   return val;
});

// 用於 slot 擴充
const fields = computed(() => {
   const val: Record<string, { shape: Shape, fieldName: string, config: ConfigItem }> = {};
   for (const key in shapes.value) {
      val[key] = {
         shape: shapes.value[key],
         config: props.fieldConfig?.[key] as ConfigItem,
         fieldName: key,
      };
   }
   return val;
});

const formComponent = computed(() => props.form ? "form" : Form);
const formSchema = toTypedSchema(props.schema);

const formComponentProps = computed(() => {
   if (props.form) {
      return {
         onSubmit: props.form.handleSubmit((val) => {
            emits("submit", val);
         }),
      };
   }
   else {
      return {
         keepValues: true,
         validationSchema: formSchema,
         onSubmit: (val: GenericObject) => {
            emits("submit", val);
         },
      };
   }
});

// 將 form context 提供給 AutoFormField
if (props.form) {
   provide("_form", props.form);
}
</script>

<template>
   <component
      :is="formComponent"
      v-bind="formComponentProps"
   >
      <slot
         name="customAutoForm"
         :fields="fields"
      >
         <template
            v-for="(shape, key) of shapes"
            :key="key"
         >
            <slot
               :shape="shape"
               :name="key.toString()"
               :field-name="key.toString()"
               :config="fieldConfig?.[key as keyof typeof fieldConfig]"
            >
               <AutoFormField
                  :config="fieldConfig?.[key as keyof typeof fieldConfig]"
                  :field-name="key.toString()"
                  :shape="shape"
               />
            </slot>
         </template>
      </slot>

      <slot :shapes="shapes" />
   </component>
</template>
