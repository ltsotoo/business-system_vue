<template>
  <v-container>
    <v-row>
      <v-col cols="12" xl="4" lg="4">
        <v-card :elevation="0">
          <v-card-title>
            <v-row no-gutters>
              <v-col align="center"
                ><p :class="[`text-h5`]">办事处列表</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-row align="baseline">
              <v-col cols="7">
                <v-text-field label="名称" v-model="office.text" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn rounded color="primary" dark @click="getOfficeItems">
                  查询
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <v-btn rounded color="green" dark @click="openOfficeAddDialog">
                  添加
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-data-table
                v-model="office.selectItem"
                :headers="office.headers"
                :items="office.items"
                :items-per-page="5"
                :single-select="true"
                item-key="name"
                @click:row="clickOfficeItem"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" xl="4" lg="4">
        <v-card :elevation="0">
          <v-card-title>
            <v-row no-gutters>
              <v-col align="center">
                <p :class="[`text-h5`]">部门列表</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-row align="baseline">
              <v-col cols="7">
                <v-text-field label="名称" v-model="office.text" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn rounded color="primary" dark @click="getOfficeItems">
                  查询
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <v-btn rounded color="green" dark @click="openOfficeAddDialog">
                  添加
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-data-table
                  v-model="department.selectItem"
                  :headers="department.headers"
                  :items="department.items"
                  :items-per-page="5"
                  :single-select="true"
                  item-key="name"
                  @click:row="clickDepartmentItem"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon> mdi-delete </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" xl="4" lg="4">
        <v-card :elevation="0">
          <v-card-title>
            <v-row no-gutters>
              <v-col align="center">
                <p :class="[`text-h5`]">员工列表</p>
              </v-col>
            </v-row>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-subtitle>
            <v-row align="baseline">
              <v-col cols="7">
                <v-text-field label="名称" v-model="office.text" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn rounded color="primary" dark @click="getOfficeItems">
                  查询
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <v-btn
                  rounded
                  color="green"
                  dark
                  @click="openOfficeAddDialog"
                >
                  添加
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-data-table
                :headers="employee.headers"
                :items="employee.items"
                :items-per-page="5"
              >
                <template v-slot:[`item.actions`]="{ item }">
                  <v-icon> mdi-delete </v-icon>
                </template>
              </v-data-table>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="office.addDialog"
      max-width="400px"
      persistent
      v-if="office.addDialog"
    >
      <officeForms :closeDialog="closeOfficeAddDialog" />
    </v-dialog>
  </v-container>
</template>

<script>
import officeForms from "@/components/office/Forms";
import { queryOffices, queryDepartments } from "@/api/oadrp";
import { queryEmployees } from "@/api/employee";
export default {
  components: {
    officeForms,
  },
  data: () => ({
    office: {
      headers: [
        {
          text: "办事处名称",
          align: "center",
          value: "name",
          sortable: false,
        },
        { text: "操作", align: "center", value: "actions", sortable: false },
      ],
      text: [],
      items: [],
      selectItem: [],
      selectID: null,
      addDialog: false,
    },
    department: {
      headers: [
        {
          text: "部门名称",
          align: "center",
          value: "name",
          sortable: false,
        },
        { text: "操作", align: "center", value: "actions", sortable: false },
      ],
      text: [],
      items: [],
      selectID: null,
      selectItem: [],
    },
    employee: {
      headers: [
        {
          text: "员工名称",
          align: "center",
          value: "name",
          sortable: false,
        },
        { text: "操作", align: "center", value: "actions", sortable: false },
      ],
      text: [],
      items: [],
    },
  }),
  created() {
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      this.office.selectID = null;
      this.office.selectItem = [];
      this.department.items = [];
      this.department.selectID = null;
      this.department.selectItem = [];
      this.employee.items = [];
      queryOffices(this.office.text).then((res) => {
        this.office.items = res.data;
      });
    },
    getDepartmentItems(officeID) {
      queryDepartments({ officeID: officeID }).then((res) => {
        this.department.items = res.data;
      });
    },
    getEmployeeItems(officeID, departmentID) {
      queryEmployees({ officeID: officeID, departmentID: departmentID }).then(
        (res) => {
          this.employee.items = res.data;
        }
      );
    },
    clickOfficeItem(item, options) {
      options.select(true);
      this.office.selectID = item.ID;
      this.department.items = [];
      this.department.selectID = null;
      this.department.selectItem = [];
      this.employee.items = [];
      this.getDepartmentItems(item.ID);
      this.getEmployeeItems(item.ID, null);
    },
    clickDepartmentItem(item, options) {
      options.select(true);
      this.department.selectID = item.ID;
      this.employee.items = [];
      this.getEmployeeItems(this.office.selectID, item.ID);
    },
    openOfficeAddDialog() {
      this.office.addDialog = true;
    },
    closeOfficeAddDialog() {
      this.office.addDialog = false;
      this.getOfficeItems();
    },
  },
};
</script>