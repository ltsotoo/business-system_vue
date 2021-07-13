<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-1"
    hide-default-footer
  >
    <template v-slot:item.actions>
      <v-icon small class="mr-2" @click="showItem(item)"> mdi-pencil </v-icon>
      <v-icon small> mdi-delete </v-icon>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data: () => ({
    headers: [
      {
        text: "产品编号",
        align: "start",
        sortable: false,
        value: "productId",
      },
      { text: "产品名称", value: "productName", sortable: false },
      { text: "产品品牌", value: "productBrand", sortable: false },
      { text: "产品规格", value: "productSpecification", sortable: false },
      { text: "厂家来源", value: "productVendor" },
      { text: "库存数量", value: "productNumber" },
      { text: "单位", value: "unit", sortable: false },
      { text: "采购/生产价格(元)", value: "purchasedPrice" },
      { text: "标准价格(元)", value: "standardPrice" },
      { text: "供货周期", value: "deliveryCycle", sortable: false },
      { text: "类别", value: "type", sortable: false },
      { text: "备注", value: "remark", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    data: [
      {
        productId: "0001",
        productName: "产品1",
        productBrand: "品牌1",
        productSpecification: "规格XXX",
        productVendor: "XX厂",
        productNumber: 1,
        unit: "台",
        purchasedPrice: 8000,
        standardPrice: 10000,
        deliveryCycle: "一周",
        type: "A类",
        remark: "XXXXXXXXXX",
      },
    ],
  }),
  methods: {
    editItem(item) {},
  },
};
</script>