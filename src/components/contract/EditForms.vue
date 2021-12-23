<template>
  <div>
    <v-card>
      <v-card-title>合同编辑</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="object.no" label="合同编号"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.region.text"
                label="省份"
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
                v-model="object.CreatedAt"
                label="录入时间"
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
                label="签订日期"
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
                v-model="object.contractUnit.text"
                label="签订单位"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="text.isSpecial"
                label="特殊合同"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
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

            <v-col cols="12" v-if="object.invoiceType != 1">
              <v-textarea
                v-model="object.invoiceContent"
                label="开票内容"
                auto-grow
                rows="3"
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

          <v-row
            v-if="object.remarks != undefined && object.remarks.length > 0"
          >
            <v-col cols="12">
              <v-textarea
                v-model="object.remarks"
                label="备注"
                auto-grow
                rows="1"
              ></v-textarea>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <editTaskDataTable
      style="margin-top: 5px"
      :parentObject="object.tasks"
      v-if="object.tasks"
      :refresh="refreshAll"
    />
    <viewPayments style="margin-top: 5px" :openItem="openItem"></viewPayments>

    <v-card style="margin-top: 5px">
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-row justify="center">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn x-large color="error" @click="openRejectDialog">
              合同驳回
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="rejectDialog"
      v-if="rejectDialog"
      width="600px"
      persistent
      @click:outside="closeRejectDialog"
    >
      <v-card>
        <v-card-title class="text-h5"
          >您确定驳回该审批通过了的合同吗?</v-card-title
        >
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
import editTaskDataTable from "../task/EditDataTable";
import viewPayments from "../payment/View";
import { queryContract } from "@/api/contract";
import { rejectContract } from "@/api/contract_flow";
import { queryContractInvoiceTypes } from "@/api/dictionary";
export default {
  components: {
    editTaskDataTable,
    viewPayments,
  },
  props: {
    openType: {
      type: Number,
      default: 0,
    },
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
    invoiceTypeItems: [],
    object: {
      CreatedAt: "",
      no: "",
      contractDate: "",
      estimatedDeliveryDate: "",
      endDeliveryDate: "",
      endPaymentDate: "",
      isSpecial: null,
      totalAmount: null,
      paymentTotalAmount: null,
      invoiceType: null,
      invoiceContent: "",
      remarks: "",
      contractUnit: {
        text: "",
      },
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
      payType: "",
      status: "",
      productionStatus: "",
      collectionStatus: "",
      invoiceType: "",
      isSpecial: "否",
    },

    rejectDialog: false,
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
    refreshAll() {
      this.refresh();
      this.getObject();
    },

    openRejectDialog() {
      this.rejectDialog = true;
    },
    closeRejectDialog() {
      this.rejectDialog = false;
    },

    reject() {
      rejectContract({ UID: this.openItem.UID }).then((res) => {
        this.$message.success("合同驳回成功！");
        this.refresh();
        this.closeDialog();
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
    },
  },
};
</script>