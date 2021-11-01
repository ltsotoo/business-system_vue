<template>
  <v-container>
    <v-expansion-panels multiple>
      <v-expansion-panel>
        <v-expansion-panel-header :class="[`text-h4`]">
          区域管理
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form ref="areaQueryForm">
            <v-row align="baseline">
              <v-spacer></v-spacer>
              <v-col cols="4">
                <v-text-field
                  label="区域名称"
                  clearable
                  v-model="areaQueryObject.name"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="办事处名称"
                  clearable
                  v-model="areaQueryObject.officeName"
                ></v-text-field>
              </v-col>
              <v-col cols="auto">
                <v-btn rounded color="primary" dark @click="queryAreas">
                  查询
                </v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="auto">
                <v-btn rounded color="success" dark @click="openAreaAddDialog">
                  添加
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
          <areaDataTable
            ref="areaDataTable"
            :queryObject="areaQueryObject"
          ></areaDataTable>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header :class="[`text-h4`]">
          办事处管理
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form ref="officeQueryForm">
            <v-row align="baseline">
              <v-spacer></v-spacer>
              <v-col cols="7">
                <v-text-field
                  label="办事处名称"
                  clearable
                  v-model="officeQueryObject.name"
                ></v-text-field>
              </v-col>
              <v-col cols="auto">
                <v-btn rounded color="primary" dark @click="queryOffices">
                  查询
                </v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="auto">
                <v-btn
                  rounded
                  color="success"
                  dark
                  @click="openOfficeAddDialog"
                >
                  添加
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
          <officeDataTable
            ref="officeDataTable"
            :queryObject="officeQueryObject"
          ></officeDataTable>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel @click="clickDepartmentPanel">
        <v-expansion-panel-header :class="[`text-h4`]">
          部门管理
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-form ref="departmentQueryForm">
            <v-row align="baseline">
              <v-spacer></v-spacer>
              <v-col cols="3">
                <v-select
                  v-model="departmentQueryObject.officeUID"
                  :items="officeItems"
                  item-text="name"
                  item-value="UID"
                  label="办事处名称"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="部门名称"
                  clearable
                  v-model="departmentQueryObject.name"
                ></v-text-field>
              </v-col>
              <v-col cols="auto">
                <v-btn rounded color="primary" dark @click="queryDepartments">
                  查询
                </v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="auto">
                <v-btn
                  rounded
                  color="success"
                  dark
                  @click="openOfficeAddDialog"
                >
                  添加
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
          <departmentDataTable
            ref="departmentDataTable"
            :queryObject="departmentQueryObject"
          ></departmentDataTable>
        </v-expansion-panel-content>
      </v-expansion-panel>
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
                  v-model="employeeQueryObject.officeUID"
                  :items="officeItems"
                  item-text="name"
                  item-value="UID"
                  label="办事处"
                  clearable
                  @change="getDepartmentItems"
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="employeeQueryObject.departmentUID"
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
                  clearable
                  v-model="employeeQueryObject.name"
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="员工手机号"
                  clearable
                  v-model="employeeQueryObject.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="auto">
                <v-btn rounded color="primary" dark @click="queryEmployees">
                  查询
                </v-btn>
              </v-col>
              <v-divider vertical></v-divider>
              <v-col cols="auto">
                <v-btn
                  rounded
                  color="success"
                  dark
                  @click="openOfficeAddDialog"
                >
                  添加
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
            </v-row>
          </v-form>
          <employeeDataTable
            ref="employeeDataTable"
            :queryObject="employeeQueryObject"
          ></employeeDataTable>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog
      v-model="areaAddDialog"
      max-width="500px"
      persistent
      v-if="areaAddDialog"
    >
      <areaForms :closeDialog="closeAreaAddDialog" :refresh="queryAreas" />
    </v-dialog>

    <v-dialog
      v-model="officeAddDialog"
      max-width="400px"
      persistent
      v-if="officeAddDialog"
    >
      <officeForms
        :closeDialog="closeOfficeAddDialog"
        :refresh="queryOffices"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import { queryOffices, queryDepartments } from "@/api/oadrp";
import areaDataTable from "@/components/enterprise/AreaDataTable";
import areaForms from "@/components/enterprise/AreaForms";
import officeDataTable from "@/components/enterprise/OfficeDataTable";
import officeForms from "@/components/enterprise/OfficeForms";
import departmentDataTable from "@/components/enterprise/DepartmentDataTable";
import employeeDataTable from "@/components/enterprise/EmployeeDataTable";
export default {
  components: {
    areaDataTable,
    areaForms,
    officeDataTable,
    officeForms,
    departmentDataTable,
    employeeDataTable,
  },
  data: () => ({
    areaQueryObject: {
      name: "",
      officeName: "",
    },
    areaAddDialog: false,

    officeQueryObject: {
      name: "",
    },
    officeAddDialog: false,

    officeItems: [],
    departmentQueryObject: {
      officeUID: "",
      name: "",
    },
    departmentAddDialog: false,

    departmentItems: [],
    employeeQueryObject: {
      officeUID: "",
      departmentUID: "",
      name: "",
      phone: "",
    },
  }),
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems() {
      queryDepartments({officeUID:this.employeeQueryObject.officeUID}).then((res) => {
        this.departmentItems = res.data;
      });
    },

    queryAreas() {
      this.$refs.areaDataTable.getObject(this.areaQueryObject);
    },
    openAreaAddDialog() {
      this.areaAddDialog = true;
    },
    closeAreaAddDialog() {
      this.areaAddDialog = false;
    },

    queryOffices() {
      this.$refs.officeDataTable.getObject(this.officeQueryObject);
    },
    openOfficeAddDialog() {
      this.officeAddDialog = true;
    },
    closeOfficeAddDialog() {
      this.officeAddDialog = false;
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
    queryDepartments() {
      this.$refs.departmentDataTable.getObject(this.departmentQueryObject);
    },

    queryEmployees() {
      this.$refs.employeeDataTable.getObject(this.employeeQueryObject);
    },
  },
};
</script>