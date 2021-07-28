<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.sourceType"
              :items="sourceTypeItems"
              item-text="name"
              item-value="ID"
              label="来源"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.subtype"
              :items="subtypeItems"
              item-text="name"
              item-value="ID"
              label="子类别"
            ></v-select
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="object.name"
              label="名称"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.brand"
              label="品牌"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.specification"
              label="规格"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.supplierId"
              label="供应商"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.number"
              label="库存数量"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.unit"
              label="单位"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.purchasedPrice"
              label="采购价格(元)"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.standardPrice"
              label="销售价格(元)"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
              required
            ></v-text-field
          ></v-col>
        </v-row>

        <v-textarea
          label="备注"
          v-model="object.remarks"
          hint="tips"
        ></v-textarea>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import { entryProduct, editProduct, queryProduct } from "@/api/product";
import {
  querySystemDictionaryValuesByKeyId,
  querySystemDictionaryValuesByParentId,
} from "@/api/system";

export default {
  props: ["openId"],
  data: () => ({
    sourceTypeItems: [],
    subtypeItems: [],
    object: {
      sourceType: null,
      subtype: null,
      ID: "",
      name: "",
      brand: "",
      specification: "",
      supplierId: null,
      number: null,
      unit: "",
      purchasedPrice: null,
      standardPrice: null,
      deliveryCycle: "",
      remarks: "",
    },
  }),
  created() {
    this.getProductSoureTypeItems();
    if (this.openId != null) {
      queryProduct(this.openId).then((res) => {
        this.object = res.data;
      });
    }
  },
  methods: {
    getProductSoureTypeItems() {
      querySystemDictionaryValuesByKeyId(1).then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems(parentId) {
      querySystemDictionaryValuesByParentId(parentId).then((res) => {
        this.subtypeItems = res.data;
      });
    },
    entryObject() {
      entryProduct(this.object).then((res) => {
        this.$message.success("成功了");
      });
    },
    editObject() {
      editProduct(this.object).then((res) => {
        this.$message.success("成功了");
      });
    },
  },
  watch: {
    "object.sourceType": {
      handler: function (val) {
        this.object.subtype = null;
        if (val != null) {
          this.getSubtypeItems(val);
        }
      },
    },
  },
};
</script>