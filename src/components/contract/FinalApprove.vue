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
                v-model="object.area.name"
                label="区域"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.area.office.name"
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
            <v-col cols="3">
              <v-text-field
                v-model="object.contractUnit.text"
                label="签订单位"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="object.contractDate"
                label="签订日期"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
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
                v-model="object.totalAmount"
                label="总金额"
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
                v-model="object.paymentTotalAmount"
                label="回款金额(CNY)"
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
            <v-col cols="3">
              <v-text-field
                v-model="text.isSpecial"
                label="特殊合同"
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
    <finalApproveDataTable
      style="margin-top: 5px"
      ref="finalApproveDataTable"
      :parentObject="object.tasks"
      v-if="object.tasks"
      :openType="openType"
      :refresh="refreshAll"
    />
    <viewPayments
      style="margin-top: 5px"
      :parentObject="object.payments"
    ></viewPayments>

    <v-card style="margin-top: 5px">
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-row justify="center" v-if="openType == 2">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn x-large color="error" @click="openRejectPaymentsDialog">
              回款状态回退
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn x-large color="error" @click="openRejectDialog">
              合同驳回
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
        <v-row justify="center" v-if="openType == 3">
          <v-btn x-large color="error" @click="openFinalApproveDialog">
            合同完成
          </v-btn>
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

    <v-dialog
      v-model="rejectPaymentsDialog"
      v-if="rejectPaymentsDialog"
      width="600px"
      persistent
      @click:outside="closeRejectPaymentsDialog"
    >
      <v-card>
        <v-card-title class="text-h5"
          >您确定回退该合同的回款状态吗?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="rejectPayments">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeRejectPaymentsDialog"
            >取消</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="finalApproveDialog"
      v-if="finalApproveDialog"
      width="75%"
      min-width="900px"
      persistent
      @click:outside="closeFinalApproveDialog"
    >
      <finalApproveForms
        :parentObj="object"
        :closeDialog="closeFinalApproveDialogPlus"
        :refresh="refresh"
      />
    </v-dialog>
  </div>
</template>

<script>
import finalApproveDataTable from "../task/FinalApproveDataTable";
import viewPayments from "../payment/View";
import finalApproveForms from "./FinalApproveForms.vue";
import { queryContract, rejectContract } from "@/api/contract";
import { rejectContractPaymentStatus } from "@/api/payment";
export default {
  components: {
    finalApproveDataTable,
    viewPayments,
    finalApproveForms,
  },
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openUID: {
      type: String,
      default: "",
    },
    refresh: {
      type: Function,
    },
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    object: {
      no: "",
      contractDate: "",
      estimatedDeliveryDate: "",
      endDeliveryDate: "",
      invoiceType: null,
      isSpecial: null,
      totalAmount: null,
      invoiceContent: "",
      contractUnit: {},
      area: {
        name: "",
        office: {
          name: "",
        },
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
      productionStatus: "-",
      collectionStatus: "-",
      invoiceType: "",
      isSpecial: "否",
    },

    rejectDialog: false,
    rejectPaymentsDialog: false,
    finalApproveDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryContract(this.openUID).then((res) => {
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
    openRejectPaymentsDialog() {
      this.rejectPaymentsDialog = true;
    },
    closeRejectPaymentsDialog() {
      this.rejectPaymentsDialog = false;
    },
    openFinalApproveDialog() {
      this.finalApproveDialog = true;
    },
    closeFinalApproveDialog() {
      this.finalApproveDialog = false;
    },
    closeFinalApproveDialogPlus() {
      this.closeFinalApproveDialog();
      this.closeDialog();
    },
    reject() {
      rejectContract({ UID: this.openUID }).then((res) => {
        this.$message.success("合同驳回成功！");
        this.refresh();
        this.closeDialog();
      });
    },
    rejectPayments() {
      rejectContractPaymentStatus({ UID: this.openUID }).then((res) => {
        this.$message.success("回款状态驳回成功！");
        this.refresh();
        this.closeDialog();
      });
    },

    changeText(data) {
      switch (data.invoiceType) {
        case 1:
          this.text.invoiceType = "不开发票";
          break;
        case 2:
          this.text.invoiceType = "普票";
          break;
        case 3:
          this.text.invoiceType = "专票";
          break;
        case 4:
          this.text.invoiceType = "形式发票";
          break;
      }
      switch (data.status) {
        case -1:
          this.text.status = "审核驳回";
          break;
        case 1:
          this.text.status = "待审核";
          break;
        case 2:
          this.text.status = "未完成";
          break;
        case 3:
          this.text.status = "已完成";
          break;
      }
      switch (data.productionStatus) {
        case 1:
          this.text.productionStatus = "生产中";
          break;
        case 2:
          this.text.productionStatus = "生产完成";
          break;
      }
      switch (data.collectionStatus) {
        case 1:
          this.text.collectionStatus = "回款中";
          break;
        case 2:
          this.text.collectionStatus = "回款完成";
          break;
      }
      switch (data.payType) {
        case 1:
          this.text.payType = "人民币";
          break;
        case 2:
          this.text.payType = "美元";
          break;
      }
      if (data.isSpecial == true) {
        this.text.isSpecial = "是";
      }
    },
  },
};
</script>