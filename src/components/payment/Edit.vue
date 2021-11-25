<template>
  <v-card>
    <v-card-title>合同回款编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row align="center">
          <v-col cols="4">
            <v-text-field
              label="时间"
              readonly
              v-model.number="object.CreatedAt"
            ></v-text-field>
          </v-col>
          <v-col cols="8"></v-col>
          <v-col cols="4">
            <v-text-field
              label="回款金额(元)"
              v-model.number="object.money"
              :rules="rules.money"
              counter
              maxlength="500"
            ></v-text-field>
          </v-col>
          <v-col cols="8"></v-col>
          <v-col cols="12">
            <v-textarea
              label="备注"
              rows="3"
              v-model="object.remarks"
            ></v-textarea>
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
import { editPayment } from "@/api/payment";
export default {
  props: {
    parentObject: {},
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    rules: {
      money: [
        (v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "大于等于零",
      ],
    },
    object: {
      money: "",
      remarks: "",
    },
  }),
  created() {
    this.object = JSON.parse(JSON.stringify(this.parentObject));
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        editPayment(this.object).then((res) => {
          this.$message.success("编辑成功了！");
          this.parentObject.money = this.object.money;
          this.parentObject.remarks = this.object.remarks;
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