<template>
  <v-container>
    <customerForms ref="customerForms" :parentFun="updateSubmitBtnDisable" />
    <v-row style="margin-top: 10px" justify="center">
      <v-btn
        x-large
        color="success"
        @click="submit"
        :disabled="submitBtnDisable"
      >
        提交
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import customerForms from "@/components/customer/CustomerForms";

export default {
  components: {
    customerForms,
  },
  data: () => ({
    submitBtnDisable: false,
  }),
  methods: {
    submit() {
      this.updateSubmitBtnDisable(true);
      this.$refs.customerForms.entryObject();
    },
    updateSubmitBtnDisable(status) {
      this.submitBtnDisable = status;
    },
  },
};
</script>