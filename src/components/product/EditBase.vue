<template>
  <v-card class="mx-auto">
    <v-card-title>产品基础编辑</v-card-title>
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
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { editProduct } from "@/api/product";
import { querySuppliers } from "@/api/supplier";
import { queryProductTypes } from "@/api/productType";
export default {
  props: {
    openItem:{
      type:Object
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
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
    },
  }),
  created() {
    this.object = this.openItem;
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
      if (this.validateForm()) {
        this.object.number = this.object.numberCount;
        editProduct(this.object).then((res) => {
          this.$message.success("编辑成功了!");
          this.refresh();
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