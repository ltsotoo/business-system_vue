<template>
  <v-container>
    <v-card>
        <employeeForms />
    </v-card>
  </v-container>
</template>

<script>
import employeeForms from "@/components/employee/EmployeeForms";
export default {
  components: {
    employeeForms,
  },
};
</script>