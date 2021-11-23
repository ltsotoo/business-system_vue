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
            <v-col cols="3">
              <v-text-field
                v-model="object.estimatedDeliveryDate"
                label="合同交货日期"
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
                v-model="text.payType"
                label="付款类型"
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
      :openType="4"
      :openUID="openUID"
      :parentObject="object.tasks"
      v-if="object.tasks"
    />

    <v-card style="margin-top: 1px">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="pass">通过</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" rounded @click="fail">驳回</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import taskApproveDataTable from "../task/ApproveDataTable";
import { queryContract } from "@/api/contract";
import { contractApprove } from "@/api/contract_flow";
export default {
  components: {
    taskApproveDataTable,
  },
  props: {
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
  },
  data: () => ({
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
    pass() {
      this.object.status = 2;
      this.submit();
    },
    fail() {
      this.object.status = -1;
      this.submit();
    },
    submit() {
      var _this = this;
      if (this.$refs.taskApproveDataTable.check()) {
        contractApprove({
          UID: this.object.UID,
          status: this.object.status,
        }).then((res) => {
          _this.parentFun();
          _this.closeDialog();
        });
      } else {
        this.$message.error("该合同还有产品未分配！！！");
      }
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
      if (data.isSpecial == true) {
        this.text.isSpecial = "是";
      }
    },
  },
};
</script>