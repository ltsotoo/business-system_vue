<template>
  <v-card class="mx-auto">
    <v-card-title v-if="editType == 0">员工添加</v-card-title>
    <v-card-title v-else>员工编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form3">
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
        </v-row>
      </v-form>
      <v-form ref="form1">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              :rules="rules.must"
              counter
              maxlength="50"
              :disabled="!(editType == 1)"
            ></v-text-field>
          </v-col>
          <v-col cols="6"></v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              :rules="rules.must"
              counter
              maxlength="50"
              :disabled="!(editType == 1)"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="手机号"
              :rules="rules.phone"
              counter
              maxlength="50"
              :disabled="!(editType == 1)"
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
        </v-row>
      </v-form>
      <v-form ref="form2">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.money"
              label="可用报销额度(元)"
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
        </v-row>
      </v-form>
      <v-row>
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
      must: [(v) => !!v || "必填项"],
      email: [
        (v) =>
          v.length == 0 ||
          /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) ||
          "格式错误",
      ],
      money: [(v) => /^[0-9]*(\.[0-9]{1,3})?$/.test(v) || "大于等于零"],
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
      if (this.editType == 1) {
        return this.$refs.form1.validate();
      } else if (this.editType == 2) {
        return this.$refs.form2.validate();
      } else if (this.editType == 3) {
        return this.$refs.form3.validate();
      }
    },
  },
};
</script>