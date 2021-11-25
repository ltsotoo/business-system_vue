<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="object"
      :server-items-length="options.total"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 20],
      }"
      :loading="options.loading"
      :options.sync="options"
      @update:page="getObject"
      @update:items-per-page="getObject"
    >
      <template v-slot:[`item.estimatedDeliveryDate`]="{ item }">
        <div v-if="item.status != 3">
          <v-chip :color="compareColor(item.estimatedDeliveryDate)">
            {{ item.estimatedDeliveryDate }}
          </v-chip>
        </div>
        <div v-else>
          {{ item.estimatedDeliveryDate }}
        </div>
      </template>
      <template v-slot:[`item.endDeliveryDate`]="{ item }">
        <div v-if="item.productionStatus == 2">
          {{ item.endDeliveryDate }}
        </div>
      </template>
      <template v-slot:[`item.isSpecial`]="{ item }">
        {{ item.isSpecial == true ? "是" : "否" }}
      </template>
      <template v-slot:[`item.payType`]="{ item }">
        {{ payTypeToText(item.payType) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="success" @click="openViewDialog(item.UID)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openApproveDialog(item.UID)"
          v-if="item.status == 1 && nos.indexOf('14') != -1"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openFinalApproveDialog(item.UID)"
          v-if="
            item.status == 2 &&
            item.productionStatus == 2 &&
            item.collectionStatus == 2 &&
            nos.indexOf('16') != -1
          "
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          终审
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditDialog(item.UID)"
          v-if="item.status == 2"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <v-btn
          text
          color="error"
          @click="openDeleteDialog(item.UID)"
          dark
          disabled
        >
          <v-icon left> mdi-delete </v-icon>
          删除
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="options.viewDialog"
      v-if="options.viewDialog"
      width="1440px"
      persistent
      @click:outside="closeViewDialog"
    >
      <contractViewForms :openUID="options.openUID" />
    </v-dialog>

    <v-dialog
      v-model="options.approveDialog"
      v-if="options.approveDialog"
      persistent
      @click:outside="closeApproveDialog"
      width="1440px"
    >
      <approve
        :openUID="options.openUID"
        ref="approve"
        :parentFun="getObject"
        :closeDialog="closeApproveDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="options.finalApproveDialog"
      v-if="options.finalApproveDialog"
      persistent
      @click:outside="closeFinalApproveDialog"
      width="1440px"
    >
      <finalApprove
        :openUID="options.openUID"
        openType="3"
        :refresh="getObject"
        :closeDialog="closeFinalApproveDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      width="1440px"
      persistent
      @click:outside="closeEditDialog"
    >
      <finalApprove
        :openUID="options.openUID"
        :openType="editNum"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
      />
    </v-dialog>

    <v-dialog
      v-model="options.deleteDialog"
      v-if="options.deleteDialog"
      width="800px"
      persistent
      @click:outside="closeDeleteDialog"
    >
      <v-card>
        <v-card-title class="text-h5">您确定删除该位合同吗?</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="deleteItem">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeDeleteDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import approve from "./Approve";
import finalApprove from "./FinalApprove";
import contractViewForms from "./ViewForms";
import { delContract, queryContracts } from "@/api/contract";

export default {
  components: {
    approve,
    finalApprove,
    contractViewForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
  },
  data: () => ({
    headers: [
      {
        text: "合同编号",
        align: "center",
        value: "no",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "area.office.name",
        sortable: false,
      },
      {
        text: "业务员",
        align: "center",
        value: "employee.name",
        sortable: false,
      },
      {
        text: "客户单位",
        align: "center",
        value: "customer.company.name",
        sortable: false,
      },
      {
        text: "客户",
        align: "center",
        value: "customer.name",
        sortable: false,
      },
      {
        text: "合同交货日期",
        align: "center",
        value: "estimatedDeliveryDate",
        sortable: false,
      },
      {
        text: "实际交货日期",
        align: "center",
        value: "endDeliveryDate",
        sortable: false,
      },
      {
        text: "总金额",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },
      {
        text: "付款类型",
        align: "center",
        value: "payType",
        sortable: false,
      },
      {
        text: "特殊合同",
        align: "center",
        value: "isSpecial",
        sortable: false,
      },
      {
        text: "状态",
        align: "center",
        value: "statusText",
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
      total: 0,
      page: 1,
      itemsPerPage: 10,
      openUID: "",
      approveDialog: false,
      finalApproveDialog: false,
      viewDialog: false,
      editDialog: false,
      deleteDialog: false,
    },
    editNum: 2,
    finalApproveNum: 3,
    object: [],

    nos: [],
  }),
  created() {
    this.getObject();

    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
  },
  methods: {
    getObject() {
      this.options.loading = true;
      queryContracts(
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
    openViewDialog(uid) {
      this.options.openUID = uid;
      this.options.viewDialog = true;
    },
    closeViewDialog() {
      this.options.openUID = "";
      this.options.viewDialog = false;
    },
    openApproveDialog(uid) {
      this.options.openUID = uid;
      this.options.approveDialog = true;
    },
    closeApproveDialog() {
      this.options.openUID = "";
      this.options.approveDialog = false;
    },
    openFinalApproveDialog(uid) {
      this.options.openUID = uid;
      this.options.finalApproveDialog = true;
    },
    closeFinalApproveDialog() {
      this.options.openUID = "";
      this.options.finalApproveDialog = false;
    },
    openEditDialog(uid) {
      this.options.openUID = uid;
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openUID = "";
      this.options.editDialog = false;
    },
    openDeleteDialog(uid) {
      this.options.openUID = uid;
      this.options.deleteDialog = true;
    },
    closeDeleteDialog() {
      this.options.openUID = "";
      this.options.deleteDialog = false;
    },
    deleteItem() {
      delContract(this.options.openUID).then((res) => {
        this.$message.success("删除成功了！");
        this.getObject();
        this.closeDeleteDialog();
      });
    },
    compareColor(date) {
      //替换为‘/’转译为中国时间，‘-’转译为UTC
      date = date.replace(/-/g, "/");
      var nowDate = new Date().getTime();
      var parseDate = Date.parse(date);
      if (nowDate > parseDate) {
        return "red";
      }
      if (nowDate + 7 * 24 * 60 * 60 * 1000 > parseDate) {
        return "orange";
      }
      return "green";
    },
    stautsToText() {
      var _this = this;
      this.object.forEach(function (e) {
        switch (e.status) {
          case -1:
            e.statusText = "审批驳回";
            break;
          case 1:
            e.statusText = "待审批";
            break;
          case 2:
            e.statusText =
              _this.productionStatusToText(e.productionStatus) +
              "," +
              _this.collectionStatusToText(e.collectionStatus);
            break;
          case 3:
            e.statusText = "已完成";
            break;
        }
      });
    },
    productionStatusToText(status) {
      switch (status) {
        case 1:
          return "生产中";
        case 2:
          return "生产完成";
      }
    },
    collectionStatusToText(status) {
      switch (status) {
        case 1:
          return "回款中";
        case 2:
          return "回款完成";
      }
    },
    payTypeToText(payType) {
      switch (payType) {
        case 1:
          return "人民币";
        case 2:
          return "美元";
      }
    },
  },
};
</script>