<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col cols="3"></v-col>
        <v-col cols="3">
          <v-select
            v-model="query.status"
            :items="statusItems"
            item-text="key"
            item-value="value"
            label="状态"
          ></v-select>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="3"> 技术负责人: </v-col>
        <v-col cols="3">
          <v-select
            v-model="officeUID1"
            :items="officeItems"
            item-text="name"
            item-value="UID"
            label="办事处"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="departmentUID1"
            :items="departmentItems1"
            item-text="name"
            item-value="UID"
            label="部门"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="query.technicianManUID"
            :items="employeeItems1"
            item-text="name"
            item-value="UID"
            label="员工"
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row align="center">
        <v-col cols="3"> 采购负责人: </v-col>
        <v-col cols="3">
          <v-select
            v-model="officeUID2"
            :items="officeItems"
            item-text="name"
            item-value="UID"
            label="办事处"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="departmentUID2"
            :items="departmentItems2"
            item-text="name"
            item-value="UID"
            label="部门"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="query.purchaseManUID"
            :items="employeeItems2"
            item-text="name"
            item-value="UID"
            label="员工"
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row align="center">
        <v-col cols="3"> 仓库负责人: </v-col>
        <v-col cols="3">
          <v-select
            v-model="officeUID3"
            :items="officeItems"
            item-text="name"
            item-value="UID"
            label="办事处"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="departmentUID3"
            :items="departmentItems3"
            item-text="name"
            item-value="UID"
            label="部门"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="query.inventoryManUID"
            :items="employeeItems3"
            item-text="name"
            item-value="UID"
            label="员工"
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row align="center">
        <v-col cols="3"> 发货负责人: </v-col>
        <v-col cols="3">
          <v-select
            v-model="officeUID4"
            :items="officeItems"
            item-text="name"
            item-value="UID"
            label="办事处"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="departmentUID4"
            :items="departmentItems4"
            item-text="name"
            item-value="UID"
            label="部门"
          ></v-select>
        </v-col>
        <v-col cols="3">
          <v-select
            v-model="query.shipmentManUID"
            :items="employeeItems4"
            item-text="name"
            item-value="UID"
            label="员工"
          ></v-select>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="submit"> 确定 </v-btn>
      <v-btn color="blue darken-1" text @click="closeDialog"> 取消 </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { queryOffices, queryDepartments } from "@/api/oadrp";
import { queryEmployees } from "@/api/employee";
import { taskApprove } from "@/api/task_flow";
export default {
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
    query: {
      UID: "",
      status: null,
      technicianManUID: "",
      purchaseManUID: "",
      inventoryManUID: "",
      shipmentManUID: "",
    },
    officeUID1: "",
    officeUID2: "",
    officeUID3: "",
    officeUID4: "",
    departmentUID1: "",
    departmentUID2: "",
    departmentUID3: "",
    departmentUID4: "",
    statusItems: [
      { key: "设计", value: 1 },
      { key: "采购", value: 2 },
      { key: "入库", value: 3 },
      { key: "发货", value: 4 },
    ],
    officeItems: [],
    departmentItems1: [],
    departmentItems2: [],
    departmentItems3: [],
    departmentItems4: [],
    employeeItems1: [],
    employeeItems2: [],
    employeeItems3: [],
    employeeItems4: [],
  }),
  created() {
    this.query.UID = this.openUID;
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems1() {
      this.departmentItems1 = [];
      this.employeeItems1 = [];
      this.departmentUID1 = "";
      this.query.technicianManUID = "";
      queryDepartments({
        officeUID: this.officeUID1,
        name: "",
      }).then((res) => {
        this.departmentItems1 = res.data;
      });
    },
    getDepartmentItems2() {
      this.departmentItems2 = [];
      this.employeeItems2 = [];
      this.departmentUID2 = "";
      this.query.purchaseManUID = "";
      queryDepartments({
        officeUID: this.officeUID2,
        name: "",
      }).then((res) => {
        this.departmentItems2 = res.data;
      });
    },
    getDepartmentItems3() {
      this.departmentItems3 = [];
      this.employeeItems3 = [];
      this.departmentUID3 = "";
      this.query.inventoryManUID = "";
      queryDepartments({
        officeUID: this.officeUID3,
        name: "",
      }).then((res) => {
        this.departmentItems3 = res.data;
      });
    },
    getDepartmentItems4() {
      this.departmentItems4 = [];
      this.employeeItems4 = [];
      this.departmentUID4 = "";
      this.query.shipmentManUID = "";
      queryDepartments({
        officeUID: this.officeUID4,
        name: "",
      }).then((res) => {
        this.departmentItems4 = res.data;
      });
    },
    getEmployeeItems1() {
      this.employeeItems1 = [];
      this.query.technicianManUID = "";
      queryEmployees({
        officeUID: this.officeUID1,
        departmentUID: this.departmentUID1,
        name: "",
      }).then((res) => {
        this.employeeItems1 = res.data;
      });
    },
    getEmployeeItems2() {
      this.employeeItems2 = [];
      this.query.purchaseManUID = "";
      queryEmployees({
        officeUID: this.officeUID2,
        departmentUID: this.departmentUID2,
        name: "",
      }).then((res) => {
        this.employeeItems2 = res.data;
      });
    },
    getEmployeeItems3() {
      this.employeeItems3 = [];
      this.query.inventoryManUID = "";
      queryEmployees({
        officeUID: this.officeUID3,
        departmentUID: this.departmentUID3,
        name: "",
      }).then((res) => {
        this.employeeItems3 = res.data;
      });
    },
    getEmployeeItems4() {
      this.employeeItems4 = [];
      this.query.shipmentManUID = "";
      queryEmployees({
        officeUID: this.officeUID4,
        departmentUID: this.departmentUID4,
        name: "",
      }).then((res) => {
        this.employeeItems4 = res.data;
      });
    },
    check() {
      if (this.stauts === null) {
        return false;
      }
      return true;
    },
    submit() {
      var _this = this;
      if (this.check()) {
        taskApprove(this.query).then((res) => {
          _this.parentFun(_this.openUID);
          _this.closeDialog();
        });
      } else {
        this.$message.error("未选择分配状态！");
      }
    },
  },
  watch: {
    officeUID1() {
      this.getDepartmentItems1();
    },
    departmentUID1() {
      this.getEmployeeItems1();
    },
    officeUID2() {
      this.getDepartmentItems2();
    },
    departmentUID2() {
      this.getEmployeeItems2();
    },
    officeUID3() {
      this.getDepartmentItems3();
    },
    departmentUID3() {
      this.getEmployeeItems3();
    },
    officeUID4() {
      this.getDepartmentItems4();
    },
    departmentUID4() {
      this.getEmployeeItems4();
    },
  },
};
</script>