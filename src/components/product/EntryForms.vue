<template>
  <v-card class="mx-auto">
    <v-card-title>产品添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="sourceType"
              :items="sourceTypeItems"
              item-text="text"
              label="类型"
              return-object
              @change="getSubtypeItems"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.subtypeUID"
              :items="subtypeItems"
              item-text="text"
              item-value="UID"
              label="子类型"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.supplierUID"
              :items="supplierItems"
              item-text="name"
              item-value="UID"
              label="供应商"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :rules="rules.must"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
              :rules="rules.must"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.specification"
              label="规格"
              counter
              maxlength="50"
            ></v-text-field>
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
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.purchasedPrice"
              label="采购/成本价格(人民币)"
              :rules="rules.money"
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
          <v-col cols="12">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
              :rules="rules.must"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="备注"
              v-model="object.remarks"
              auto-grow
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
import { entryProduct } from "@/api/product";
import { querySuppliers } from "@/api/supplier";
import { queryProductTypes, queryDictionaries } from "@/api/dictionary";

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
    sourceTypeItems: [],
    sourceType: {},
    subtypeItems: [],
    supplierItems: [],
    object: {
      sourceTypeUID: "",
      subtypeUID: "",
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
    },
    rules: {
      must: [(v) => !!v || "必填项！"],
      number: [(v) => /^[0-9]*$/.test(v) || "库存数量必须为大于零的整数"],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额的格式错误"],
    },
  }),
  created() {
    this.getProductSoureTypeItems();
    this.getSupplierItems();
  },
  methods: {
    getProductSoureTypeItems() {
      queryProductTypes().then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems() {
      this.subtypeItems = [];
      this.object.subtypeUID = "";
      this.object.sourceTypeUID = this.sourceType.UID;
      queryDictionaries(this.sourceType.name).then((res) => {
        this.subtypeItems = res.data;
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
        entryProduct(this.object).then((res) => {
          this.$message.success("添加成功了!");
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