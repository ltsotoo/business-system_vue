<template>
  <div>
    <v-card elevation="1">
      <v-card-title>发货任务表</v-card-title>
    </v-card>
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openLastDialog(item)">
          mdi-chevron-left-circle-outline
        </v-icon>
        <v-icon @click="openNextDialog(item)">
          mdi-chevron-right-circle-outline
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="lastDialog" max-width="1200px" persistent>
      <v-card>
        <v-card-title>回退到上一节</v-card-title>
        <v-card-subtitle>
          <v-textarea
            label="备注"
            v-model.trim="nextText"
            auto-grow
            rows="9"
          ></v-textarea>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="lastTask"> 完成 </v-btn>
          <v-btn color="blue darken-1" text @click="closeLastDialog">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="nextDialog" max-width="1200px" persistent>
      <v-card>
        <v-card-title>通过到下一节</v-card-title>
        <v-card-subtitle>
          <v-textarea
            label="备注"
            v-model.trim="nextText"
            auto-grow
            rows="9"
          ></v-textarea>
        </v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="nextTask"> 完成 </v-btn>
          <v-btn color="blue darken-1" text @click="closeNextDialog">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryMyTasks4 } from "@/api/task";
import { last, next } from "@/api/task_flow";
export default {
  data: () => ({
    headers: [
      { text: "ID", sortable: false, value: "ID" },
      { text: "产品", sortable: false, value: "product.name" },
      { text: "需求数量", value: "number", sortable: false },
      { text: "库存数量", value: "product.number", sortable: false },
      { text: "单位", value: "unit", sortable: false },
      { text: "技术负责人", value: "technicianMan.name", sortable: false },
      { text: "采购负责人", value: "purchaseMan.name", sortable: false },
      { text: "库存负责人", value: "inventoryMan.name", sortable: false },
      { text: "发货人员", value: "shipmentMan.name", sortable: false },
      // { text: "非标备注", value: "remarks", sortable: false },
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
    openUID: "",
    openItem: {},

    lastDialog: false,
    nextDialog: false,
    nextText: "",
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryMyTasks4().then((res) => {
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

    openLastDialog(item) {
      this.openItem = item;
      this.lastDialog = true;
    },
    closeLastDialog() {
      this.openItem = {};
      this.nextText = "";
      this.lastDialog = false;
    },
    lastTask() {
      this.openItem.nextRemarks = this.nextText;
      var _this = this;
      last(this.openItem).then((res) => {
        _this.getObject();
        _this.closeLastDialog();
      });
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
      this.openItem.nextRemarks = this.nextText;
      var _this = this;
      next(this.openItem).then((res) => {
        _this.getObject();
        _this.closeNextDialog();
      });
    },
  },
};
</script>