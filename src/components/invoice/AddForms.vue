<template>
  <v-card>
    <v-card-title>发票添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model.number="object.money"
              label="金额(元)"
              :rules="rules.money"
            >
            </v-text-field>
          </v-col>
          <v-col cols="9">
            <v-text-field
              v-model.number="object.code"
              label="发票号"
              :rules="rules.must"
              counter
              maxlength="100"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { createInvoice } from "@/api/invoice";
export default {
  props: {
    openUID: {
      type: String,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "大于等于零"],
    },
    object: {
      contractUID: "",
      code: "",
      money: 0,
    },
  }),
  created() {
    this.object.contractUID = this.openUID;
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        createInvoice(this.object).then((res) => {
          this.$message.success("添加成功了!");
          this.closeDialog();
        });
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>