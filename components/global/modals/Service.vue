<template>
   <div
      class="fixed z-50 flex items-center justify-center"
      data-modals
   >
      <ModalsBase
         v-for="modal in modals"
         :key="modal.id"
         :modal-name="modal.modalName"
         :props="modal.props"
         :open="modal.isOpen"
         @close="close(modal.id, modal.id.startsWith('temp'))"
      />
   </div>
</template>

<script setup lang="ts">
const { modals, close } = useModals();
</script>
