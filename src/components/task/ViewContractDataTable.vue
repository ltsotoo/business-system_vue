<template>
  <v-data-table
    :headers="headers"
    :items="object"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 20],
    }"
  >
    <template v-slot:[`item.employees`]="{ item }">
      <div v-if="item.technicianMan.name">
        技术：{{ item.technicianMan.name }}
      </div>
      <div v-if="item.purchaseMan.name">采购：{{ item.purchaseMan.name }}</div>
      <div v-if="item.inventoryMan.name">
        仓库：{{ item.inventoryMan.name }}
      </div>
      <div v-if="item.shipmentMan.name">物流：{{ item.shipmentMan.name }}</div>
    </template>
    <template v-slot:[`item.status`]="{ item }">
      {{ stautsToText(item.status) }}
    </template>
  </v-data-table>
</template>

<script>
import { queryTasks } from "@/api/task";
export default {
  props: {
    contractUID: {
      type: String,
      default: "",
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    headers: [
      {
        text: "ID",
        align: "center",
        sortable: false,
        value: "ID",
      },
      {
        text: "产品",
        align: "center",
        sortable: false,
        value: "product.name",
      },
      { text: "数量", align: "center", value: "number", sortable: false },
      { text: "单位", align: "center", value: "unit", sortable: false },
      {
        text: "负责人",
        align: "center",
        value: "employees",
        sortable: false,
      },

      { text: "状态", align: "center", value: "status", sortable: false },
    ],

    object: [],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryTasks(this.queryObject).then((res) => {
        this.object = res.data;
      });
    },
    stautsToText(status) {
      var temp = "";
      this.statusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
  },
};
</script>