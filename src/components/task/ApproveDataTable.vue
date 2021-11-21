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
          <v-col>物流:{{ item.shipmentMan.name }}</v-col>
        </v-row>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="primary" @click="openApproveDialog(item)">
          <v-icon left> mdi-pencil </v-icon>
          分配
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="approveDialog" v-if="approveDialog" max-width="800px">
      <approve
        :openUID="openItem.UID"
        ref="approve"
        :parentFun="getObject"
        :closeDialog="closeApproveDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import approve from "./Approve";
import { queryTasks } from "@/api/task";
export default {
  components: {
    approve,
  },
  props: {
    openUID: {
      type: String,
      default: "",
    },
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
      {
        text: "库存数量",
        align: "center",
        value: "product.number",
        sortable: false,
      },
      { text: "单位", align: "center", value: "unit", sortable: false },
      {
        text: "合同单价(元)",
        align: "center",
        value: "price",
        sortable: false,
      },
      {
        text: "标准定价(元)",
        align: "center",
        value: "product.purchasedPrice",
        sortable: false,
      },
      {
        text: "合同总位(元)",
        align: "center",
        value: "totalPrice",
        sortable: false,
      },
      {
        text: "非标备注",
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
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 10,
    },
    object: [],

    openItem: {},
    approveDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryTasks({ contractUID: this.openUID }).then((res) => {
        this.options.loading = false;
        if (res.total < this.options.total) {
          this.options.page = 1;
        }
        this.options.total = res.total;
        if (this.options.total != 0) {
          this.object = res.data;
        }
      });
    },
    stautsToText(status) {
      switch (status) {
        case 0:
          return "待分配";
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
    openApproveDialog(item) {
      this.openItem = item;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openItem = {};
      this.approveDialog = false;
    },
    check() {
      var status = true;
      this.object.forEach(function (e) {
        if (e.status == 0) {
          status = false;
        }
      });
      return status;
    },
  },
};
</script>