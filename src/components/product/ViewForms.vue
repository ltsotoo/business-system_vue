<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="类型"
              v-model="object.sourceType.text"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="子类别"
              v-model="object.subtype.text"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.specification"
              label="规格"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="供应商"
              v-model="object.supplier.name"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.number"
              label="库存数量"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.unit"
              label="单位"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.purchasedPrice"
              label="采购价格(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.number="object.standardPrice"
              label="销售价格(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-textarea
              label="备注"
              v-model="object.remarks"
              readonly
              v-if="object.remarks != ''"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import { queryProduct } from "@/api/product";

export default {
  props: {
    openUID: {
      type: String,
      default: "",
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
      unit: "",
      purchasedPrice: 0,
      standardPrice: 0,
      deliveryCycle: "",
      remarks: "",

      supplier: {},
      sourceType: { text: "" },
      subtype: { text: "" },
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
  },
};
</script>