<template>
  <v-card class="mx-auto">
    <v-card-title>查看</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="object.officeUID"
              :items="officeItems"
              item-text="name"
              item-value="UID"
              label="办事处"
              @change="getDepartmentItems"
              readonly
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="object.departmentUID"
              :items="departmentItems"
              item-text="name"
              item-value="UID"
              label="部门"
              readonly
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              counter
              maxlength="20"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              counter
              maxlength="20"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.phone"
              label="手机号"
              counter
              maxlength="20"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
              counter
              maxlength="20"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.email"
              label="邮箱"
              counter
              maxlength="50"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.money"
              label="初始报销额度(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.credit"
              label="每月报销额度(元)"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              v-model="object.roles"
              :items="roleItems"
              item-text="name"
              label="职位"
              multiple
              chips
              return-object
              readonly
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryOffices, queryDepartments, queryRoles } from "@/api/oadrp.js";
import { queryEmployee } from "@/api/employee.js";
export default {
  props: {
    openUID: {
      type: String,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    officeItems: [],
    departmentItems: [],
    roleItems: [],
    object: {
      ID: null,
      UID: "",
      name: "",
      phone: "",
      wechatID: "",
      email: "",
      officeUID: "",
      departmentUID: "",
      roles: [],
      money: 0,
      credit: 0,
    },
  }),
  created() {
    this.getOfficeItems();
    this.getRoleItems();
    this.getObject();
  },
  methods: {
    getObject() {
      var _this = this;
      queryEmployee(this.openUID).then((res) => {
        this.object = res.data;
        if (res.data.officeUID != "" && res.data.departmentUID != "") {
          _this.getDepartmentItems();
        }
      });
    },
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems() {
      queryDepartments({ officeUID: this.object.officeUID }).then((res) => {
        this.departmentItems = res.data;
      });
    },
    getRoleItems() {
      queryRoles().then((res) => {
        this.roleItems = res.data;
      });
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>