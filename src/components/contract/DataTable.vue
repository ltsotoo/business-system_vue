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
      <template v-slot:[`item.isSpecial`]="{ item }">
        {{ item.isSpecial == true ? "是" : "否" }}
      </template>
      <template v-slot:[`item.payType`]="{ item }">
        {{ payTypeToText(item.payType) }}
      </template>
      <template v-slot:[`item.status`]="{ item }">
        {{ stautsToText(item) }}
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn text color="success" @click="openViewDialog(item)">
          <v-icon left> mdi-eye </v-icon>
          查看
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openApproveDialog(item)"
          v-if="item.status == 1 && nos.includes('02-01-03')"
        >
          <v-icon left> mdi-file-edit-outline </v-icon>
          审批
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditDialog(item)"
          v-if="item.status == 2 && nos.includes('02-01-04')"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
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
      <contractViewForms
        :openItem="options.openItem"
        :statusItems="statusItems"
        :productionStatusItems="productionStatusItems"
        :collectionStatusItems="collectionStatusItems"
        :payTypeItems="payTypeItems"
      />
    </v-dialog>

    <v-dialog
      v-model="options.approveDialog"
      v-if="options.approveDialog"
      persistent
      @click:outside="closeApproveDialog"
      width="1440px"
    >
      <approve
        :isSpecial="options.openItem.isSpecial"
        :openUID="options.openItem.UID"
        ref="approve"
        :parentFun="getObject"
        :closeDialog="closeApproveDialog"
        :statusItems="statusItems"
        :productionStatusItems="productionStatusItems"
        :collectionStatusItems="collectionStatusItems"
        :payTypeItems="payTypeItems"
      />
    </v-dialog>

    <v-dialog
      v-model="options.editDialog"
      v-if="options.editDialog"
      width="1440px"
      persistent
      @click:outside="closeEditDialog"
    >
      <contractEditForms
        :isSpecial="options.openItem.isSpecial"
        :openItem="options.openItem"
        :openType="editNum"
        :refresh="getObject"
        :closeDialog="closeEditDialog"
        :statusItems="statusItems"
        :productionStatusItems="productionStatusItems"
        :collectionStatusItems="collectionStatusItems"
        :payTypeItems="payTypeItems"
      />
    </v-dialog>
  </div>
</template>

<script>
import approve from "./Approve";
import contractEditForms from "./EditForms";
import contractViewForms from "./ViewForms";
import { queryContracts } from "@/api/contract";
import { queryContractPayTypes } from "@/api/dictionary";

export default {
  components: {
    approve,
    contractEditForms,
    contractViewForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
    statusItems: {
      type: Array,
      default: () => [],
    },
    productionStatusItems: {
      type: Array,
      default: () => [],
    },
    collectionStatusItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    nos: [],

    payTypeItems: [],
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
        value: "office.name",
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
        value: "status",
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
      openItem: {},
      approveDialog: false,
      viewDialog: false,
      editDialog: false,
    },
    editNum: 2,
    object: [],
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    this.getPayTypeItems();
    this.getObject();
  },
  methods: {
    getPayTypeItems() {
      queryContractPayTypes().then((res) => {
        this.payTypeItems = res.data;
      });
    },
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
      });
    },
    openViewDialog(item) {
      this.options.openItem = item;
      this.options.viewDialog = true;
    },
    closeViewDialog() {
      this.options.openItem = {};
      this.options.viewDialog = false;
    },
    openApproveDialog(item) {
      this.options.openItem = item;
      this.options.approveDialog = true;
    },
    closeApproveDialog() {
      this.options.openItem = {};
      this.options.approveDialog = false;
    },
    openEditDialog(item) {
      this.options.openItem = item;
      this.options.editDialog = true;
    },
    closeEditDialog() {
      this.options.openItem = {};
      this.options.editDialog = false;
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
    stautsToText(e) {
      if (e.status == 2) {
        return (
          this.productionStatusToText(e.productionStatus) +
          "," +
          this.collectionStatusToText(e.collectionStatus)
        );
      } else {
        var temp = "";
        this.statusItems.some((item) => {
          if (item.value == e.status) {
            temp = item.text;
            return;
          }
        });
        return temp;
      }
    },
    productionStatusToText(status) {
      var temp = "";
      this.productionStatusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
    collectionStatusToText(status) {
      var temp = "";
      this.collectionStatusItems.some((item) => {
        if (item.value == status) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
    payTypeToText(payType) {
      var temp = "";
      this.payTypeItems.some((item) => {
        if (item.value == payType) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
  },
};
</script>