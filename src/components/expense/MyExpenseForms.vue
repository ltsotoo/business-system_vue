<template>
  <v-card>
    <v-card-title></v-card-title>
    <v-card-subtitle>
      <v-row>
        <v-col cols="3">
          <v-text-field
            label="个人补助金额(元)"
            v-model="employee.money"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="业务费用金额(元)"
            v-model="employee.office.businessMoney"
            readonly
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="办事处提成金额(元)"
            v-model="employee.office.money"
            readonly
            v-if="nos.includes('00-02-01')"
          ></v-text-field>
        </v-col>
        <v-col cols="3">
          <v-text-field
            label="办事处年底提成金额(元)"
            v-model="employee.office.moneyCold"
            readonly
            v-if="nos.includes('00-02-01')"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryEmployee } from "@/api/employee.js";
export default {
  data: () => ({
    nos: [],

    employee: {
      money: null,
      office: {
        money: null,
      },
    },
  }),
  created() {
    this.nos = JSON.parse(
      decodeURIComponent(window.atob(localStorage.getItem("nos")))
    );
    this.getEmployee();
  },
  methods: {
    getEmployee() {
      queryEmployee(localStorage.getItem("uid")).then((res) => {
        this.employee = res.data;
      });
    },
  },
};
</script>