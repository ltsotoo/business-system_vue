<template>
  <v-container>
    <productForms ref="productForms" :parentFun="updateSubmitBtnDisable" />
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
import productForms from "@/components/product/Forms";

export default {
  components: {
    productForms,
  },
  data: () => ({
    submitBtnDisable: false,
  }),
  methods: {
    submit() {
      this.updateSubmitBtnDisable(true);
      this.$refs.productForms.entryObject();
    },
    updateSubmitBtnDisable(status) {
      this.submitBtnDisable = status;
    },
  },
};
</script>