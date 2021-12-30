<template>
  <v-card>
    <v-card-title>报销管理</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="10">
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.type"
                  :items="expenseTypeItems"
                  item-text="text"
                  item-value="UID"
                  label="类型"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.status"
                  :items="statusItems"
                  item-text="text"
                  item-value="value"
                  label="状态"
                  clearable
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="queryObject.officeUID"
                  :items="officeItems"
                  item-text="name"
                  item-value="UID"
                  label="办事处"
                  :clearable="nos.includes('07-01-02')"
                  :readonly="!nos.includes('07-01-02')"
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
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-menu
                  ref="startMenu"
                  v-model="startMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="queryObject.startDate"
                      label="开始时间"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="zh-cn"
                    scrollable
                    no-title
                    v-model="queryObject.startDate"
                    @change="$refs.yearMenu.save(queryObject.startDate)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu
                  ref="endMenu"
                  v-model="endMenu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="queryObject.endDate"
                      label="结束时间"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      clearable
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    locale="zh-cn"
                    scrollable
                    no-title
                    v-model="queryObject.endDate"
                    @change="$refs.yearMenu.save(queryObject.endDate)"
                  >
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="auto">
            <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>
      <div style="margin-top: 10px"></div>
      <expenseDataTable
        :queryObject="queryObject"
        :statusItems="statusItems"
        ref="expenseDataTable"
      />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import expenseDataTable from "@/components/expense/DataTable";
import { queryOffices } from "@/api/oadrp";
import { queryExpenseTypes, queryExpenseStatus } from "@/api/dictionary";
export default {
  components: {
    expenseDataTable,
  },
  data: () => ({
    nos: [],

    expenseTypeItems: [],
    statusItems: [],
    officeItems: [],
    startMenu: false,
    endMenu: false,
    queryObject: {
      type: 0,
      status: 0,
      officeUID: "",
      employeeName: "",
      startDate: "",
      endDate: "",
    },

    employee: {
      money: null,
      office: {
        money: null,
      },
    },
  }),
  created() {
    if (localStorage.getItem("nos") != "") {
      this.nos = JSON.parse(
        decodeURIComponent(window.atob(localStorage.getItem("nos")))
      );
    }
    if (!this.nos.includes("07-01-02")) {
      this.queryObject.officeUID = localStorage.getItem("office");
    }
    this.getExpenseTypeItems();
    this.getStatusItems();
    this.getOfficeItems();
  },
  methods: {
    getExpenseTypeItems() {
      queryExpenseTypes().then((res) => {
        this.expenseTypeItems = res.data;
      });
    },
    getStatusItems() {
      queryExpenseStatus().then((res) => {
        this.statusItems = res.data;
      });
    },
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    query() {
      this.$refs.expenseDataTable.getObject();
    },
  },
};
</script>