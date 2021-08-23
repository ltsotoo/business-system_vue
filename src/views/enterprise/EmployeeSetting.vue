<template>
  <v-container>
    <v-row align="baseline">
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-text-field
          label="姓名"
          clearable
          v-model="searchObj.name"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-text-field
          label="手机号"
          clearable
          v-model="searchObj.phone"
        ></v-text-field>
      </v-col>
      <v-col cols="auto">
        <v-btn rounded color="primary" dark @click="getObject"> 查询 </v-btn>
      </v-col>
      <v-divider vertical></v-divider>
      <v-col cols="auto">
        <v-btn rounded color="success" dark @click="openEmployeeAddDialog">
          录入
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="object"
          :footer-props="{
            itemsPerPageOptions: [5, 10, 20],
          }"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon @click="openEmployeeEdiDialog(item)"> mdi-pencil </v-icon>
            <v-icon @click="openEmployeeDelDialog(item.ID)"> mdi-delete </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="addDialog" max-width="500px" persistent v-if="addDialog">
      <employeeForms :closeDialog="closeEmployeeAddDialog" :refresh="getObject"/>
    </v-dialog>

    <v-dialog v-model="ediDialog" max-width="500px" persistent v-if="ediDialog">
      <employeeForms :closeDialog="closeEmployeeEdiDialog" :openType="2" :parentObj="ediObj" :refresh="getObject"/>
    </v-dialog>

    <v-dialog v-model="delDialog" max-width="500px" persistent>
      <v-card>
        <v-card-title class="text-h5">您确定要删除该员工吗?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="deleteEmployee">确定</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeEmployeeDelDialog">取消</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {queryEmployees,delEmployee} from "@/api/employee"
import employeeForms from "@/components/employee/Forms";
export default {
  components: {
    employeeForms,
  },
  data: () => ({
    headers: [
      {
        text: "姓名",
        align: "center",
        value: "name",
        sortable: false,
      },
      {
        text: "电话",
        align: "center",
        value: "phone",
        sortable: false,
      },
      {
        text: "办事处",
        align: "center",
        value: "office.name",
        sortable: false,
      },
      {
        text: "部门",
        align: "center",
        value: "department.name",
        sortable: false,
      },
      {
        text: "职务",
        align: "center",
        value: "role.name",
        sortable: false,
      },
      { text: "操作", align: "center", value: "actions", sortable: false },
    ],
    searchObj: {
      name: "",
      phone: "",
    },
    object: [],
    addDialog: false,
    ediDialog: false,
    ediObj: {},
    delDialog: false,
    deleteID: null,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryEmployees(this.searchObj).then((res) => {
        this.object = res.data;
      });
    },
    openEmployeeAddDialog() {
      this.addDialog = true;
    },
    closeEmployeeAddDialog() {
      this.addDialog = false;
    },
    openEmployeeEdiDialog(obj) {
      this.ediObj = obj;
      this.ediDialog = true;
    },
    closeEmployeeEdiDialog() {
      this.ediObj = {};
      this.ediDialog = false;
    },
    openEmployeeDelDialog(id) {
      this.deleteID = id;
      this.delDialog = true;
    },
    closeEmployeeDelDialog() {
      this.deleteID = null;
      this.delDialog = false;
    },
    deleteEmployee() {
      delEmployee(this.deleteID).then((res) => {
        this.getObject();
        this.closeEmployeeDelDialog();
      });
    },
  },
};
</script>