<template>
  <v-card>
    <v-card-title>报销管理</v-card-title>
    <v-card-subtitle>
      <v-form ref="queryForm">
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-select
              v-model="queryObject.type"
              :items="expenseTypeItems"
              item-text="text"
              item-value="UID"
              label="类型"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="queryObject.status"
              :items="statusItems"
              item-text="text"
              item-value="value"
              label="状态"
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
    expenseTypeItems: [],
    statusItems: [],
    officeItems: [],
    queryObject: {
      type: 0,
      status: 0,
      officeUID: "",
      employeeName: "",
    },

    employee: {
      money: null,
      office: {
        money: null,
      },
    },
  }),
  created() {
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