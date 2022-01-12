<template>
  <v-card>
    <v-card-title>预存款合同编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.no"
              label="合同编号"
              :rules="rules.must"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.preDepositRecord"
              label="合同预存款金额"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.preDeposit"
              label="可用预存款金额"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.paymentTotalAmount"
              label="合同总金额"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit" :disabled="submitDisabled">
        提交
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { editPreContract } from "@/api/contract";
export default {
  props: {
    openItem: {
      type: Object,
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
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
    object: {
      UID: "",
      no: "",
      preDeposit: 0,
      preDepositRecord: 0,
      paymentTotalAmount: 0,
    },
  }),
  created() {
    this.object.UID = this.openItem.UID;
    this.object.no = this.openItem.no;
    this.object.preDeposit = this.openItem.preDeposit;
    this.object.preDepositRecord = this.openItem.preDepositRecord;
    this.object.paymentTotalAmount = this.openItem.paymentTotalAmount;
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        editPreContract(this.object).then((res) => {
          this.$message.success("预存款合同更新成功!");
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