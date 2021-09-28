<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
      class="elevation-1"
      :server-items-length="options.total"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
      :loading="options.loading"
      :options.sync="options"
      @update:page="getObject"
      @update:items-per-page="getObject"
    >
      <template v-slot:[`item.status`]="{ item }">
        {{ stautsToText(item.status) }}
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { queryMyTasks } from "@/api/task";
export default {
  data: () => ({
    headers: [
      {
        text: "产品",
        align: "start",
        sortable: false,
        value: "product.name",
      },
      { text: "数量", value: "number", sortable: false },
      { text: "库存数量", value: "product.number", sortable: false },
      { text: "单位", value: "unit", sortable: false },
      { text: "技术负责人", value: "technicianMan.name", sortable: false },
      { text: "采购负责人", value: "purchaseMan.name", sortable: false },
      { text: "库存负责人", value: "inventoryMan.name", sortable: false },
      { text: "发货人员", value: "shipmentMan.name", sortable: false },
      { text: "状态", value: "status", sortable: false },
      { text: "操作", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 10,
    },
    object: [],
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryMyTasks().then((res) => {
        this.options.loading = false;
        if (res.total < this.options.total) {
          this.options.page = 1;
        }
        this.options.total = res.total;
        if (this.options.total != 0) {
          this.object = res.data;
        }
        this.stautsToText();
      });
    },
    stautsToText(status) {
      switch (status) {
        case 0:
          return "未分配";
        case 1:
          return "待设计";
        case 2:
          return "待采购";
        case 3:
          return "待入库";
        case 4:
          return "待发货";
        case 5:
          return "待确认收货";
        case 6:
          return "完成";
      }
    },
  },
};
</script>