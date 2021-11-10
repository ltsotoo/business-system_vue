<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.sourceTypeUID"
              :items="sourceTypeItems"
              item-text="text"
              item-value="UID"
              label="类型"
              :rules="rules.sourceType"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.subtypeUID"
              :items="subtypeItems"
              item-text="text"
              item-value="UID"
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
              :rules="rules.name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
              :rules="rules.brand"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.specification"
              label="规格"
              :rules="rules.specification"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="object.supplierUID"
              :items="supplierItems"
              item-text="name"
              item-value="UID"
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
              auto-grow
              rows="3"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import { entryProduct } from "@/api/product";
import { querySuppliers } from "@/api/supplier";
import { queryProductTypes, queryChilds } from "@/api/dictionary";

export default {
  props: {
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
      sourceTypeUID: "",
      subtypeUID: "",
      name: "",
      brand: "",
      specification: "",
      supplierUID: "",
      number: 0,
      unit: "",
      purchasedPrice: 0,
      standardPrice: 0,
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
        (v) => v.length == 0 || v.length <= 20 || "规格的长度必须小于20个字符",
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
    this.getProductSoureTypeItems();
    this.getSupplierItems();
  },
  methods: {
    getProductSoureTypeItems() {
      queryProductTypes().then((res) => {
        this.sourceTypeItems = res.data;
      });
    },
    getSubtypeItems(parentUID) {
      queryChilds(parentUID).then((res) => {
        this.subtypeItems = res.data;
      });
    },
    getSupplierItems() {
      querySuppliers().then((res) => {
        this.supplierItems = res.data;
      });
    },
    entryObject() {
      var _this = this;
      if (this.validateForm()) {
        entryProduct(this.object).then((res) => {
          this.$message.success("录入成功了!");
          setTimeout(function () {
            _this.$router.replace("/product");
          }, 1000);
        });
      } else {
        this.$message.error("信息填写异常，请检查后再提交！");
        if (this.parentFun) {
          this.parentFun(false);
        }
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
  watch: {
    "object.sourceTypeUID": {
      handler: function (val) {
        this.object.subtypeUID = null;
        if (val != null) {
          this.getSubtypeItems(val);
        }
      },
    },
  },
};
</script>