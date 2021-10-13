<template>
<!-- 首页技术任务表格 -->
  <div>
    <v-card elevation="1">
      <v-card-title>技术任务表</v-card-title>
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
        <v-icon v-if="item.status < 6" @click="openNextDialog(item)">
          mdi-chevron-right-circle-outline
        </v-icon>
        <v-icon v-if="item.status == 1" @click="openBuyDialog(item.UID)">
          mdi-cart-outline
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="nextDialog" max-width="1200px" persistent>
      <v-card>
        <v-card-title>设计完成，发送给采购</v-card-title>
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

    <v-dialog v-model="buyDialog" max-width="1200px" persistent>
      <v-card>
        <v-card-title></v-card-title>
        <v-card-subtitle>
          <v-row>
            <v-col cols="6">
              <v-card elevation="0">
                <v-card-title></v-card-title>
                <v-card-subtitle>
                  <div v-for="(item, i) in buyTextItems" :key="i">
                    <v-card style="margin-top: 5px" elevation="1">
                      <v-card-title></v-card-title>
                      <v-card-subtitle>
                        <v-row>
                          <v-col cols="4">
                            采购人:{{ item.purchaseMan.name }}</v-col
                          >
                          <v-col cols="3">
                            状态:{{ buyStatusToText(item.status) }}
                          </v-col>
                          <v-col cols="5">
                            发起时间:{{ item.CreatedAt }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-textarea
                              v-model.trim="item.text"
                              readonly
                              auto-grow
                              rows="1"
                            ></v-textarea>
                          </v-col>
                        </v-row>
                      </v-card-subtitle>
                    </v-card>
                  </div>
                </v-card-subtitle>
              </v-card>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="6">
              <v-card elevation="0">
                <v-card-title></v-card-title>
                <v-card-subtitle>
                  <v-row>
                    <v-col>
                      <v-textarea
                        label="申请采购："
                        v-model.trim="buyText"
                        rows="9"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col> 采购负责人： </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-select
                        v-model="buyOfficeUID"
                        :items="buyOfficeItems"
                        item-text="name"
                        item-value="UID"
                        label="办事处"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="buyDepartmentUID"
                        :items="buyDepartmentItems"
                        item-text="name"
                        item-value="UID"
                        label="部门"
                      ></v-select>
                    </v-col>
                    <v-col cols="4">
                      <v-select
                        v-model="buyEmployeeUID"
                        :items="buyEmployeeItems"
                        item-text="name"
                        item-value="UID"
                        label="员工"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-card-subtitle>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="createBuy">
                    发起
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="closeBuyDialog">
                    关闭
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-card-subtitle>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryMyTasks1 } from "@/api/task";
import { next } from "@/api/task_flow";
import {
  entryTaskProcurement,
  queryTaskProcurements,
} from "@/api/task_procurement";
import { queryOffices, queryDepartments } from "@/api/oadrp";
import { queryEmployees } from "@/api/employee";
export default {
  data: () => ({
    headers: [
      { text: "ID", sortable: false, value: "ID" },
      { text: "产品", sortable: false, value: "product.name" },
      { text: "需求数量", value: "number", sortable: false },
    //   { text: "库存数量", value: "product.number", sortable: false },
      { text: "单位", value: "unit", sortable: false },
      { text: "技术负责人", value: "technicianMan.name", sortable: false },
      { text: "采购负责人", value: "purchaseMan.name", sortable: false },
    //   { text: "库存负责人", value: "inventoryMan.name", sortable: false },
    //   { text: "发货人员", value: "shipmentMan.name", sortable: false },
      { text: "非标备注", value: "remarks", sortable: false },
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

    buyDialog: false,
    buyText: "",
    buyTextItems: {},
    buyOfficeUID: "",
    buyOfficeItems: {},
    buyDepartmentUID: "",
    buyDepartmentItems: {},
    buyEmployeeUID: "",
    buyEmployeeItems: {},
  }),
  created() {
    this.getObject();
    this.getOfficeItems();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryMyTasks1().then((res) => {
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

    buyStatusToText(status) {
      switch (status) {
        case -1:
          return "采购取消";
        case 1:
          return "采购中";
        case 2:
          return "采购完成";
      }
    },
    openBuyDialog(uid) {
      this.openUID = uid;
      this.buyDialog = true;
      this.getBuyTextItems();
    },
    closeBuyDialog() {
      this.refreshBuyDialog();
      this.openUID = "";
      this.buyDialog = false;
    },
    refreshBuyDialog() {
      this.buyText = "";
      this.buyOfficeUID = "";
      this.buyTextItem = {};
    },
    createBuy() {
      var _this = this;
      entryTaskProcurement({
        taskUID: this.openUID,
        text: this.buyText,
        purchaseManUID: this.buyEmployeeUID,
      }).then((res) => {
        _this.refreshBuyDialog();
        _this.getBuyTextItems();
      });
    },
    getBuyTextItems() {
      queryTaskProcurements(this.openUID).then((res) => {
        this.buyTextItems = res.data;
      });
    },
    getOfficeItems() {
      queryOffices().then((res) => {
        this.buyOfficeItems = res.data;
      });
    },
    getDepartmentItems() {
      this.buyDepartmentItems = [];
      this.buyEmployeeItems = [];
      this.buyDepartmentUID = "";
      this.buyEmployeeUID = "";
      queryDepartments({
        officeUID: this.buyOfficeUID,
        name: "",
      }).then((res) => {
        this.buyDepartmentItems = res.data;
      });
    },
    getEmployeeItems() {
      this.buyEmployeeItems = [];
      this.buyEmployeeUID = "";
      queryEmployees({
        officeUID: this.buyOfficeUID,
        departmentUID: this.buyDepartmentUID,
        name: "",
      }).then((res) => {
        this.buyEmployeeItems = res.data;
      });
    },
  },
  watch: {
    buyOfficeUID() {
      this.getDepartmentItems();
    },
    buyDepartmentUID() {
      this.getEmployeeItems();
    },
  },
};
</script>