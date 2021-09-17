<template>
  <div>
    <v-card>
      <v-card-subtitle>
        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="object.no"
              label="合同编号"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.area.name"
              label="区域"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.employee.office.name"
              label="办事处"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.employee.name"
              label="业务员"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="object.customer.company.name"
              label="客户公司"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.customer.name"
              label="客户名称"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="object.contractUnit.text"
              label="签订单位"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.contractDate"
              label="签订日期"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.estimatedDeliveryDate"
              label="合同交货日期"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.endDeliveryDate"
              label="实际交货日期"
              :readonly="
                object.endDeliveryDate != undefined &&
                object.endDeliveryDate.length > 0
              "
              :disabled="
                object.endDeliveryDate == undefined ||
                object.endDeliveryDate.length == 0
              "
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="text.invoiceType"
              label="开票类型"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="text.isSpecial"
              label="特殊合同"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="object.totalAmount"
              label="总金额(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-if="object.invoiceType != 1">
            <v-textarea
              v-model="object.invoiceContent"
              label="开票内容"
              :readonly="
                object.invoiceContent != undefined &&
                object.invoiceContent.length > 0
              "
              :disabled="
                object.invoiceContent == undefined ||
                object.invoiceContent.length == 0
              "
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-text-field
              v-model="text.status"
              label="合同状态"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="text.productionStatus"
              label="生产状态"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              v-model="text.collectionStatus"
              label="回款状态"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row v-if="object.remarks != undefined && object.remarks.length > 0">
          <v-col cols="12">
            <v-textarea
              v-model="object.remarks"
              label="备注"
              readonly
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <taskDataTable
      style="margin-top: 1px"
      ref="taskDataTable"
      :openType="1"
      :openUID="openUID"
      :parentObject="object.tasks"
      v-if="object.tasks"
    />
  </div>
</template>

<script>
import taskDataTable from "../task/DataTable";
import { queryContract } from "@/api/contract";
export default {
  components: {
    taskDataTable,
  },
  props: {
    openUID: {
      type: String,
      default: "",
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
    },
    text: {
      status: "",
      productionStatus: "",
      collectionStatus: "",
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
        case 0:
          this.text.status = "未完成";
          break;
        case 1:
          this.text.status = "已完成";
          break;
      }
      switch (data.productionStatus) {
        case -1:
          this.text.productionStatus = "审批驳回";
          break;
        case 0:
          this.text.productionStatus = "待审批";
          break;
        case 1:
          this.text.productionStatus = "生产中";
          break;
        case 2:
          this.text.productionStatus = "生产完成";
          break;
      }
      switch (data.collectionStatus) {
        case 0:
          this.text.collectionStatus = "回款中";
          break;
        case 1:
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