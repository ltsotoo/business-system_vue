<template>
  <v-card>
    <v-card-title>公司(办事处)信息编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :rules="rules.must"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.money"
              label="可提成金额(元)"
              :rules="rules.money"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.moneyCold"
              label="年底提成金额(元)"
              :rules="rules.money"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.taskLoad"
              label="今年目标量(元)"
              :rules="rules.money"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.targetLoad"
              label="今年完成量(元)"
              :rules="rules.money"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.businessMoney"
              label="可用业务费金额(元)"
              :rules="rules.money"
              counter
              maxlength="50"
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
import { queryOffice, editOffice } from "@/api/oadrp";
export default {
  props: {
    openUID: {
      type: String,
      default: "",
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    object: {
      number: "",
      name: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [
        (v) => /^-?\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryOffice(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        editOffice(this.object).then((res) => {
          this.$message.success("编辑成功了！");
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