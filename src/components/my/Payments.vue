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
      <template v-slot:[`item.invoiceType`]="{ item }">
        {{ invoiceTypeToText(item.invoiceType) }}
      </template>
      <template v-slot:[`item.payType`]="{ item }">
        {{ payTypeToText(item.payType) }}
      </template>
      <template v-slot:[`item.invoiceContent`]="{ item }">
        <v-textarea
          auto-grow
          readonly
          rows="1"
          v-model="item.invoiceContent"
          v-if="item.invoiceType != 1"
        ></v-textarea>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-btn
          text
          color="success"
          @click="openPaymentDialog(item)"
          v-if="item.collectionStatus == 2"
        >
          <v-icon left> mdi-eye </v-icon>
          查看回款记录
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openEditDialog(item)"
          v-if="item.collectionStatus == 1"
        >
          <v-icon left> mdi-pencil </v-icon>
          添加回款记录
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="openFinishDialog(item)"
          v-if="item.collectionStatus == 1"
        >
          <v-icon left> mdi-pencil </v-icon>
          回款完成
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="paymentDialog"
      v-if="paymentDialog"
      width="1200px"
      persistent
      @click:outside="closePaymentDialog"
    >
      <viewPayments :parentObject="paymentItems" />
    </v-dialog>

    <v-dialog
      v-model="editDialog"
      v-if="editDialog"
      width="1200px"
      persistent
      @click:outside="closeEditDialog"
    >
      <editPayments
        :openItem="openItem"
        :closeDialog="closeEditDialog"
      ></editPayments>
    </v-dialog>

    <v-dialog
      v-model="finishDialog"
      v-if="finishDialog"
      width="1200px"
      persistent
      @close:outside="closeFinishDialog"
    >
      <finish
        :paymentItems="paymentItems"
        :openUID="openItem.UID"
        :closeDialog="closeFinishDialog"
        :refresh="getObject"
      />
    </v-dialog>
  </div>
</template>

<script>
import { queryContracts } from "@/api/contract";
import { queryPayments } from "@/api/payment";
import finish from "@/components/payment/Finish";
import editPayments from "@/components/payment/EditFroms";
import viewPayments from "@/components/payment/View";
export default {
  components: {
    finish,
    editPayments,
    viewPayments,
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
        text: "开票类型",
        align: "center",
        value: "invoiceType",
        sortable: false,
      },
      {
        text: "总回款额(CNY)",
        align: "center",
        value: "paymentTotalAmount",
        sortable: false,
      },
      {
        text: "完成回款时间",
        align: "center",
        value: "endPaymentDate",
        sortable: false,
      },
      {
        text: "回款状态",
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
    },
    object: [],
    openItem: {},
    editDialog: false,
    paymentDialog: false,
    finishDialog: false,
    paymentItems: [],
  }),
  created() {
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
        this.stautsToText();
      });
    },
    stautsToText() {
      this.object.forEach(function (e) {
        switch (e.collectionStatus) {
          case 1:
            e.statusText = "回款中";
            return;
          case 2:
            e.statusText = "回款完成";
            return;
        }
      });
    },
    invoiceTypeToText(invoiceType) {
      switch (invoiceType) {
        case 1:
          return "不开发票";
        case 2:
          return "普票";
        case 3:
          return "专票";
        case 4:
          return "形式发票";
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
    openPaymentDialog(item) {
      this.openItem = item;
      queryPayments(this.openItem.UID).then((res) => {
        this.paymentItems = res.data;
        this.paymentDialog = true;
      });
    },
    closePaymentDialog() {
      this.openItem = {};
      this.paymentDialog = false;
    },
    openFinishDialog(item) {
      this.openItem = item;
      queryPayments(this.openItem.UID).then((res) => {
        this.paymentItems = res.data;
        this.finishDialog = true;
      });
    },
    closeFinishDialog() {
      this.openItem = {};
      this.finishDialog = false;
    },
    openEditDialog(item) {
      this.openItem = item;
      this.editDialog = true;
    },
    closeEditDialog() {
      this.openItem = {};
      this.getObject();
      this.editDialog = false;
    },
  },
};
</script>