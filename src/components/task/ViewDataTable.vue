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
        <template v-slot:[`item.standardPrice`]="{ item }">
          <div v-if="payType == 1">{{ item.standardPrice }} (元)</div>
          <div v-if="payType == 2">{{ item.standardPriceUSD }} (美元)</div>
        </template>
        <template v-slot:[`item.startDate`]="{ item }">
          <div v-if="item.type == 3">设计：{{ item.technicianStartDate }}</div>
          <div v-if="item.type > 1 && item.status > 1">
            采购：{{ item.purchaseStartDate }}
          </div>
          <div v-if="item.status > 2">仓库：{{ item.inventoryStartDate }}</div>
          <div v-if="item.status > 4">物流：{{ item.shipmentStartDate }}</div>
        </template>
        <template v-slot:[`item.days`]="{ item }">
          <div v-if="item.type == 3">设计限时：{{ item.technicianDays }}天</div>
          <div v-if="item.type > 1">采购限时：{{ item.purchaseDays }}天</div>
        </template>
        <template v-slot:[`item.realEndDate`]="{ item }">
          <div v-if="item.type == 3 && item.status > 1">
            设计：{{ item.technicianRealEndDate }}
          </div>
          <div v-if="item.type > 1 && item.status > 2">
            采购：{{ item.purchaseRealEndDate }}
          </div>
        </template>
        <template v-slot:[`item.employees`]="{ item }">
          <div v-if="item.technicianMan.name">
            技术：{{ item.technicianMan.name }}
          </div>
          <div v-if="item.purchaseMan.name">
            采购：{{ item.purchaseMan.name }}
          </div>
          <div v-if="item.inventoryMan.name">
            仓库：{{ item.inventoryMan.name }}
          </div>
          <div v-if="item.shipmentMan.name">
            物流：{{ item.shipmentMan.name }}
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          {{ stautsToText(item.status) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div v-if="isIndex && item.status == 6">
            <v-btn text color="success" @click="openViewDialog(item)">
              <v-icon left> mdi-eye </v-icon>
              查看快递单号
            </v-btn>
          </div>
          <div v-if="!isIndex">
            <v-btn text color="success" @click="openViewDialog(item)">
              <v-icon left> mdi-eye </v-icon>
              查看备注
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog
      v-model="viewDialog"
      v-if="viewDialog"
      width="1440px"
      persistent
      @click:outside="closeViewDialog"
    >
      <viewTaskRemarks :remarks="openItem.remarks" :taskRemarks="taskRemarks" />
    </v-dialog>
  </div>
</template>

<script>
import { queryTaskStatus } from "@/api/dictionary";
import approve from "./Approve";
import viewTaskRemarks from "./ViewTaskRemarks.vue";
import { queryTaskRemarks } from "@/api/task";
export default {
  components: {
    approve,
    viewTaskRemarks,
  },
  props: {
    parentObject: {
      type: Array,
      default: () => [],
    },
    payType: {
      type: Number,
      default: 0,
    },
    isIndex: {
      type: Boolean,
      default: false,
    },
    indexHeaders: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    statusItems: [],
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
        text: "标准价格",
        align: "center",
        value: "standardPrice",
        sortable: false,
      },
      { text: "单价", value: "price", sortable: false },
      { text: "总价", value: "totalPrice", sortable: false },
      {
        text: "负责人",
        align: "center",
        value: "employees",
        sortable: false,
      },
      {
        text: "开始时间",
        align: "center",
        value: "startDate",
        sortable: false,
      },
      {
        text: "限时天数",
        align: "center",
        value: "days",
        sortable: false,
      },
      {
        text: "实际提交时间",
        align: "center",
        value: "realEndDate",
        sortable: false,
      },
      { text: "状态", align: "center", value: "status", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    options: {
      total: 1,
      page: 1,
      itemsPerPage: 10,
    },
    openItem: {},
    viewDialog: false,
    taskRemarks: [],
  }),
  created() {
    if (this.isIndex) {
      this.headers = this.indexHeaders;
    }
    this.getStatusItems();
  },
  methods: {
    getStatusItems() {
      queryTaskStatus().then((res) => {
        this.statusItems = res.data;
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
    openViewDialog(item) {
      this.openItem = item;
      queryTaskRemarks(item.UID).then((res) => {
        this.taskRemarks = res.data;
        this.viewDialog = true;
      });
    },
    closeViewDialog() {
      this.openItem = {};
      this.viewDialog = false;
    },
  },
};
</script>