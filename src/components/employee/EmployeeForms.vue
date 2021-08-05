<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row v-if="openType == 0">
          <v-col cols="4">
            <v-text-field
              label="办事处"
              v-model="object.office.name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="部门"
              v-model="object.department.name"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="职务"
              v-model="object.role.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="4">
            <v-select
              v-model="object.officeID"
              :items="officeItems"
              item-text="name"
              item-value="ID"
              label="办事处"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.departmentID"
              :items="departmentItems"
              item-text="name"
              item-value="ID"
              label="部门"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.roleID"
              :items="roleItems"
              item-text="name"
              item-value="ID"
              label="职务"
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field v-model="object.name" label="姓名"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="object.phone" label="手机号"></v-text-field
          ></v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.wechatID"
              label="微信号"
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field v-model="object.email" label="邮箱"></v-text-field
          ></v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import {
  queryOffices,
  queryDepartmentsByOfficeID,
  queryRoles,
} from "@/api/oadrp.js";
import { queryEmployee } from "@/api/employee";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openID: {
      type: Number,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    officeItems: [],
    departmentItems: [],
    roleItems: [],
    object: {
      ID: null,
      name: "",
      phone: "",
      wechatID: null,
      email: "",
      officeID: null,
      departmentID: null,
      roleID: null,
      office: {},
      department: {},
      role: {},
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems(departmentID) {
      queryDepartmentsByOfficeID(departmentID).then((res) => {
        this.departmentItems = res.data;
      });
    },
    getRoleItems() {
      queryRoles().then((res) => {
        this.roleItems = res.data;
      });
    },
    getObject() {
      queryEmployee(localStorage.getItem("ID")).then((res) => {
        this.object = res.data;
      });
    },
    editObject() {},
  },
  computed: {},
};
</script>