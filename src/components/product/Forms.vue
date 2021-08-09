<template>
  <v-form ref="form" :readonly="openType == 1">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row v-if="openType > 0">
          <v-col cols="4">
            <v-text-field
              label="来源"
              v-model="object.sourceType.text"
              :disabled="openType == 2"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="子类别"
              v-model="object.subtype.text"
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
              :rules="rules.sourceType"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.subtypeID"
              :items="subtypeItems"
              item-text="text"
              item-value="ID"
              label="子类别"
              :rules="rules.subtype"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              :disabled="openType == 2"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
              :disabled="openType == 2"
              :rules="rules.brand"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.specification"
              label="规格"
              :disabled="openType == 2"
              :rules="rules.specification"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4" v-if="openType > 0">
            <v-text-field
              label="供应商"
              v-model="object.supplier.name"
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
              :rules="rules.supplier"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.number"
              label="库存数量"
              :rules="rules.number"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.unit"
              label="单位"
              :disabled="openType == 2"
              :rules="rules.unit"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.purchasedPrice"
              label="采购价格(元)"
              :rules="rules.purchasedPrice"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.standardPrice"
              label="销售价格(元)"
              :rules="rules.standardPrice"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
              :rules="rules.deliveryCycle"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="备注"
              v-model="object.remarks"
              :rules="rules.remarks"
            ></v-textarea>
          </v-col>
        </v-row>
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
    rules: {
      sourceType: [(v) => !!v || "必填项！"],
      subtype: [(v) => !!v || "必填项！"],
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 12) || "名称的长度必须小于12个字符",
      ],
      brand: [
        (v) => v.length == 0 || v.length <= 10 || "品牌的长度必须小于10个字符",
      ],
      specification: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 20) || "规格的长度必须小于20个字符",
      ],
      number: [(v) => /^[0-9]*$/.test(v) || "库存数量必须为数字"],
      unit: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 10) || "单位的长度必须小于10个字符",
      ],
      purchasedPrice: [(v) => /^[0-9]*$/.test(v) || "采购价格(元)必须为数字"],
      standardPrice: [(v) => /^[0-9]*$/.test(v) || "销售价格(元)必须为数字"],
      deliveryCycle: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 10) || "供货周期的长度必须小于10个字符",
      ],
      remarks: [
        (v) =>
          v.length == 0 || v.length <= 100 || "备注的长度必须小于100个字符",
      ],
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
      if (this.validateForm()) {
        entryProduct(this.object).then((res) => {
          this.$message.success("录入成功了!");
        });
      }
      if (this.parentFun) {
        this.parentFun(false);
      }
    },
    editObject() {
      editProduct(this.object).then((res) => {
        this.$message.success("编辑成功了!");
        if (this.parentFun) {
          this.parentFun();
        }
      });
    },
    validateForm() {
      return this.$refs.form.validate();
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