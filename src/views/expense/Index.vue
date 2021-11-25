<template>
  <v-container>
    <!-- <v-card>
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              label="个人剩余报销余额(元)"
              v-model="employee.money"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              label="办事处剩余报销余额(元)"
              v-model="employee.office.money"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card> -->
    <v-card style="margin-top: 10px">
      <v-card-title></v-card-title>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-spacer></v-spacer>
            <v-col cols="2">
              <v-select
                v-model="queryObject.type"
                :items="expenseTypeItems"
                item-text="text"
                item-value="value"
                label="类型"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="queryObject.officeUID"
                :items="officeItems"
                item-text="name"
                item-value="UID"
                label="办事处"
                clearable
                :disabled="nos.indexOf('8') == -1"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="员工名称"
                v-model.trim="queryObject.employeeName"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="员工电话"
                v-model.trim="queryObject.employeePhone"
                clearable
                maxlength="20"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
        </v-form>
        <div style="margin-top: 10px"></div>
        <expenseDataTable :queryObject="queryObject" ref="expenseDataTable" />
      </v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import expenseDataTable from "@/components/expense/DataTable";
import { queryOffices } from "@/api/oadrp";
import { queryEmployee } from "@/api/employee.js";
export default {
  components: {
    expenseDataTable,
  },
  data: () => ({
    expenseTypeItems: [
      { text: "个人", value: 1 },
      { text: "办事处", value: 2 },
    ],
    officeItems: [],
    queryObject: {
      type: 0,
      officeUID: "",
      employeeName: "",
      employeePhone: "",
    },

    employee: {
      money:null,
      office:{
        money:null,
      }
    },
    nos: [],
  }),
  created() {
    this.getOfficeItems();

    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );

    if (this.nos.indexOf("8") == -1 && this.nos.indexOf("7") != -1) {
      this.queryObject.officeUID = localStorage.getItem("office");
    }

    // this.getEmployee();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    query() {
      this.$refs.expenseDataTable.getObject();
    },
    getEmployee() {
      queryEmployee(localStorage.getItem("uid")).then((res) => {
        this.employee = res.data;
      });
    },
  },
};
</script>