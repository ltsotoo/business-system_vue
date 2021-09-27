<template>
  <v-container>
    <productEntryForms ref="productEntryForms" :parentFun="updateSubmitBtnDisable" />
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
import productEntryForms from "@/components/product/EntryForms";

export default {
  components: {
    productEntryForms,
  },
  data: () => ({
    submitBtnDisable: false,
  }),
  methods: {
    submit() {
      this.updateSubmitBtnDisable(true);
      this.$refs.productEntryForms.entryObject();
    },
    updateSubmitBtnDisable(status) {
      this.submitBtnDisable = status;
    },
  },
};
</script>