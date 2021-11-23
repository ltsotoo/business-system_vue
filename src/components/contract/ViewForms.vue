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
    <myViewTask
      style="margin-top: 5px"
      ref="taskDataTable"
      :parentObject="object.tasks"
      v-if="isIndex"
    />
    <taskDataTable
      style="margin-top: 5px"
      ref="taskDataTable"
      :parentObject="object.tasks"
      v-else
    />
    <viewPayments
      style="margin-top: 5px"
      :parentObject="object.payments"
    ></viewPayments>
  </div>
</template>

<script>
import taskDataTable from "../task/ViewDataTable";
import myViewTask from "../my/ViewTask";
import viewPayments from "../payment/View";
import { queryContract } from "@/api/contract";
export default {
  components: {
    taskDataTable,
    myViewTask,
    viewPayments,
  },
  props: {
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
    isIndex: {
      type: Boolean,
      default: false,
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