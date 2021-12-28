<template>
  <v-card>
    <v-card-title>员工管理</v-card-title>
    <v-card-subtitle>
      <v-form ref="employeeQueryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-select
              v-model="queryObject.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              @change="getDepartmentItems"
              :clearable="nos.includes('08-03-01')"
              :readonly="nos.includes('08-03-02')"
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="queryObject.departmentUID"
              :items="departmentItems"
              item-text="name"
              item-value="UID"
              label="部门"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="员工名称"
              v-model="queryObject.name"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="员工手机号"
              v-model="queryObject.phone"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" @click="queryEmployees">
              查询
            </v-btn>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col cols="auto">
            <v-btn
              rounded
              color="success"
              @click="openAddDialog"
              v-if="nos.includes('08-03-03')"
            >
              添加
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <employeeDataTable
        ref="employeeDataTable"
        :queryObject="queryObject"
      ></employeeDataTable>

      <v-dialog v-model="addDialog" v-if="addDialog" width="1000px" persistent>
        <employeeFormsAdd
          :parentObj="{
            officeUID: queryObject.officeUID,
            departmentUID: queryObject.departmentUID,
          }"
          :closeDialog="closeAddDialog"
          :refresh="queryEmployees"
        />
      </v-dialog>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryOffices, queryDepartments } from "@/api/oadrp";
import employeeDataTable from "@/components/enterprise/EmployeeDataTable";
import employeeFormsAdd from "@/components/enterprise/EmployeeFormsAdd";
export default {
  components: {
    employeeDataTable,
    employeeFormsAdd,
  },
  data: () => ({
    nos: [],

    officeItems: [],
    departmentItems: [],
    queryObject: {
      officeUID: "",
      departmentUID: "",
      name: "",
      phone: "",
    },
    addDialog: false,
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    if (this.nos.includes("08-03-02")) {
      this.queryObject.officeUID = localStorage.getItem("office");
      this.getDepartmentItems();
    }
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems() {
      this.queryObject.departmentUID = "";
      this.departmentItems = [];
      if (this.queryObject.officeUID && this.queryObject.officeUID != "") {
        queryDepartments({ officeUID: this.queryObject.officeUID }).then(
          (res) => {
            this.departmentItems = res.data;
          }
        );
      }
    },
    queryEmployees() {
      this.$refs.employeeDataTable.getObject();
    },

    openAddDialog() {
      this.addDialog = true;
    },
    closeAddDialog() {
      this.addDialog = false;
    },
  },
};
</script>