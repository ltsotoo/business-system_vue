<template>
  <v-container>
    <v-card> <employeeForms :openType="1" /> </v-card>
  </v-container>
</template>

<script>
import employeeForms from "@/components/employee/Forms";
export default {
  components: {
    employeeForms,
  },
};
</script>