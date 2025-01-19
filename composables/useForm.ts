import type {
   FlattenAndSetPathsType,
   FormOptions,
   GenericObject,
   GenericValidateFunction,
   TypedSchema,
} from "vee-validate";
import { useForm as useVeeForm } from "vee-validate";
type FormSchema<TValues extends Record<string, unknown>> =
  | FlattenAndSetPathsType<
     TValues,
        GenericValidateFunction | string | GenericObject
  >
  | undefined;

export const useForm = <
   TValues extends GenericObject = GenericObject,
   TOutput extends GenericObject = TValues,
   TSchema extends FormSchema<TValues> | TypedSchema<TValues, TOutput> = | FormSchema<TValues>
     | TypedSchema<TValues, TOutput>,
>(
   opts: FormOptions<TValues, TOutput, TSchema>,
) => {
   const cache = ref<TValues | null>(null);
   const form = useVeeForm(opts);

   watch(form.values, (values) => {
      consola.info("Caching form values", values);
      if (Object.values(values).some(v => v !== undefined)) {
         cache.value = { ...values };
      }
      else if (cache.value) {
         form.setValues(cache.value);
      }
   });

   return {
      ...form,
      cache,
   };
};
