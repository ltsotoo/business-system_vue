<template>
  <div>
    <v-card elevation="1">
      <v-card-title>合同回款表</v-card-title>
    </v-card>
    <v-data-table
      :headers="headers"
      :items="object"
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
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon @click="openPaymentDialog(item)"> mdi-pencil </v-icon>
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
          <v-row v-for="(item, i) in paymentItems" :key="i">
            <v-col cols="2">
              <v-text-field
                label="回款金额(元)"
                readonly
                v-model.number="item.money"
              ></v-text-field>
            </v-col>
            <v-col cols="10">
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
import { queryContractsForIndex } from "@/api/contract";
import { addPayment, queryPayments } from "@/api/payment";
export default {
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
      queryContractsForIndex(
        {},
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
            return "回款完成";
        }
      });
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