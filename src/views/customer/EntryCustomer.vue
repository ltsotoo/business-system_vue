<template>
  <v-container>
    <customerForms ref="customerForms"/>
    <v-row style="margin-top: 10px" justify="center">
      <v-btn x-large color="success" @click="submit"> 提交 </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import customerForms from "@/components/customer/CustomerForms";

export default {
  components: {
    customerForms,
  },
  methods: {
    submit() {
      this.$refs.customerForms.entryObject();
    },
  },
};
</script>