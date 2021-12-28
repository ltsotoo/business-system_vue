<template>
  <v-card>
    <v-card-title v-if="openType == 0">任务分配</v-card-title>
    <v-card-title v-if="openType == 2">任务重置</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row v-if="isSpecial">
          <v-col>
            <v-text-field
              label="特殊合同提成百分比(%)"
              v-model.number="query.pushMoneyPercentages"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="query.type"
              :items="typeItems"
              item-text="key"
              item-value="value"
              label="类型"
              :rules="rules.must"
            ></v-select>
          </v-col>
        </v-row>
        <div v-if="query.type > 2">
          <v-row align="center">
            <v-col cols="1"> 技术: </v-col>
            <v-col cols="4">
              <v-select
                v-model="officeUID1"
                :items="officeItems"
                item-text="name"
                item-value="UID"
                label="办事处"
                @change="getEmployeeItems1"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="query.technicianManUID"
                :items="employeeItems1"
                item-text="name"
                item-value="UID"
                label="员工"
                :rules="rules.must"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="query.technicianDays"
                label="技术工作天数"
                :rules="rules.number"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </div>
        <div v-if="query.type > 1">
          <v-row align="center">
            <v-col cols="1"> 采购: </v-col>
            <v-col cols="4">
              <v-select
                v-model="officeUID2"
                :items="officeItems"
                item-text="name"
                item-value="UID"
                label="办事处"
                @change="getEmployeeItems2"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                v-model="query.purchaseManUID"
                :items="employeeItems2"
                item-text="name"
                item-value="UID"
                label="员工"
                :rules="rules.must"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model.number="query.purchaseDays"
                label="采购工作天数"
                :rules="rules.number"
              >
              </v-text-field>
            </v-col>
          </v-row>
        </div>
        <v-row align="center">
          <v-col cols="1"> 仓库: </v-col>
          <v-col cols="4">
            <v-select
              v-model="officeUID3"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              @change="getEmployeeItems3"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="query.inventoryManUID"
              :items="employeeItems3"
              item-text="name"
              item-value="UID"
              label="员工"
              :rules="rules.must"
            ></v-select>
          </v-col>
        </v-row>
        <v-row align="center">
          <v-col cols="1"> 物流: </v-col>
          <v-col cols="4">
            <v-select
              v-model="officeUID4"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              @change="getEmployeeItems4"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="query.shipmentManUID"
              :items="employeeItems4"
              item-text="name"
              item-value="UID"
              label="员工"
              :rules="rules.must"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea v-model="query.aRemarks" rows="3" label="备注">
            </v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit"> 确定 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { queryOffices } from "@/api/oadrp";
import { querySPEmployees } from "@/api/employee";
import { taskFlowApprove } from "@/api/task_flow";
export default {
  props: {
    isSpecial: {
      type: Boolean,
      default: false,
    },
    openType: {
      type: Number,
      default: 0,
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
  },
  data: () => ({
    rules: {
      must: [(v) => !!v || "必填项"],
      number: [(v) => /^((0)|([1-9]\d*))$/.test(v) || "大于等于零的整数"],
      money: [
        (v) => /^\d+(\.\d{1,3})?$/.test(v) || "大于零的数字且最多三位小数",
      ],
    },
    typeItems: [
      { key: "标准/第三方有库存", value: 1 },
      { key: "标准/第三方无库存", value: 2 },
      { key: "非标准定制", value: 3 },
    ],
    query: {
      UID: "",
      type: 1,
      technicianManUID: "",
      purchaseManUID: "",
      inventoryManUID: "",
      shipmentManUID: "",
      technicianDays: 0,
      purchaseDays: 0,
      isReset: false,
      aRemarks: "",
      pushMoneyPercentages: 0,
    },
    officeUID1: "",
    officeUID2: "",
    officeUID3: "",
    officeUID4: "",
    officeItems: [],
    employeeItems1: [],
    employeeItems2: [],
    employeeItems3: [],
    employeeItems4: [],
  }),
  created() {
    this.query.UID = this.openUID;
    this.getOfficeItems();
    if (this.openType == 2) {
      this.query.isReset = true;
    }
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getEmployeeItems1() {
      this.employeeItems1 = [];
      this.query.technicianManUID = "";
      querySPEmployees({
        officeUID: this.officeUID1,
        permissionUID: "630ebd957a89435baeb5cb1a06228e9c",
      }).then((res) => {
        this.employeeItems1 = res.data;
      });
    },
    getEmployeeItems2() {
      this.employeeItems2 = [];
      this.query.purchaseManUID = "";
      querySPEmployees({
        officeUID: this.officeUID2,
        permissionUID: "ff861728924546fb8d7d0e1591506df5",
      }).then((res) => {
        this.employeeItems2 = res.data;
      });
    },
    getEmployeeItems3() {
      this.employeeItems3 = [];
      this.query.inventoryManUID = "";
      querySPEmployees({
        officeUID: this.officeUID3,
        permissionUID: "a162b3b7567a4d51b53ad70d2b3c76a2",
      }).then((res) => {
        this.employeeItems3 = res.data;
      });
    },
    getEmployeeItems4() {
      this.employeeItems4 = [];
      this.query.shipmentManUID = "";
      querySPEmployees({
        officeUID: this.officeUID4,
        permissionUID: "0f089b7de0394aefaf19902d3fb1a3e4",
      }).then((res) => {
        this.employeeItems4 = res.data;
      });
    },
    submit() {
      var _this = this;
      if (this.validateForm()) {
        taskFlowApprove(this.query).then((res) => {
          _this.parentFun(_this.openUID);
          _this.closeDialog();
        });
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
  watch: {
    "query.type": {
      handler: function (val) {
        this.query.technicianManUID = "";
        this.query.purchaseManUID = "";
      },
    },
  },
};
</script>