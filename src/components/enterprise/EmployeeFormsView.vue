<template>
  <v-card class="mx-auto">
    <v-card-title>查看</v-card-title>
    <v-card-subtitle>
      <v-form ref="form" readonly>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.office.name"
              label="办事处"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.department.name"
              label="部门"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.phone"
              label="手机号"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.email"
              label="邮箱"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.money"
              label="初始报销额度(元)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.credit"
              label="每月报销额度(元)"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <span class="subheading">职位</span>
            <v-chip-group active-class="primary--text" column>
              <v-chip v-for="role in object.roles" :key="role">
                {{ role.name }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryEmployee } from "@/api/employee.js";
export default {
  props: {
    openUID: {
      type: String,
    },
  },
  data: () => ({
    object: {
      ID: null,
      UID: "",
      name: "",
      phone: "",
      wechatID: "",
      email: "",
      officeUID: "",
      office: {
        name: "",
      },
      departmentUID: "",
      department: {
        name: "",
      },
      roles: [{ name: "" }],
      money: 0,
      credit: 0,
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryEmployee(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
  },
};
</script>