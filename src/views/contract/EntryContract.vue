<template>
  <v-container>
    <contractForms ref="contractForms" :parentFun="updateSubmitBtnDisable" />
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
import contractForms from "@/components/contract/ContractForms";

export default {
  components: {
    contractForms,
  },
  data: () => ({
    submitBtnDisable: false,
  }),
  methods: {
    submit() {
      this.updateSubmitBtnDisable(true);
      this.$refs.contractForms.entryObject();
    },
    updateSubmitBtnDisable(status) {
      this.submitBtnDisable = status;
    },
  },

  computed: {},
};
</script>