<template>
  <div>
    <v-card>
      <v-card-title>合同审批</v-card-title>
      <v-card-subtitle>
        <v-form readonly>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="object.no" label="合同编号"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.CreatedAt"
                label="录入日期"
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
                v-model="object.preDeposit"
                label="预存款金额"
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

    <taskApproveDataTable
      style="margin-top: 1px"
      ref="taskApproveDataTable"
      :isSpecial="isSpecial"
      :openUID="openUID"
      :parentObject="object.tasks"
      :payType="object.payType"
      v-if="object.tasks"
    />

    <v-card style="margin-top: 1px">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="pass" :disabled="submitDisabled"
          >通过</v-btn
        >
        <v-spacer></v-spacer>
        <v-btn color="error" rounded @click="fail" :disabled="submitDisabled"
          >驳回</v-btn
        >
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import taskApproveDataTable from "../task/ApproveDataTable";
import { queryContract } from "@/api/contract";
import { contractApprove } from "@/api/contract_flow";
import { queryContractInvoiceTypes } from "@/api/dictionary";
export default {
  components: {
    taskApproveDataTable,
  },
  props: {
    isSpecial: {
      type: Boolean,
      default: false,
    },
    openUID: {
      type: String,
      default: "",
    },
    parentFun: {
      type: Function,
      default: null,
    },
    closeDialog: {
      type: Function,
      default: null,
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
    submitDisabled: false,

    invoiceTypeItems: [],
    object: {
      contractUnit: {},
      area: {},
      employee: {
        office: {},
      },
      customer: {
        company: {},
      },
      tasks: [],
      status: null,
    },
    text: {
      status: "",
      productionStatus: "-",
      collectionStatus: "-",
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
      queryContract(this.openUID).then((res) => {
        this.object = res.data;
        this.changeText(res.data);
      });
    },
    pass() {
      if (this.$refs.taskApproveDataTable.check()) {
        this.object.status = 2;
        this.submit();
      } else {
        this.$message.error("该合同还有产品未分配！");
      }
    },
    fail() {
      this.object.status = -1;
      this.submit();
    },
    submit() {
      this.submitDisabled = true;
      contractApprove({
        UID: this.object.UID,
        status: this.object.status,
      }).then((res) => {
        this.parentFun();
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

      if (data.isPreDeposit == true) {
        this.text.isPreDeposit = "是";
      }
    },
  },
};
</script>