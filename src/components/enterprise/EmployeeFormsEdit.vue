<template>
  <v-card class="mx-auto">
    <v-card-title>员工添加</v-card-title>
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
              :rules="rules.must"
              :disabled="!(editType == 3)"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="object.departmentUID"
              :items="departmentItems"
              item-text="name"
              item-value="UID"
              label="部门"
              :rules="rules.must"
              :disabled="!(editType == 3)"
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              :rules="rules.must"
              counter
              maxlength="50"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              :rules="rules.must"
              counter
              maxlength="50"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.phone"
              label="手机号"
              :rules="rules.phone"
              counter
              maxlength="50"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
              counter
              maxlength="50"
              :disabled="!(editType == 1)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.email"
              label="邮箱"
              :rules="rules.email"
              counter
              maxlength="50"
              :disabled="!(editType == 1)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.money"
              label="初始报销额度(元)"
              :rules="rules.money"
              :disabled="!(editType == 2)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.credit"
              label="每月报销额度(元)"
              :rules="rules.money"
              :disabled="!(editType == 2)"
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
              :disabled="!(editType == 3)"
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryOffices, queryDepartments, queryRoles } from "@/api/oadrp.js";
import { queryEmployee, editEmployee } from "@/api/employee";
export default {
  props: {
    //三种:1.base 2.expense 3.role
    editType: {
      type: Number,
      default: 0,
    },
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
    rules: {
      money: [
        (v) => /^[1-9][0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额的格式错误",
      ],
    },
  }),
  created() {
    this.getOfficeItems();
    this.getRoleItems();
    this.getObject();
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        editEmployee(this.object).then((res) => {
          this.$message.success("编辑成功了！");
          this.refresh();
          this.closeDialog();
        });
      }
    },
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