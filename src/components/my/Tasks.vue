<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :items-per-page="5"
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
      <template v-slot:[`item.employees`]="{ item }">
        <v-row><v-col> </v-col></v-row>
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
        <v-row><v-col> </v-col></v-row>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          rounded
          color="success"
          dark
          @click="openRemarksDialog(item)"
          class="mx-2"
        >
          <v-icon left> mdi-eye </v-icon>
          查看备注
        </v-btn>

        <v-btn
          class="mx-2"
          rounded
          color="primary"
          dark
          v-if="
            (item.status == 1 && item.technicianManUID == employeeUID) ||
            (item.status == 2 && item.purchaseManUID == employeeUID) ||
            (item.status == 3 && item.inventoryManUID == employeeUID) ||
            (item.status == 4 && item.technicianManUID == employeeUID) ||
            (item.status == 5 && item.shipmentManUID == employeeUID)
          "
          @click="openNextDialog(item)"
        >
          <v-icon left> mdi-chevron-right-circle-outline </v-icon>
          下一步
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog v-model="remarksDialog" v-if="remarksDialog" max-width="900px">
      <viewTaskRemarks :taskRemarks="taskRemarks" :remarks="openItem.remarks" />
    </v-dialog>

    <v-dialog
      v-model="nextDialog"
      max-width="900px"
      persistent
      v-if="nextDialog"
    >
      <v-card>
        <v-card-title></v-card-title>
        <v-card-subtitle>
          <v-textarea
            label="备注"
            v-model.trim="nextText"
            rows="9"
            auto-grow
          ></v-textarea>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="nextTask"> 提交 </v-btn>
          <v-btn color="blue darken-1" text @click="closeNextDialog">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryMyTasks, queryTaskRemarks } from "@/api/task";
import { next } from "@/api/task_flow";
import viewTaskRemarks from "@/components/task/ViewTaskRemarks";
export default {
  props: {
    queryObject: {
      type: Object,
    },
  },
  components: {
    viewTaskRemarks,
  },
  data: () => ({
    employeeUID: "",
    headers: [
      { text: "ID", align: "center", sortable: false, value: "ID" },
      { text: "产品", align: "center", sortable: false, value: "product.name" },
      { text: "需求数量", align: "center", value: "number", sortable: false },
      {
        text: "库存数量",
        align: "center",
        value: "product.number",
        sortable: false,
      },
      { text: "单位", align: "center", value: "unit", sortable: false },
      {
        text: "负责人",
        align: "center",
        value: "employees",
        sortable: false,
      },
      { text: "状态", align: "center", value: "status", sortable: false },
      {
        text: "开始时间",
        align: "center",
        value: "CreatedAt",
        sortable: false,
      },
      {
        text: "操作",
        align: "center",
        value: "actions",
        sortable: false,
      },
    ],
    options: {
      loading: false,
      total: 1,
      page: 1,
      itemsPerPage: 10,
    },
    object: [],
    taskRemarks: [],
    openItem: {},

    remarksDialog: false,

    nextDialog: false,
    nextText: "",
  }),
  created() {
    this.employeeUID = localStorage.getItem("uid");
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryMyTasks(
        this.queryObject,
        this.options.itemsPerPage,
        this.options.page
      ).then((res) => {
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
    getTaskRemarks() {
      queryTaskRemarks(this.openItem.UID).then((res) => {
        this.taskRemarks = res.data;
      });
    },
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
    openRemarksDialog(item) {
      this.openItem = item;
      queryTaskRemarks(this.openItem.UID).then((res) => {
        this.taskRemarks = res.data;
        this.remarksDialog = true;
      });
    },
    closeRemarksDialog() {
      this.openItem = {};
      this.remarksDialog = false;
    },
    openNextDialog(item) {
      this.openItem = item;
      this.nextDialog = true;
    },
    closeNextDialog() {
      this.openItem = {};
      this.nextText = "";
      this.nextDialog = false;
    },
    nextTask() {
      this.openItem.currentRemarksText = this.nextText;
      var _this = this;
      next(this.openItem).then((res) => {
        _this.getObject();
        _this.closeNextDialog();
      });
    },
  },
};
</script>