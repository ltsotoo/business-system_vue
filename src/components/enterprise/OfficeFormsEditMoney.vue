<template>
  <v-card>
    <v-card-title>公司(办事处)提成/业务费增加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.money"
              label="可提成金额(元)增加"
              :rules="rules.money"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.moneyCold"
              label="年底提成金额(元)增加"
              :rules="rules.money"
              counter
              maxlength="50"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.businessMoney"
              label="可用业务费金额(元)增加"
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
import { editOfficeMoney } from "@/api/oadrp";
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
      UID: "",
      money: 0,
      moneyCold: 0,
      businessMoney: 0,
    },
    rules: {
      money: [
        (v) => /^-?\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
  }),
  created() {
    this.object.UID = this.openUID;
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        editOfficeMoney(this.object).then((res) => {
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