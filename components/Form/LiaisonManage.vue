<script setup lang="ts">
import { ref } from "vue";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

const liaisons = ref([
   {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      department: "Sales",
      position: "Manager",
   },
   {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      department: "Marketing",
      position: "Director",
   },
   {
      id: "3",
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: "555-123-4567",
      department: "HR",
      position: "Specialist",
   },
   {
      id: "4",
      name: "Bob Brown",
      email: "bob.brown@example.com",
      phone: "444-555-6666",
      department: "IT",
      position: "Developer",
   },
]);
</script>

<template>
   <div class="hello px-8">
      <DataTable
         :value="liaisons"
         dataKey="id"
         responsiveLayout="scroll"
      >
         <Column
            selectionMode="multiple"
            headerStyle="width: 3em"
         ></Column>
         <Column
            field="name"
            header="Name"
         ></Column>
         <Column
            field="email"
            header="Email"
         ></Column>
         <Column
            field="phone"
            header="Phone"
         ></Column>
         <Column
            field="department"
            header="Department"
         ></Column>
         <Column
            field="position"
            header="Position"
         ></Column>
      </DataTable>
   </div>
</template>

<style>
@import url("https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css");
@import url("https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500&display=swap");
</style>