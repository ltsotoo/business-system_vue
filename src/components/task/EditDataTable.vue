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
          <div v-if="item.status == 0">
            <v-btn text color="primary" @click="openApprovePreDialog(item.UID)">
              <v-icon left> mdi-pencil </v-icon>
              分配
            </v-btn>
            <v-btn text color="error" @click="openRejectDialog(item)">
              <v-icon left> mdi-pencil </v-icon>
              驳回
            </v-btn>
          </div>

          <v-btn
            text
            color="primary"
            @click="openApproveDialog(item.UID)"
            v-if="item.status > 0"
          >
            <v-icon left> mdi-pencil </v-icon>
            重置
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

    <v-dialog v-model="approvePreDialog" v-if="approvePreDialog" width="800px">
      <approve
        :isSpecial="isSpecial"
        :openUID="openUID"
        :parentFun="refresh"
        :closeDialog="closeApprovePreDialog"
        :openType="3"
      />
    </v-dialog>

    <v-dialog v-model="approveDialog" v-if="approveDialog" width="800px">
      <approve
        :isSpecial="isSpecial"
        :openUID="openUID"
        :parentFun="refresh"
        :closeDialog="closeApproveDialog"
        :openType="2"
      />
    </v-dialog>

    <v-dialog
      v-model="rejectDialog"
      v-if="rejectDialog"
      width="800px"
      persistent
      @click:outside="closeRejectDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定驳回该任务吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="reject">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeRejectDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryTaskStatus } from "@/api/dictionary";
import { rejectTask } from "@/api/task";
import approve from "./Approve";
export default {
  components: {
    approve,
  },
  props: {
    isSpecial: {
      type: Boolean,
      default: false,
    },
    parentObject: {
      type: Array,
      default: () => [],
    },
    payType: {
      type: Number,
      default: 0,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    statusItems: [],
    headers: [
      {
        text: "产品",
        align: "center",
        sortable: false,
        value: "product.name",
        width: "15%",
      },
      {
        text: "产品规格",
        align: "center",
        sortable: false,
        value: "product.specification",
        width: "10%",
      },
      {
        text: "数量",
        align: "center",
        value: "number",
        sortable: false,
        width: "5%",
      },
      {
        text: "单位",
        align: "center",
        value: "unit",
        sortable: false,
        width: "5%",
      },
      {
        text: "标准价格",
        align: "center",
        value: "standardPrice",
        sortable: false,
        width: "8%",
      },
      { text: "单价", value: "price", sortable: false, width: "4%" },
      { text: "总价", value: "totalPrice", sortable: false, width: "4%" },
      {
        text: "负责人",
        align: "center",
        value: "employees",
        sortable: false,
        width: "10%",
      },
      {
        text: "开始时间",
        align: "center",
        value: "startDate",
        sortable: false,
        width: "10%",
      },
      {
        text: "限时天数",
        align: "center",
        value: "days",
        sortable: false,
        width: "10%",
      },
      {
        text: "实际提交时间",
        align: "center",
        value: "realEndDate",
        sortable: false,
        width: "10%",
      },
      {
        text: "状态",
        align: "center",
        value: "status",
        sortable: false,
        width: "5%",
      },
      {
        text: "操作",
        align: "center",
        value: "actions",
        sortable: false,
        width: "4%",
      },
    ],
    options: {
      total: 1,
      page: 1,
      itemsPerPage: 10,
    },
    openUID: "",
    approveDialog: false,
    approvePreDialog: false,
    rejectDialog: false,
  }),
  created() {
    this.getStatusItems();
  },
  methods: {
    getStatusItems() {
      queryTaskStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    openApproveDialog(uid) {
      this.openUID = uid;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openUID = "";
      this.approveDialog = false;
    },
    openApprovePreDialog(uid) {
      this.openUID = uid;
      this.approvePreDialog = true;
    },
    closeApprovePreDialog() {
      this.openUID = "";
      this.approvePreDialog = false;
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
    openRejectDialog(item) {
      this.openUID = item.UID;
      this.rejectDialog = true;
    },
    closeRejectDialog() {
      this.openUID = "";
      this.rejectDialog = false;
    },
    reject() {
      this.submitDisabled = true;
      rejectTask(this.openUID).then((res) => {
        this.$message.success("驳回成功！");
        this.refresh();
        this.closeRejectDialog();
      });
    },
  },
};
</script>