<template>
  <div>
    <v-card>
      <v-card-title>合同内容</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="object.no" label="合同编号"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.CreatedAt"
                label="录入时间"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.office.name"
                label="办事处"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.employee.name"
                label="业务员"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="object.region.text"
                label="省份"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.customer.company.name"
                label="客户公司"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.customer.name"
                label="客户名称"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="object.contractDate"
                label="合同签订日期"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.estimatedDeliveryDate"
                label="合同交货日期"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.endDeliveryDate"
                label="实际交货日期"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.endPaymentDate"
                label="完成回款日期"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="text.isSpecial"
                label="特殊合同"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="text.isPreDeposit"
                label="是否预存款"
              ></v-text-field>
            </v-col>
            <v-col cols="3" v-if="object.isPreDeposit">
              <v-text-field
                v-model="object.preDepositRecord"
                label="合同预存款金额"
              ></v-text-field>
            </v-col>
            <v-col cols="3" v-if="object.isPreDeposit">
              <v-text-field
                v-model="object.preDeposit"
                label="剩余预存款金额"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="object.contractUnit.text"
                label="签订单位"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="text.payType"
                label="付款类型"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.totalAmount"
                label="总金额"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.paymentTotalAmount"
                label="回款总金额(CNY)"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="text.invoiceType"
                label="开票类型"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="object.invoiceContent"
                label="开票内容"
                rows="1"
                auto-grow
              ></v-textarea>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="object.paymentContent"
                label="付款方式"
                auto-grow
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                v-model="object.remarks"
                label="备注（发货地址等）"
                auto-grow
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field
                v-model="text.status"
                label="合同状态"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="text.productionStatus"
                label="生产状态"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="text.collectionStatus"
                label="回款状态"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <taskDataTable
      style="margin-top: 5px"
      ref="taskDataTable"
      :parentObject="object.tasks"
      :payType="object.payType"
      :isIndex="isIndex"
      :indexHeaders="headers"
    />
    <viewInvoices style="margin-top: 5px" :openItem="openItem"></viewInvoices>
    <preViewPayments
      style="margin-top: 5px"
      :openItem="openItem"
      v-if="openItem.isPreDeposit"
    ></preViewPayments>
    <viewPayments style="margin-top: 5px" :openItem="openItem"></viewPayments>
  </div>
</template>

<script>
import taskDataTable from "../task/ViewDataTable";
import viewPayments from "../payment/View";
import preViewPayments from "../payment/PreView";
import viewInvoices from "../invoice/ViewForms";
import { queryContract } from "@/api/contract";
import { queryContractInvoiceTypes } from "@/api/dictionary";
export default {
  components: {
    taskDataTable,
    viewPayments,
    preViewPayments,
    viewInvoices,
  },
  props: {
    openItem: {
      type: Object,
      default: {},
    },
    refresh: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
    isIndex: {
      type: Boolean,
      default: false,
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
    headers: [
      {
        text: "ID",
        align: "center",
        sortable: false,
        value: "ID",
      },
      {
        text: "产品",
        align: "center",
        sortable: false,
        value: "product.name",
      },
      { text: "数量", align: "center", value: "number", sortable: false },
      { text: "单位", align: "center", value: "unit", sortable: false },
      {
        text: "标准价格",
        align: "center",
        value: "standardPrice",
        sortable: false,
      },
      { text: "单价", value: "price", sortable: false },
      { text: "总价", value: "totalPrice", sortable: false },
      {
        text: "负责人",
        align: "center",
        value: "employees",
        sortable: false,
      },
      { text: "状态", align: "center", value: "status", sortable: false },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],

    invoiceTypeItems: [],
    object: {
      no: "",
      contractDate: "",
      estimatedDeliveryDate: "",
      endDeliveryDate: "",
      invoiceType: null,
      isSpecial: null,
      isPreDeposit: null,
      preDeposit: 0,
      totalAmount: null,
      invoiceContent: "",
      contractUnit: {},
      region: {
        text: "",
      },
      office: {
        name: "",
      },
      employee: {
        name: "",
      },
      customer: {
        name: "",
        company: {
          name: "",
        },
      },
      contractUnit: {
        text: "",
      },
    },
    text: {
      status: "",
      productionStatus: "",
      collectionStatus: "",
      invoiceType: "",
      isSpecial: "否",
      isPreDeposit: "否",
    },
  }),
  created() {
    this.getInvoiceTypeItems();
    this.getObject();
  },
  methods: {
    getInvoiceTypeItems() {
      queryContractInvoiceTypes().then((res) => {
        this.invoiceTypeItems = res.data;
      });
    },
    getObject() {
      queryContract(this.openItem.UID).then((res) => {
        this.object = res.data;
        this.changeText(res.data);
      });
    },

    changeText(data) {
      this.invoiceTypeItems.some((item) => {
        if (item.value == data.invoiceType) {
          this.text.invoiceType = item.text;
          return;
        }
      });
      this.statusItems.some((item) => {
        if (item.value == data.status) {
          this.text.status = item.text;
          return;
        }
      });
      this.productionStatusItems.some((item) => {
        if (item.value == data.productionStatus) {
          this.text.productionStatus = item.text;
          return;
        }
      });
      this.collectionStatusItems.some((item) => {
        if (item.value == data.collectionStatus) {
          this.text.collectionStatus = item.text;
          return;
        }
      });
      this.payTypeItems.some((item) => {
        if (item.value == data.payType) {
          this.text.payType = item.text;
          return;
        }
      });

      if (data.isSpecial == true) {
        this.text.isSpecial = "是";
      }

      if (data.isPreDeposit == true) {
        this.text.isPreDeposit = "是";
      }
    },
  },
};
</script>