<template>
  <v-card>
    <v-card-title v-if="openType == 0">产品类型添加</v-card-title>
    <v-card-title v-if="openType == 2">产品类型编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="object.name"
              label="名称"
              :rules="rules.must"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.pushMoneyPercentages"
              label="标准提成百分比(%)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.minPushMoneyPercentages"
              label="最低提成百分比(%)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.pushMoneyPercentagesUp"
              label="高出价格的提成百分比(%)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.pushMoneyPercentagesDown"
              label="低价提成下降的百分比(%)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.businessMoneyPercentages"
              label="标准业务费用百分比(%)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.businessMoneyPercentagesUp"
              label="高出价格的业务费用百分比(%)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="object.isTaskLoad"
              :items="isTaskLoadItems"
              item-text="text"
              item-value="value"
              label="是否计算任务量"
            ></v-select>
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
import { addProductType, editProductType } from "@/api/productType";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
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
    isTaskLoadItems: [
      { value: true, text: "是" },
      { value: false, text: "否" },
    ],
    submitDisabled: false,
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
    object: {
      name: "",
      pushMoneyPercentages: 0,
      minPushMoneyPercentages: 0,
      pushMoneyPercentagesUp: 0,
      pushMoneyPercentagesDown: 0,
      businessMoneyPercentages: 0,
      businessMoneyPercentagesUp: 0,
      isTaskLoad: true,
    },
  }),
  created() {
    if (this.openType == 2) {
      this.object = this.openItem;
    }
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        if (this.openType == 0) {
          addProductType(this.object).then((res) => {
            this.$message.success("添加成功了!");
            this.refresh();
            this.closeDialog();
          });
        } else {
          editProductType(this.object).then((res) => {
            this.$message.success("编辑成功了!");
            this.refresh();
            this.closeDialog();
          });
        }
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