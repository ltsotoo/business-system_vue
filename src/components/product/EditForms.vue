<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="类型"
              v-model="object.sourceType.text"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="子类别"
              v-model="object.subtype.text"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.specification"
              label="规格"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="供应商"
              v-model="object.supplier.name"
              disabled
            ></v-text-field>
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
              disabled
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
import { editProduct, queryProduct } from "@/api/product";

export default {
  props: {
    openUID: {
      type: String,
      default: "",
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
    this.getObject();
  },
  methods: {
    getObject() {
      queryProduct(this.openUID).then((res) => {
        this.object = res.data;
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
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>