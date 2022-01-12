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
                label="预存款金额"
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
      :isSpecial="isSpecial"
      :parentObject="object.tasks"
      :payType="object.payType"
      v-if="object.tasks"
      :refresh="refreshAll"
    />
    <preViewPayments
      style="margin-top: 5px"
      :openItem="openItem"
      v-if="openItem.isPreDeposit"
    ></preViewPayments>
    <viewPayments style="margin-top: 5px" :openItem="openItem"></viewPayments>

    <v-card style="margin-top: 5px">
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-row justify="center">
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              x-large
              color="error"
              @click="openProductionToFinishDialog"
              :disabled="!openItem.isPreDeposit"
            >
              预存款合同完成
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="auto">
            <v-btn
              x-large
              color="error"
              @click="openRejectCollectionStatusDialog"
              :disabled="openItem.collectionStatus == 1"
            >
              回款状态驳回
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
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="productionToFinishDialog"
      v-if="productionToFinishDialog"
      width="600px"
      persistent
      @click:outside="closeProductionToFinishDialog"
    >
      <v-card>
        <v-card-title class="text-h5"
          >您确定该预存款合同已经完成了吗?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="approveToFinish">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" rounded @click="closeProductionToFinishDialog"
            >取消</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="rejectCollectionStatusDialog"
      v-if="rejectCollectionStatusDialog"
      width="600px"
      persistent
      @click:outside="closeRejectCollectionStatusDialog"
    >
      <v-card>
        <v-card-title class="text-h5"
          >您确定驳回该合同的回款状态吗?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" rounded @click="rejectCollectionStatus"
            >确定</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            rounded
            @click="closeRejectCollectionStatusDialog"
            >取消</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

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
import preViewPayments from "../payment/PreView";
import viewPayments from "../payment/View";
import { queryContract } from "@/api/contract";
import {
  rejectContract,
  taskFlowApproveProductionStatusToFinish,
} from "@/api/contract_flow";
import { queryContractInvoiceTypes } from "@/api/dictionary";
import { changeCollectionStatus } from "@/api/payment";
export default {
  components: {
    editTaskDataTable,
    preViewPayments,
    viewPayments,
  },
  props: {
    isSpecial: {
      type: Boolean,
      default: false,
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
      isPreDeposit: "否",
    },

    rejectCollectionStatusDialog: false,
    rejectDialog: false,
    productionToFinishDialog: false,
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
    approveToFinish() {
      taskFlowApproveProductionStatusToFinish({ UID: this.openItem.UID }).then(
        (res) => {
          this.$message.success("该预存款合同已完成！");
          this.refresh();
          this.closeDialog();
        }
      );
    },

    openProductionToFinishDialog() {
      this.productionToFinishDialog = true;
    },
    closeProductionToFinishDialog() {
      this.productionToFinishDialog = false;
    },
    openRejectDialog() {
      this.rejectDialog = true;
    },
    closeRejectDialog() {
      this.rejectDialog = false;
    },
    openRejectCollectionStatusDialog() {
      this.rejectCollectionStatusDialog = true;
    },
    closeRejectCollectionStatusDialog() {
      this.rejectCollectionStatusDialog = false;
    },

    rejectCollectionStatus() {
      changeCollectionStatus({
        UID: this.openItem.UID,
        isFinalCollectionStatus: false,
      }).then((res) => {
        this.$message.success("合同回款状态驳回成功！");
        this.refresh();
        this.closeDialog();
      });
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

      if (data.isPreDeposit == true) {
        this.text.isPreDeposit = "是";
      }
    },
  },
};
</script>