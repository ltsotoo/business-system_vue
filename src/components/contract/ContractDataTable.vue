<template>
  <v-data-table
    :headers="headers"
    :items="data"
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
  props: {},
  data: () => ({
    headers: [
      {
        text: "合同编号",
        align: "start",
        sortable: false,
        value: "contractNumber",
      },
      { text: "业务员", value: "salesmanName", sortable: false },
      { text: "客户单位", value: "customerCompanyName", sortable: false },
      { text: "客户名称", value: "customerName", sortable: false },
      { text: "总金额(元)", value: "totalAmount" },
      { text: "状态", value: "Status", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    data: [
      {
        contractNumber: "bjscistar-20210712-0101-001",
        salesmanName: "开发者1号",
        customerCompanyName: "开发者公司",
        customerName: "顾客1号",
        totalAmount: 123456,
        Status: 1,
      },
      {
        contractNumber: "bjscistar-20210712-0101-002",
        salesmanName: "开发者2号",
        customerCompanyName: "开发者公司",
        customerName: "顾客2号",
        totalAmount: 2333333,
        Status: 2,
      },
      {
        contractNumber: "bjscistar-20210712-0101-003",
        salesmanName: "开发者3号",
        customerCompanyName: "开发者公司",
        customerName: "顾客3号",
        totalAmount: 6666,
        Status: 3,
      },
    ],
  }),
  methods: {},
};
</script>