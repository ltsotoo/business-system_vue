<template>
  <v-card class="mx-auto">
    <v-card-title>投标保证金记录添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-select
              v-model="query.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              @change="getDepartmentItems"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="query.departmentUID"
              :items="departmentItems"
              item-text="name"
              item-value="UID"
              label="部门"
              @change="getEmployeeItems"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.salesmanUID"
              :items="employeeItems"
              item-text="name"
              item-value="UID"
              label="员工"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.number="object.money"
              label="金额(元)"
              :rules="rules.money"
            >
            </v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="object.remarks"
              label="备注"
              rows="3"
              counter
              maxlength="500"
            >
            </v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { queryOffices, queryDepartments } from "@/api/oadrp";
import { queryEmployees } from "@/api/employee";
import { createBidBond } from "@/api/bidbond";
export default {
  props: {
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    rules: {
      must: [(v) => !!v || "必填项"],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "大于等于零"],
    },
    officeItems: [],
    departmentItems: [],
    employeeItems: [],
    query: {
      officeUID: "",
      departmentUID: "",
    },
    object: {
      salesmanUID: "",
      money: 0,
      remarks: "",
    },
  }),
  created() {
    this.getOfficeItems();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems() {
      this.query.departmentUID = "";
      this.departmentItems = [];
      queryDepartments({ officeUID: this.query.officeUID }).then((res) => {
        this.departmentItems = res.data;
      });
    },
    getEmployeeItems() {
      this.employeeItems = [];
      this.object.salesmanUID = "";
      queryEmployees(this.query).then((res) => {
        this.employeeItems = res.data;
      });
    },
    submit() {
      if (this.validateForm()) {
        createBidBond(this.object).then((res) => {
          this.$message.success("添加成功了!");
          this.refresh();
          this.closeDialog();
        });
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>