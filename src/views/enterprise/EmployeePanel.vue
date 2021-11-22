<template>
  <v-expansion-panel @click="clickDepartmentPanel">
    <v-expansion-panel-header :class="[`text-h4`]">
      员工管理
    </v-expansion-panel-header>
    <v-expansion-panel-content>
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
              clearable
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
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-text-field
              label="员工手机号"
              v-model="queryObject.phone"
              clearable
              counter
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
            <v-btn rounded color="success" @click="openAddDialog"> 添加 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <employeeDataTable
        ref="employeeDataTable"
        :queryObject="queryObject"
      ></employeeDataTable>

      <v-dialog
        v-model="addDialog"
        v-if="addDialog"
        width="800px"
        persistent
        @click:outside="closeAddDialog"
      >
        <employeeFormsAdd
          :parentObj="{
            officeUID: queryObject.officeUID,
            departmentUID: queryObject.departmentUID,
          }"
          :officeItems="officeItems"
          :closeDialog="closeAddDialog"
          :refresh="queryEmployees"
        />
      </v-dialog>
    </v-expansion-panel-content>
  </v-expansion-panel>
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
    clickDepartmentPanel(event) {
      if (
        !event.currentTarget.classList.contains(
          "v-expansion-panel-header--active"
        ) &&
        this.officeItems.length == 0
      ) {
        this.getOfficeItems();
      }
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