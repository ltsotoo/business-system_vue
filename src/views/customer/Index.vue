<template>
  <v-container>
    <customer ref="customer" />
    <company style="margin-top: 20px" :refreshCustomers="queryCustomers" />
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
  methods: {
    queryCustomers() {
      this.$refs.customer.queryCustomers();
    },
  },
};
</script>