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
              :disabled="readonly"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.subtype"
              :items="subtypeItems"
              item-text="name"
              item-value="ID"
              label="子类别"
              :disabled="readonly"
            ></v-select
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="object.name"
              label="名称"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.brand"
              label="品牌"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.specification"
              label="规格"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.supplierID"
              label="供应商"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.number"
              label="库存数量"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.unit"
              label="单位"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.purchasedPrice"
              label="采购价格(元)"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.standardPrice"
              label="销售价格(元)"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
              :readonly="readonly"
            ></v-text-field
          ></v-col>
        </v-row>

        <v-textarea
          label="备注"
          v-model="object.remarks"
          :readonly="readonly"
        ></v-textarea>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import { entryProduct, editProduct, queryProduct } from "@/api/product";
import {
  querySystemDictionaryValuesByKeyID,
  querySystemDictionaryValuesByParentID,
} from "@/api/base";

export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openID: {
      type: Number,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
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
      supplierID: null,
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
    if (this.openID != null) {
      this.getObject();
    }
  },
  methods: {
    getProductSoureTypeItems() {
      querySystemDictionaryValuesByKeyID(1).then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems(parentId) {
      querySystemDictionaryValuesByParentID(parentId).then((res) => {
        this.subtypeItems = res.data;
      });
    },
    getObject() {
      queryProduct(this.openID).then((res) => {
        this.object = res.data;
      });
    },
    entryObject() {
      entryProduct(this.object).then((res) => {
        this.$message.success("录入成功了!");
        if (this.parentFun) {
          this.parentFun(false);
        }
      });
    },
    editObject() {
      editProduct(this.object).then((res) => {
        this.$message.success("编辑成功了!");
        if (this.parentFun) {
          this.parentFun();
        }
      });
    },
  },
  computed: {
    readonly() {
      if (this.openType == 0) {
        return false;
      } else {
        return true;
      }
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