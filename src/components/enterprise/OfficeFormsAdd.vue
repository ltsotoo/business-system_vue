<template>
  <v-card>
    <v-card-title>公司添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :rules="rules.must"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.businessMoney"
              label="初始业务费用金额(元)"
              :rules="rules.money"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.money"
              label="初始提成金额(元)"
              :rules="rules.money"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.taskLoad"
              label="初始目标金额(元)"
              :rules="rules.money"
            >
            </v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          rounded
          @click="submit"
          :disabled="submitDisabled"
        >
          提交
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { entryOffice } from "@/api/oadrp";
export default {
  props: {
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
    parentObj: {
      type: Object,
    },
  },
  data: () => ({
    submitDisabled: false,
    object: {
      number: "",
      name: "",
      businessMoney: 0,
      money: 0,
      taskLoad: 0,
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
  }),
  methods: {
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        entryOffice(this.object).then((res) => {
          this.$message.success("录入成功了！");
          this.refresh();
          this.closeDialog();
        });
      } else {
        this.submitDisabled = false;
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>