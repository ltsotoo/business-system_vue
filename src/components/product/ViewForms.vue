<template>
  <v-card class="mx-auto">
    <v-card-title>产品查看</v-card-title>
    <v-card-subtitle>
      <v-form ref="form" readonly>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.sourceType.text"
              label="类型"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.subtype.text"
              label="子类型"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.supplier.name"
              label="供货商"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="名称"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.brand"
              label="品牌"
            ></v-text-field>
          </v-col>
          <v-col cols="4"></v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.specification"
              label="规格"
            ></v-text-field>
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
          <v-col cols="4">
            <v-text-field
              v-model.number="object.purchasedPrice"
              label="采购/成本价格(人民币)"
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
          <v-col cols="12">
            <v-text-field
              v-model="object.deliveryCycle"
              label="供货周期"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="备注"
              v-model="object.remarks"
              auto-grow
              rows="1"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryProduct } from "@/api/product";
export default {
  props: {
    openItem: {
      type: Object,
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

      supplier: { name: "" },
      sourceType: { text: "" },
      subtype: { text: "" },
    },
  }),
  created() {
    this.object = this.openItem;
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