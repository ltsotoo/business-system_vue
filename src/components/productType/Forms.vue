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
          <v-col cols="4">
            <v-text-field
              v-model.number="object.pushMoneyPercentages"
              label="标准提成百分比"
              :rules="rules.pushMoneyPercentages"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.pushMoneyPercentagesUp"
              label="提成上涨百分比"
              :rules="rules.pushMoneyPercentages"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.pushMoneyPercentagesDown"
              label="提成下降百分比"
              :rules="rules.pushMoneyPercentages"
            ></v-text-field>
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
    rules: {
      must: [(v) => !!v || "必填项"],
      pushMoneyPercentages: [
        (v) => /^[0-9]*(\.[0-9]{1,5})?$/.test(v) || "格式错误",
      ],
    },
    object: {
      name: "",
      pushMoneyPercentages: 0,
      pushMoneyPercentagesUp: 0,
      pushMoneyPercentagesDown: 0,
    },
  }),
  created() {
    if (this.openType == 2) {
      this.object = this.openItem;
    }
  },
  methods: {
    submit() {
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
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>