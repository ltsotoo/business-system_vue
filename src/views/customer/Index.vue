<template>
  <v-container>
    <customer ref="customer" v-if="nos.includes('04-01-01')"/>
    <company style="margin-top: 20px" :refreshCustomers="queryCustomers" v-if="nos.includes('04-02-01')"/>
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
  data: () => ({
    nos: [],
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    queryCustomers() {
      this.$refs.customer.queryCustomers();
    },
  },
};
</script>