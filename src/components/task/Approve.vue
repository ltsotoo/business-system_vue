<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col cols="4">
          <v-select
            v-model="stauts"
            :items="statusItems"
            item-text="key"
            item-value="value"
            label="状态"
          ></v-select>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-select
            v-model="officeUID"
            :items="officeItems"
            item-text="name"
            item-value="UID"
            label="办事处"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="departmentUID"
            :items="departmentItems"
            item-text="name"
            item-value="UID"
            label="部门"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="employeeUID"
            :items="employeeItems"
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
    stauts: null,
    employeeUID: "",
    officeUID: "",
    departmentUID: "",
    statusItems: [
      { key: "设计", value: 1 },
      { key: "采购", value: 2 },
      { key: "入库", value: 3 },
      { key: "发货", value: 4 },
    ],
    officeItems: [],
    departmentItems: [],
    employeeItems: [],
  }),
  created() {
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems() {
      this.departmentItems = [];
      this.employeeItems = [];
      this.departmentUID = "";
      this.employeeUID = "";
      queryDepartments({
        officeUID: this.officeUID,
        name: "",
      }).then((res) => {
        this.departmentItems = res.data;
      });
    },
    getEmployeeItems() {
      this.employeeItems = [];
      this.employeeUID = "";
      queryEmployees({
        officeUID: this.officeUID,
        departmentUID: this.departmentUID,
        name: "",
      }).then((res) => {
        this.employeeItems = res.data;
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
        taskApprove({
          UID: this.openUID,
          employeeUID: this.employeeUID,
          status: this.stauts,
        }).then((res) => {
          _this.parentFun(_this.openUID);
          _this.closeDialog();
        });
      } else {
        this.$message.error("未选择分配状态！");
      }
    },
  },
  watch: {
    officeUID() {
      this.getDepartmentItems();
    },
    departmentUID() {
      this.getEmployeeItems();
    },
  },
};
</script>