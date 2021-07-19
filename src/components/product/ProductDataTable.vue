<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :items-per-page="5"
    class="elevation-1"
    :server-items-length="options.total"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 20],
    }"
    :loading="options.loading"
    :options.sync="options"
    @update:page="getData"
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
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "产品名称", value: "name", sortable: false },
      { text: "产品品牌", value: "brand", sortable: false },
      { text: "产品规格", value: "specification", sortable: false },
      { text: "厂家来源", value: "vendor" },
      { text: "库存数量", value: "number" },
      { text: "单位", value: "unit", sortable: false },
      { text: "采购/生产价格(元)", value: "purchasedPrice" },
      { text: "标准价格(元)", value: "standardPrice" },
      { text: "供货周期", value: "deliveryCycle", sortable: false },
      { text: "类别", value: "type", sortable: false },
      { text: "备注", value: "remark", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 100,
      page: 1,
      itemsPerPage: 5,
    },
    data: [
      {
        id: "0001",
        name: "产品1",
        brand: "品牌1",
        specification: "规格XXX",
        vendor: "XX厂",
        number: 1,
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
    getData() {},
    editItem(item) {},
  },
};
</script>