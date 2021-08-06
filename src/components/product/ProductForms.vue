<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row v-if="openType > 0">
          <v-col cols="4">
            <v-text-field
              label="来源"
              v-model="object.sourceType.text"
              :readonly="openType == 1"
              :disabled="openType == 2"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="子类别"
              v-model="object.subtype.text"
              :readonly="openType == 1"
              :disabled="openType == 2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="4">
            <v-select
              v-model="object.sourceTypeID"
              :items="sourceTypeItems"
              item-text="text"
              item-value="ID"
              label="来源"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.subtypeID"
              :items="subtypeItems"
              item-text="text"
              item-value="ID"
              label="子类别"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="object.name"
              label="名称"
              :readonly="openType == 1"
              :disabled="openType == 2"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.brand"
              label="品牌"
              :readonly="openType == 1"
              :disabled="openType == 2"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.specification"
              label="规格"
              :readonly="openType == 1"
              :disabled="openType == 2"
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4" v-if="openType > 0">
            <v-text-field
              label="供应商"
              v-model="object.supplier.name"
              :readonly="openType == 1"
              :disabled="openType == 2"
            ></v-text-field>
          </v-col>
          <v-col cols="4" v-else>
            <v-select
              v-model="object.supplierID"
              :items="supplierItems"
              item-text="name"
              item-value="ID"
              label="供应商"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.number"
              label="库存数量"
              :readonly="openType == 1"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.unit"
              label="单位"
              :readonly="openType == 1"
              :disabled="openType == 2"
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.purchasedPrice"
              label="采购价格(元)"
              :readonly="openType == 1"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.standardPrice"
              label="销售价格(元)"
              :readonly="openType == 1"
            ></v-text-field
          ></v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
              :readonly="openType == 1"
            ></v-text-field
          ></v-col>
        </v-row>

        <v-textarea
          label="备注"
          v-model="object.remarks"
          :readonly="openType == 1"
        ></v-textarea>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import { entryProduct, editProduct, queryProduct } from "@/api/product";
import { querySuppliers } from "@/api/supplier";
import { queryDictionaries } from "@/api/dictionary";

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
    supplierItems: [],
    object: {
      sourceTypeID: null,
      subtypeID: null,
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

      supplier: {},
      sourceType: { text: "" },
      subtype: { text: "" },
    },
  }),
  created() {
    if (this.openType != 1) {
      this.getProductSoureTypeItems();
      this.getSupplierItems();
    }
    if (this.openID != null) {
      this.getObject();
    }
  },
  methods: {
    getProductSoureTypeItems() {
      queryDictionaries("product_source_type").then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems(sourceType) {
      queryDictionaries("product_subtype", sourceType).then((res) => {
        this.subtypeItems = res.data;
      });
    },
    getSupplierItems() {
      querySuppliers().then((res) => {
        this.supplierItems = res.data;
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
  computed: {},
  watch: {
    "object.sourceTypeID": {
      handler: function (val) {
        if (this.openType === 0) {
          this.object.subtypeID = null;
        }
        if (val != null && this.openType != 1) {
          this.getSubtypeItems(val);
        }
      },
    },
  },
};
</script>