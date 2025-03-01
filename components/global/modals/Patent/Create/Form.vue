<template>
   <Form
      v-slot="{ values }"
      :validation-schema="patentCreation.currentSchema"
      keep-values
      @submit="patentCreation.nextStep"
   >
      <template v-if="patentCreation.currentStep.value === 0">
         <label for="draftTitle">Name</label>
         <Field name="draftTitle" />
         <ErrorMessage name="draftTitle" />
      </template>
      <template
         v-else-if="patentCreation.currentStep.value === 1"
      >
      </template>
      {{ values }}
      <Button type="submit">
         {{
            patentCreation.currentStep.value ===
               patentCreation.steps.length - 1
               ? "新增專利"
               : "下一步"
         }}
      </Button>
   </Form>
</template>

<script lang="ts" setup>
import { Form, Field, ErrorMessage } from "vee-validate";
const patentCreation = usePatent().useCreation();

defineExpose({
   patentCreation,
});
</script>

<style scoped>

</style>
