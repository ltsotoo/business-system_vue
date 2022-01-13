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
      <template v-slot:[`item.no`]="{ item }">
        <v-chip :color="noColor(item)">
          {{ item.no }}
        </v-chip>
      </template>
      <template v-slot:[`item.estimatedDeliveryDate`]="{ item }">
        <div v-if="item.status != 3">
          <v-chip :color="estimatedDeliveryDateColor(item)">
            {{ item.estimatedDeliveryDate }}
          </v-chip>
        </div>
        <div v-else>
          {{ item.estimatedDeliveryDate }}
        </div>
      </template>
      <template v-slot:[`item.totalAmount`]="{ item }">
        <div v-if="item.payType == 1">{{ item.totalAmount }}元</div>
        <div v-if="item.payType == 2">{{ item.totalAmount }}美元</div>
      </template>
      <template v-slot:[`item.preDeposit`]="{ item }">
        <div v-if="item.isPreDeposit">
          {{ item.preDeposit }}
        </div>
      </template>
      <template v-slot:[`item.notPaymentTotalAmount`]="{ item }">
        <div v-if="item.payType == 1 && !item.isPreDeposit">
          {{ item.totalAmount - item.paymentTotalAmount }}
        </div>
        <div v-if="item.payType == 1 && item.isPreDeposit">
          {{ item.preDepositRecord - item.paymentTotalAmount }}
        </div>
      </template>
      <template v-slot:[`item.isSpecial`]="{ item }">
        {{ item.isSpecial == true ? "是" : "否" }}
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
          v-if="item.status >= 2 && nos.includes('02-01-04')"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditPreDialog(item)"
          v-if="
            item.status == 2 && item.isPreDeposit && nos.includes('02-01-05')
          "
        >
          <v-icon left> mdi-pencil </v-icon>
          预存款编辑
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
        :refresh="getObject"
        :closeDialog="closeEditDialog"
        :statusItems="statusItems"
        :productionStatusItems="productionStatusItems"
        :collectionStatusItems="collectionStatusItems"
        :payTypeItems="payTypeItems"
      />
    </v-dialog>

    <v-dialog
      v-model="options.editPreDialog"
      v-if="options.editPreDialog"
      width="1000px"
      persistent
      @click:outside="closeEditPreDialog"
    >
      <contractEditPreForms
        :openItem="options.openItem"
        :refresh="getObject"
        :closeDialog="closeEditPreDialog"
      />
    </v-dialog>
  </div>
</template>

<script>
import approve from "./Approve";
import contractEditForms from "./EditForms";
import contractEditPreForms from "./EditPreForms";
import contractViewForms from "./ViewForms";
import { queryContracts } from "@/api/contract";

export default {
  components: {
    approve,
    contractEditForms,
    contractEditPreForms,
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
    payTypeItems: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    nos: [],

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
        text: "剩余预存款金额",
        align: "center",
        value: "preDeposit",
        sortable: false,
      },
      {
        text: "总金额",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },
      {
        text: "状态",
        align: "center",
        value: "status",
        sortable: false,
      },
      {
        text: "未回款额(CNY)",
        align: "center",
        value: "notPaymentTotalAmount",
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
      editPreDialog: false,
    },
    object: [],
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    this.getObject();
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
    openEditPreDialog(item) {
      this.options.openItem = item;
      this.options.editPreDialog = true;
    },
    closeEditPreDialog() {
      this.options.openItem = {};
      this.options.editPreDialog = false;
    },
    noColor(item) {
      if (item.endDeliveryDate != "") {
        var endDeliveryDate = Date.parse(item.endDeliveryDate);
        var endDate;
        if (item.collectionStatus == 1) {
          endDate = Date.parse(item.endDeliveryDate);
        } else if (item.collectionStatus == 2) {
          endDate = Date.parse(item.endPaymentDate);
        }
        if (endDeliveryDate + 60 * 24 * 60 * 60 * 1000 < endDate) {
          return "red";
        }
      }
      return "green";
    },
    estimatedDeliveryDateColor(item) {
      var estimatedDeliveryDate = Date.parse(item.estimatedDeliveryDate);
      var endDate;
      if (item.endDeliveryDate != "") {
        endDate = Date.parse(item.endDeliveryDate);
      } else {
        endDate = new Date().getTime();
      }
      if (endDate > estimatedDeliveryDate) {
        return "red";
      }
      if (endDate + 7 * 24 * 60 * 60 * 1000 > estimatedDeliveryDate) {
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
  },
};
</script>