<template>
  <v-container>
    <expenseForms ref="expenseForms" :parentFun="updateSubmitBtnDisable" />
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
import expenseForms from "@/components/expense/Forms";
export default {
  components: {
    expenseForms,
  },
  data: () => ({
    submitBtnDisable: false,
  }),
  methods: {
    submit() {
      this.updateSubmitBtnDisable(true);
      this.$refs.expenseForms.entryObject();
    },
    updateSubmitBtnDisable(status) {
      this.submitBtnDisable = status;
    },
  },
};
</script>