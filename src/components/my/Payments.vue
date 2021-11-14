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
          rounded
          color="primary"
          @click="openPaymentDialog(item)"
          class="mx-2"
          v-if="item.collectionStatus == 1"
        >
          <v-icon left> mdi-pencil </v-icon>
          编辑回款记录
        </v-btn>
        <v-btn
          rounded
          color="success"
          @click="openPaymentDialog(item)"
          class="mx-2"
          v-if="item.collectionStatus == 2"
        >
          <v-icon left> mdi-eye </v-icon>
          查看回款记录
        </v-btn>
      </template>
    </v-data-table>

    <v-dialog
      v-model="paymentDoalog"
      max-width="1200px"
      persistent
      v-if="paymentDoalog"
    >
      <v-card>
        <v-card-title> 历史回款记录 </v-card-title>
        <v-card-subtitle>
          <v-row v-for="(item, i) in paymentItems" :key="i" align="center">
            <v-col cols="2">
              <v-text-field
                label="时间"
                readonly
                v-model.number="item.CreatedAt"
              ></v-text-field>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="回款金额(元)"
                readonly
                v-model.number="item.money"
              ></v-text-field>
            </v-col>
            <v-col cols="8">
              <v-textarea
                label="备注"
                readonly
                auto-grow
                rows="1"
                v-model="item.remarks"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-card-subtitle>
        <div v-if="openItem.collectionStatus == 1">
          <v-card-title> 新增回款记录 </v-card-title>
          <v-card-subtitle>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  label="回款金额(元)"
                  v-model.number="payment.money"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-textarea
                  label="备注"
                  auto-grow
                  rows="3"
                  v-model="payment.remarks"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="createPayment"
            v-if="openItem.collectionStatus == 1"
          >
            提交
          </v-btn>
          <v-btn color="blue darken-1" text @click="closePaymentDialog">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryContracts } from "@/api/contract";
import { addPayment, queryPayments } from "@/api/payment";
export default {
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
        text: "总金额(元)",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },
      {
        text: "合同签订时间",
        align: "center",
        value: "contractDate",
        sortable: false,
      },
      {
        text: "开票类型",
        align: "center",
        value: "invoiceType",
        sortable: false,
      },
      {
        text: "开票内容",
        align: "center",
        value: "invoiceContent",
        sortable: false,
        width: "450px",
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
    paymentDoalog: false,
    paymentItems: [],
    payment: {
      contractUID: "",
      money: 0,
      remarks: "",
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      this.options.loading = true;
      this.queryObject.status = 2;
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
    getPayments() {
      queryPayments(this.openItem.UID).then((res) => {
        this.paymentItems = res.data;
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
    openPaymentDialog(item) {
      this.openItem = item;
      this.getPayments();
      this.paymentDoalog = true;
    },
    closePaymentDialog() {
      this.openItem = {};
      this.paymentDoalog = false;
    },
    createPayment() {
      this.payment.contractUID = this.openItem.UID;
      var _this = this;
      addPayment(this.payment).then((res) => {
        _this.getObject();
        _this.closePaymentDialog();
      });
    },
  },
};
</script>