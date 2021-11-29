<template>
  <v-card class="mx-auto">
    <v-card-title>产品入库</v-card-title>
    <v-card-subtitle>
      <v-form ref="form" disabled>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.type.name"
              label="类型"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.supplier.name"
              label="供货商"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model.trim="object.specification"
              label="规格"
              rows="1"
              auto-grow
            ></v-textarea>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.numberCount"
              label="库存数量"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.number"
              label="可售数量"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field v-model="object.unit" label="单位"></v-text-field>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model.number="object.purchasedPrice"
            label="采购/成本价格(人民币)"
            disabled
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model.number="object.standardPrice"
            label="销售价格(人民币)"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model.number="object.standardPriceUSD"
            label="销售价格(美元)"
          ></v-text-field>
        </v-col>
      </v-row>
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
import { editProductPrice, queryProduct } from "@/api/product";

export default {
  props: {
    openUID: {
      type: String,
      default: "",
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
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

      supplier: {},
      sourceType: { text: "" },
      subtype: { text: "" },
    },
    rules: {
      number: [(v) => /^[0-9]*$/.test(v) || "必须为大于零的整数"],
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
    submit() {
      if (this.validateForm()) {
        editProductPrice(this.object).then((res) => {
          this.$message.success("价格编辑成功了!");
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