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
          <div>
            <v-col> 人民币：{{ item.standardPrice }} </v-col>
          </div>
          <div>
            <v-col> 美元：{{ item.standardPriceUSD }} </v-col>
          </div>
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
          <v-btn text color="success" @click="openViewDialog(item)">
            <v-icon left> mdi-eye </v-icon>
            查看备注
          </v-btn>
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
      <viewTaskRemarks
        :aRemarks="openItem.aRemarks"
        :remarks="openItem.remarks"
        :taskRemarks="taskRemarks"
      />
    </v-dialog>
  </div>
</template>

<script>
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
  methods: {
    stautsToText(status) {
      switch (status) {
        case 0:
          return "待审批";
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