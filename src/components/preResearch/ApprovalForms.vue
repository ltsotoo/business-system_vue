<template>
  <div>
    <v-card>
      <v-card-title>审批</v-card-title>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-title>基础信息</v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-text-field
              v-model="preResearch.CreatedAt"
              label="发起时间"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="preResearch.employee.office.name"
              label="办事处"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model="preResearch.employee.name"
              label="业务员"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="设计需求"
              v-model="preResearch.remarks"
              auto-grow
              readonly
              rows="1"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-title>分配</v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              @change="getDepartmentItems"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="departmentUID"
              :items="departmentItems"
              item-text="name"
              item-value="UID"
              label="部门"
              @change="getEmployeeItems"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.employeeUID"
              :items="employeeItems"
              item-text="name"
              item-value="UID"
              label="员工"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-text-field v-model.number="object.days" label="工作天数">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-textarea label="设计要求" v-model="object.requirement" rows="3">
            </v-textarea>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
    <v-card style="margin-top: 1px">
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded class="mx-2" @click="pass">
          <v-icon left> mdi-check-bold </v-icon>
          通过
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="error" rounded class="mx-2" @click="fail">
          <v-icon left> mdi-close-thick </v-icon>
          驳回
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { queryOffices, queryDepartments } from "@/api/oadrp";
import { queryEmployees } from "@/api/employee";
import { editPreResearch } from "@/api/preResearch";
export default {
  props: {
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
    refreshTask: {
      type: Function,
    },
  },
  data: () => ({
    object: {
      UID: "",
      employeeUID: "",
      status: 0,
      days: 1,
      requirement: "",
    },

    officeItems: [],
    departmentItems: [],
    employeeItems: [],

    officeUID: "",
    departmentUID: "",
  }),
  created() {
    this.object.UID = this.preResearch.UID;
    this.getOfficeItems();
  },
  methods: {
    editObject() {
      editPreResearch(this.object).then((res) => {
        this.$message.success("审批完成");
        this.refresh();
        if (this.object.status == 2) {
          this.refreshTask();
        }
        this.closeDialog();
      });
    },
    getOfficeItems() {
      this.departmentItems = [];
      this.departmentUID = "";
      this.employeeItems = [];
      this.object.employeeUID = "";
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems() {
      this.employeeItems = [];
      this.object.employeeUID = "";
      queryDepartments({
        officeUID: this.officeUID,
      }).then((res) => {
        this.departmentItems = res.data;
      });
    },
    getEmployeeItems() {
      queryEmployees({
        officeUID: this.officeUID,
        departmentUID: this.departmentUID,
      }).then((res) => {
        this.employeeItems = res.data;
      });
    },
    pass() {
      this.object.status = 2;
      this.editObject();
    },
    fail() {
      this.object.status = -1;
      this.editObject();
    },
  },
};
</script>