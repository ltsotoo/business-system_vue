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
        <template v-slot:[`item.status`]="{ item }">
          {{ stautsToText(item.status) }}
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <div v-if="openType == 2">
            <v-btn text color="primary" @click="openApproveDialog(item.UID)">
              <v-icon left> mdi-pencil </v-icon>
              重置
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="approveDialog" v-if="approveDialog" width="800px">
      <approve
        :openUID="openUID"
        :parentFun="refresh"
        :closeDialog="closeApproveDialog"
        :openType="openType"
      />
    </v-dialog>
  </div>
</template>

<script>
import approve from "./Approve";
export default {
  components: {
    approve,
  },
  props: {
    parentObject: {
      type: Array,
      default: [],
    },
    refresh: {
      type: Function,
    },
    openType: {
      type: Number,
      default: 0,
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
      { text: "标准价格", align: "center", value: "unit", sortable: false },
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
    openUID: "",
    approveDialog: false,
  }),
  methods: {
    openApproveDialog(uid) {
      this.openUID = uid;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openUID = "";
      this.approveDialog = false;
    },
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
  },
};
</script>