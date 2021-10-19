<template>
  <div>
    <v-card>
      <v-card-title>合同产品详情</v-card-title>
      <v-data-table
        :headers="headers"
        :items="parentObject"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.remarks`]="{ item }">
          <v-textarea
            auto-grow
            readonly
            rows="1"
            v-model="item.remarks"
          ></v-textarea>
        </template>
        <template v-slot:[`item.employees`]="{ item }">
          <v-row v-if="item.technicianMan.name">
            <v-col>技术:{{ item.technicianMan.name }}</v-col>
          </v-row>
          <v-row v-if="item.purchaseMan.name">
            <v-col>采购:{{ item.purchaseMan.name }}</v-col>
          </v-row>
          <v-row v-if="item.inventoryMan.name">
            <v-col>仓库:{{ item.inventoryMan.name }}</v-col>
          </v-row>
          <v-row v-if="item.shipmentMan.name">
            <v-col>发货:{{ item.shipmentMan.name }}</v-col>
          </v-row>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          {{ stautsToText(item.status) }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    parentObject: {},
  },
  data: () => ({
    headers: [
      {
        text: "产品",
        align: "center",
        sortable: false,
        value: "product.name",
      },
      { text: "数量", align: "center", value: "number", sortable: false },
      { text: "单位", align: "center", value: "unit", sortable: false },
      { text: "单价(元)", value: "price", sortable: false },
      { text: "总价(元)", value: "totalPrice", sortable: false },
      {
        text: "备注",
        align: "center",
        value: "remarks",
        sortable: false,
        width: "450px",
      },
      {
        text: "负责人",
        align: "center",
        value: "employees",
        sortable: false,
      },
      { text: "状态", align: "center", value: "status", sortable: false },
    ],
    options: {
      total: 1,
      page: 1,
      itemsPerPage: 10,
    },
  }),
  methods: {
    stautsToText(status) {
      switch (status) {
        case 1:
          return "待设计";
        case 2:
          return "待采购";
        case 3:
          return "待入/出库";
        case 4:
          return "待装配";
        case 5:
          return "待发货";
        case 6:
          return "已发货";
      }
    },
  },
};
</script>