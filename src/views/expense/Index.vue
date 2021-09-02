<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="2">
              <v-select
                v-model="queryObject.typeUID"
                :items="expenseTypeItems"
                item-text="text"
                item-value="UID"
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
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="员工名称"
                v-model.trim="queryObject.employeeName"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="产品电话"
                v-model.trim="queryObject.employeePhone"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="resetQueryForm">
                重置
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <div style="margin-top: 10px"></div>
    <expenseDataTable :queryObject="queryObject" ref="expenseDataTable" />
  </v-container>
</template>

<script>
import expenseDataTable from "@/components/expense/DataTable";
import { queryExpenseType } from "@/api/dictionary";
import { queryOffices } from "@/api/oadrp";
export default {
  components: {
    expenseDataTable,
  },
  data: () => ({
    nos: [],
    expenseTypeItems: [],
    officeItems: [],
    queryObject: {
      typeUID: "",
      officeUID: "",
      employeeName: "",
      employeePhone: "",
    },
  }),
  created() {
    this.nos = localStorage.getItem("nos");
    this.getExpenseTypeItems();
    this.getOfficeItems();
  },
  methods: {
    getExpenseTypeItems() {
      queryExpenseType().then((res) => {
        this.expenseTypeItems = res.data.dictionaries;
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
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.expenseDataTable.getObject();
    },
  },
};
</script>