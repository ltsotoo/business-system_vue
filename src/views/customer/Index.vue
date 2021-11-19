<template>
  <v-container>
    <customer />
    <company style="margin-top: 20px" />
  </v-container>
</template>

<script>
import company from "./Company";
import customer from "./Customer";

export default {
  components: {
    customer,
    company,
  },
};
</script>