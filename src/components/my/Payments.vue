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
      <template v-slot:[`item.payType`]="{ item }">
        {{ payTypeToText(item.payType) }}
      </template>
      <template v-slot:[`item.invoiceType`]="{ item }">
        {{ invoiceTypeToText(item.invoiceType) }}
      </template>
      <template v-slot:[`item.collectionStatus`]="{ item }">
        {{ collectionStatusToText(item.collectionStatus) }}
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
        <v-row>
          <v-col>
            <v-btn text color="success">
              <v-icon left> mdi-eye </v-icon>
              查看详情
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn text color="primary" @click="openAddInvoiceDialog(item)">
              <v-icon left> mdi-pencil </v-icon>
              添加发票
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn text color="primary" @click="openAddPaymentDialog(item)">
              <v-icon left> mdi-pencil </v-icon>
              添加回款
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn text color="primary">
              <v-icon left> mdi-pencil </v-icon>
              回款完成
            </v-btn>
          </v-col>
        </v-row>
      </template>
    </v-data-table>

    <v-dialog
      v-model="addInvoiceDialog"
      v-if="addInvoiceDialog"
      width="1200px"
      persistent
      @click:outside="closeAddInvoiceDialog"
    >
      <v-card>
        <v-card-title></v-card-title>
        <v-card-subtitle>
          <v-form readonly>
            <v-row>
              <v-col cols="4">
                <div class="text-h5">
                  付款类型:{{ payTypeToText(openItem.payType) }}
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-h5">
                  开票类型:{{ invoiceTypeToText(openItem.invoiceType) }}
                </div>
              </v-col>
              <v-col cols="4">
                <div class="text-h5">发票总金额:{{ openItem.totalAmount }}</div>
              </v-col>
              <v-col
                cols="12"
                v-if="
                  openItem.invoiceContent && openItem.invoiceContent.length > 0
                "
              >
                <v-textarea
                  v-model="openItem.invoiceContent"
                  label="开票备注"
                  rows="1"
                  auto-grow
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-subtitle>
      </v-card>
      <invoiceViewForms
        :openItem="openItem"
        style="margin-top: 3px"
      ></invoiceViewForms>
      <invoiceAddForms
        :openItem="openItem"
        :closeDialog="closeAddInvoiceDialog"
        style="margin-top: 3px"
      />
    </v-dialog>

    <v-dialog
      v-model="addPaymentDialog"
      v-if="addPaymentDialog"
      width="1200px"
      persistent
      @click:outside="closeAddPaymentDialog"
    >
      <paymentViewForms :openItem="openItem"></paymentViewForms>
      <paymentAddForms
        :openItem="openItem"
        :closeDialog="closeAddPaymentDialog"
        style="margin-top: 3px"
      />
    </v-dialog>
  </div>
</template>

<script>
import { queryContracts } from "@/api/contract";

import invoiceViewForms from "@/components/invoice/ViewForms";
import invoiceAddForms from "@/components/invoice/AddForms";
import paymentAddForms from "@/components/payment/AddFroms";
import paymentViewForms from "@/components/payment/ViewForms";

export default {
  components: {
    invoiceViewForms,
    invoiceAddForms,

    paymentAddForms,
    paymentViewForms,
  },
  props: {
    queryObject: {
      type: Object,
    },
    payTypeItems: {
      type: Array,
      default: () => [],
    },
    invoiceTypeItems: {
      type: Array,
      default: () => [],
    },
    collectionStatusItems: {
      type: Array,
      default: () => [],
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
        text: "付款类型",
        align: "center",
        value: "payType",
        sortable: false,
      },
      {
        text: "总金额",
        align: "center",
        value: "totalAmount",
        sortable: false,
      },

      {
        text: "总回款额(CNY)",
        align: "center",
        value: "paymentTotalAmount",
        sortable: false,
      },
      {
        text: "总回款额(USD)",
        align: "center",
        value: "paymentTotalAmountUSD",
        sortable: false,
      },
      {
        text: "开票类型",
        align: "center",
        value: "invoiceType",
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
        value: "collectionStatus",
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
    addInvoiceDialog: false,
    addPaymentDialog: false,
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
      });
    },
    collectionStatusToText(collectionStatus) {
      var temp = "";
      this.collectionStatusItems.some((item) => {
        if (item.value == collectionStatus) {
          temp = item.text;
          return;
        }
      });
      return temp;
    },
    invoiceTypeToText(invoiceType) {
      var temp = "";
      this.invoiceTypeItems.some((item) => {
        if (item.value == invoiceType) {
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

    openAddInvoiceDialog(item) {
      this.openItem = item;
      this.addInvoiceDialog = true;
    },
    closeAddInvoiceDialog() {
      this.openItem = {};
      this.addInvoiceDialog = false;
    },

    openAddPaymentDialog(item) {
      this.openItem = item;
      this.addPaymentDialog = true;
    },
    closeAddPaymentDialog() {
      this.openItem = {};
      this.addPaymentDialog = false;
    },
  },
};
</script>