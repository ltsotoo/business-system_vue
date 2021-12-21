<template>
  <v-card >
    <v-card-title>产品添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="object.typeUID"
              :items="typeItems"
              item-text="name"
              item-value="UID"
              label="类型"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :rules="rules.must"
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="object.supplierUID"
              :items="supplierItems"
              item-text="name"
              item-value="UID"
              label="供应商"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model.trim="object.specification"
              label="规格"
              rows="3"
              counter
              maxlength="200"
            ></v-textarea>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.numberCount"
              label="库存数量"
              :rules="rules.number"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.unit"
              label="单位"
              :rules="rules.must"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.standardPrice"
              label="销售价格(人民币)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.standardPriceUSD"
              label="销售价格(美元)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="12">
            <v-textarea
              label="备注"
              v-model="object.remarks"
              rows="3"
              counter
              maxlength="500"
            ></v-textarea>
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
import { entryProduct } from "@/api/product";
import { querySuppliers } from "@/api/supplier";
import { queryProductTypes } from "@/api/productType";
export default {
  props: {
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    typeItems: [],
    supplierItems: [],
    object: {
      name: "",
      brand: "",
      specification: "",
      supplierUID: "",
      number: 0,
      numberCount: 0,
      unit: "",
      purchasedPrice: 0,
      standardPrice: 0,
      standardPriceUSD: 0,
      deliveryCycle: "",
      remarks: "",
      typeUID: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      number: [(v) => /^((0)|([1-9]\d*))$/.test(v) || "大于等于零的整数"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
  }),
  created() {
    this.getTypeItems();
    this.getSupplierItems();
  },
  methods: {
    getTypeItems() {
      queryProductTypes().then((res) => {
        this.typeItems = res.data;
      });
    },
    getSupplierItems() {
      querySuppliers().then((res) => {
        this.supplierItems = res.data;
      });
    },
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        this.object.number = this.object.numberCount;
        entryProduct(this.object).then((res) => {
          this.$message.success("添加成功了!");
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