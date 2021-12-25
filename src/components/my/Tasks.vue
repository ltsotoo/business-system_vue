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
      <template v-slot:[`item.days`]="{ item }">
        <v-row>
          <v-col v-if="item.technicianManUID == employeeUID">
            设计限时：{{ item.technicianDays }}天
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="item.purchaseManUID == employeeUID">
            采购限时：{{ item.purchaseDays }}天
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.startDate`]="{ item }">
        <v-row>
          <v-col v-if="item.type == 3">
            设计：{{ item.technicianStartDate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="item.type > 1 && item.status > 1">
            采购：{{ item.purchaseStartDate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="item.status > 2">
            仓库：{{ item.inventoryStartDate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col v-if="item.status > 4">
            物流：{{ item.shipmentStartDate }}
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.realEndDate`]="{ item }">
        <v-row>
          <v-col
            v-if="
              item.technicianManUID == employeeUID &&
              item.type == 3 &&
              item.status > 1
            "
          >
            设计：{{ item.technicianRealEndDate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            v-if="
              item.purchaseManUID == employeeUID &&
              item.type > 1 &&
              item.status > 2
            "
          >
            采购：{{ item.purchaseRealEndDate }}
          </v-col>
        </v-row>
      </template>
      <template v-slot:[`item.employees`]="{ item }">
        <v-row><v-col> </v-col></v-row>
        <v-row v-if="item.technicianMan.name">
          <v-col>技术：{{ item.technicianMan.name }}</v-col>
        </v-row>
        <v-row v-if="item.purchaseMan.name">
          <v-col>采购：{{ item.purchaseMan.name }}</v-col>
        </v-row>
        <v-row v-if="item.inventoryMan.name">
          <v-col>仓库：{{ item.inventoryMan.name }}</v-col>
        </v-row>
        <v-row v-if="item.shipmentMan.name">
          <v-col>物流：{{ item.shipmentMan.name }}</v-col>
        </v-row>
        <v-row><v-col> </v-col></v-row>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="success" @click="openRemarksDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看备注
        </v-btn>

        <v-btn
          text
          color="primary"
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

    <v-dialog v-model="remarksDialog" v-if="remarksDialog" width="1000px">
      <viewTaskRemarks
        :taskRemarks="taskRemarks"
        :aRemarks="openItem.aRemarks"
      />
    </v-dialog>

    <v-dialog v-model="nextDialog" width="1000px" persistent v-if="nextDialog">
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
          <v-btn color="primary" rounded @click="nextTask"> 提交 </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeNextDialog"> 取消 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryTasks, queryTaskRemarks } from "@/api/task";
import { next } from "@/api/task_flow";
import viewTaskRemarks from "@/components/task/ViewTaskRemarks";
export default {
  props: {
    queryObject: {
      type: Object,
    },
    statusItems: {
      type: Array,
      default: () => {},
    },
  },
  components: {
    viewTaskRemarks,
  },
  data: () => ({
    employeeUID: "",
    headers: [
      { text: "产品", align: "center", sortable: false, value: "product.name" },
      { text: "需求数量", align: "center", value: "number", sortable: false },
      {
        text: "库存数量",
        align: "center",
        value: "product.numberCount",
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
      this.queryObject.employeeUID = localStorage.getItem("uid");
      queryTasks(
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
      var temp = "";
      this.statusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
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
      next(this.openItem).then((res) => {
        this.getObject();
        this.closeNextDialog();
      });
    },
  },
};
</script>