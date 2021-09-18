<template>
  <v-container>
    <v-row>
      <v-col cols="12" xl="6" lg="6">
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
                <v-text-field label="名称" v-model="department.text" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn rounded color="primary" @click="getDepartmentItems">
                  查询
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <v-btn rounded color="success" @click="openDepartmentAddDialog">
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
                    <v-icon @click="openDepartmentDelDialog(item.UID)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="12" xl="6" lg="6">
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
                <v-text-field label="名称" v-model="employee.text" clearable>
                </v-text-field>
              </v-col>
              <v-col cols="2">
                <v-btn
                  rounded
                  color="primary"
                  @click="getEmployeeItems"
                  :disabled="department.selectUID == '' ? true : false"
                >
                  查询
                </v-btn>
              </v-col>
              <v-spacer></v-spacer>
              <v-col cols="2">
                <v-btn
                  rounded
                  color="success"
                  @click="openEmployeeAddDialog"
                  :disabled="department.selectUID == '' ? true : false"
                >
                  添加
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-data-table
                  :headers="employee.headers"
                  :items="employee.items"
                  :items-per-page="5"
                >
                  <template v-slot:[`item.actions`]="{ item }">
                    <v-icon @click="openEmployeeDelDialog(item.UID)">
                      mdi-delete
                    </v-icon>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="department.addDialog"
      max-width="400px"
      persistent
      v-if="department.addDialog"
    >
      <departmentForms
        :closeDialog="closeDepartmentAddDialog"
        :parentFun="getDepartmentItems"
      />
    </v-dialog>

    <v-dialog
      v-model="employee.addDialog"
      max-width="400px"
      persistent
      v-if="employee.addDialog"
    >
      <employeeForms
        :parentObj="{
          departmentUID: department.selectUID,
        }"
        :closeDialog="closeEmployeeAddDialog"
        :refresh="getEmployeeItems"
      />
    </v-dialog>

    <v-dialog v-model="department.delDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定要删除该部门吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteDepartment">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeDepartmentDelDialog">
            取消
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="employee.delDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定要删除该员工吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteEmployee">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeEmployeeDelDialog"
            >取消</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import departmentForms from "@/components/department/Forms";
import employeeForms from "@/components/employee/Forms";
import { queryDepartments, delDepartment } from "@/api/oadrp";
import { queryEmployees, delEmployee } from "@/api/employee";
export default {
  components: {
    departmentForms,
    employeeForms,
  },
  data: () => ({
    department: {
      headers: [
        {
          text: "部门名称",
          align: "center",
          value: "name",
          sortable: false,
        },
        {
          text: "部门类型",
          align: "center",
          value: "type.text",
          sortable: false,
        },
        { text: "操作", align: "center", value: "actions", sortable: false },
      ],
      text: "",
      items: [],
      selectItem: [],
      selectUID: "",
      deleteUID: "",
      addDialog: false,
      delDialog: false,
    },
    employee: {
      headers: [
        {
          text: "编号",
          align: "center",
          value: "number",
          sortable: false,
        },
        {
          text: "员工名称",
          align: "center",
          value: "name",
          sortable: false,
        },
        { text: "操作", align: "center", value: "actions", sortable: false },
      ],
      text: "",
      items: [],
      deleteUID: "",
      addDialog: false,
      delDialog: false,
    },
  }),
  created() {
    this.getDepartmentItems();
  },
  methods: {
    getDepartmentItems() {
      this.department.items = [];
      this.department.selectUID = "";
      this.department.selectItem = [];
      this.employee.items = [];
      queryDepartments({
        officeUID: "",
        name: this.department.text,
      }).then((res) => {
        this.department.items = res.data;
      });
    },
    getEmployeeItems() {
      queryEmployees({
        officeUID: "",
        departmentUID: this.department.selectUID,
        name: this.employee.text,
      }).then((res) => {
        this.employee.items = res.data;
      });
    },
    clickDepartmentItem(item, options) {
      setTimeout(() => {
        if (this.department.deleteUID == "") {
          options.select(true);
          this.department.selectUID = item.UID;
          this.employee.items = [];
          this.getEmployeeItems();
        }
      }, 66);
    },
    openDepartmentAddDialog() {
      this.department.addDialog = true;
    },
    closeDepartmentAddDialog() {
      this.department.addDialog = false;
    },
    openDepartmentDelDialog(uid) {
      this.department.deleteUID = uid;
      this.department.delDialog = true;
    },
    closeDepartmentDelDialog() {
      this.department.deleteUID = "";
      this.department.delDialog = false;
    },
    deleteDepartment() {
      delDepartment(this.department.deleteUID).then((res) => {
        this.getDepartmentItems();
        this.closeDepartmentDelDialog();
      });
    },
    openEmployeeAddDialog() {
      this.employee.addDialog = true;
    },
    closeEmployeeAddDialog() {
      this.employee.addDialog = false;
    },
    openEmployeeDelDialog(uid) {
      this.employee.deleteUID = uid;
      this.employee.delDialog = true;
    },
    closeEmployeeDelDialog() {
      this.employee.deleteID = "";
      this.employee.delDialog = false;
    },
    deleteEmployee() {
      delEmployee(this.employee.deleteUID).then((res) => {
        this.getEmployeeItems();
        this.closeEmployeeDelDialog();
      });
    },
  },
};
</script>