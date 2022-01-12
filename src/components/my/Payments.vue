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
      <template v-slot:[`item.isPreDeposit`]="{ item }">
        <div v-if="item.isPreDeposit">是</div>
        <div v-else>否</div>
      </template>
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
            <v-btn text color="success" @click="openViewDialog(item)">
              <v-icon left> mdi-eye </v-icon>
              查看详情
            </v-btn>
          </v-col>
        </v-row>
        <div v-if="item.collectionStatus == 1">
          <v-row v-if="nos.includes('00-04-01') && item.invoiceType != 1">
            <v-col>
              <v-btn text color="primary" @click="openAddInvoiceDialog(item)">
                <v-icon left> mdi-pencil </v-icon>
                添加发票
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="nos.includes('00-04-02')">
            <v-col>
              <v-btn text color="primary" @click="openAddPaymentDialog(item)">
                <v-icon left> mdi-pencil </v-icon>
                添加回款
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="nos.includes('00-04-03')">
            <v-col>
              <v-btn text color="primary" @click="openApproveDialog(item)">
                <v-icon left> mdi-pencil </v-icon>
                回款完成
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </template>
    </v-data-table>

    <v-dialog
      v-model="viewDialog"
      v-if="viewDialog"
      width="1200px"
      persistent
      @click:outside="closeViewDialog"
    >
      <invoiceViewForms :openItem="openItem" />
      <paymentPreView
        :openItem="openItem"
        style="margin-top: 3px"
        v-if="openItem.isPreDeposit"
      />
      <paymentView :openItem="openItem" style="margin-top: 3px" />
    </v-dialog>

    <v-dialog
      v-model="addInvoiceDialog"
      v-if="addInvoiceDialog"
      width="1200px"
      persistent
      @click:outside="closeAddInvoiceDialog"
    >
      <v-card>
        <v-card-title>业务员备注</v-card-title>
        <v-card-subtitle>
          <v-form disabled>
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
              <v-col cols="4" v-if="!openItem.isPreDeposit">
                <div class="text-h5">合同总金额:{{ openItem.totalAmount }}</div>
              </v-col>
              <v-col cols="4" v-if="openItem.isPreDeposit">
                <div class="text-h5">
                  合同预存款总金额:{{ openItem.preDepositRecord }}
                </div>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  class="text-h5"
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
        :openType="2"
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
      <v-card>
        <v-card-title>业务员备注</v-card-title>
        <v-card-subtitle>
          <v-form disabled>
            <v-row>
              <v-col cols="4" v-if="!openItem.isPreDeposit">
                <v-text-field
                  class="text-h5"
                  label="合同总金额"
                  v-model="openItem.totalAmount"
                >
                </v-text-field>
              </v-col>
              <v-col cols="4" v-if="openItem.isPreDeposit">
                <v-text-field
                  class="text-h5"
                  label="合同预存款总金额"
                  v-model="openItem.preDepositRecord"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  class="text-h5"
                  v-model="openItem.paymentContent"
                  label="回款方式"
                  rows="1"
                  auto-grow
                >
                </v-textarea>
              </v-col>
            </v-row>
          </v-form>
        </v-card-subtitle>
      </v-card>
      <paymentView
        :openItem="openItem"
        :openType="2"
        :refresh="getObject"
        :closeDialog="closeAddPaymentDialog"
        style="margin-top: 3px"
        v-if="!openItem.isPreDeposit"
      ></paymentView>
      <paymentAddForms
        :openItem="openItem"
        :refresh="getObject"
        :closeDialog="closeAddPaymentDialog"
        style="margin-top: 3px"
        v-if="!openItem.isPreDeposit"
      />
      <prePaymentView
        :openItem="openItem"
        :openType="2"
        :refresh="getObject"
        :closeDialog="closeAddPaymentDialog"
        style="margin-top: 3px"
        v-if="openItem.isPreDeposit"
      ></prePaymentView>
      <prePaymentAddForms
        :openItem="openItem"
        :refresh="getObject"
        :closeDialog="closeAddPaymentDialog"
        style="margin-top: 3px"
        v-if="openItem.isPreDeposit"
      />
    </v-dialog>

    <v-dialog
      v-model="approveDialog"
      v-if="approveDialog"
      width="1200px"
      persistent
      @click:outside="closeApproveDialog"
    >
      <paymentView :openItem="openItem"></paymentView>
      <v-card style="margin-top: 3px">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="approve"> 完成 </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { queryContracts } from "@/api/contract";
import { changeCollectionStatus } from "@/api/payment";

import invoiceViewForms from "@/components/invoice/ViewForms";
import invoiceAddForms from "@/components/invoice/AddForms";
import paymentAddForms from "@/components/payment/AddForms";
import paymentPreView from "@/components/payment/PreView";
import paymentView from "@/components/payment/View";
import prePaymentAddForms from "@/components/payment/PreAddForms";
import prePaymentView from "@/components/payment/PreView";

export default {
  components: {
    invoiceViewForms,
    invoiceAddForms,

    paymentAddForms,
    paymentPreView,
    paymentView,
    prePaymentAddForms,
    prePaymentView,
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
        text: "付款类型",
        align: "center",
        value: "payType",
        sortable: false,
      },
      {
        text: "是否预存款",
        align: "center",
        value: "isPreDeposit",
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
    viewDialog: false,
    addInvoiceDialog: false,
    addPaymentDialog: false,
    approveDialog: false,
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
    approve() {
      changeCollectionStatus({
        UID: this.openItem.UID,
        isFinalCollectionStatus: true,
      }).then((res) => {
        this.$message.success("合同回款状态修改成功！");
        this.getObject();
        this.closeApproveDialog();
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
    openViewDialog(item) {
      this.openItem = item;
      this.viewDialog = true;
    },
    closeViewDialog() {
      this.openItem = {};
      this.viewDialog = false;
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

    openApproveDialog(item) {
      this.openItem = item;
      this.approveDialog = true;
    },
    closeApproveDialog() {
      this.openItem = {};
      this.approveDialog = false;
    },
  },
};
</script>