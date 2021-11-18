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
            ></v-select>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              :rules="rules.must"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              :rules="rules.must"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              v-model.trim="object.phone"
              label="手机号"
              :rules="rules.phone"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.email"
              label="邮箱"
              :rules="rules.email"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.money"
              label="初始报销额度(元)"
              :rules="rules.money"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.number="object.credit"
              label="每月报销额度(元)"
              :rules="rules.money"
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
import { queryDepartments, queryRoles } from "@/api/oadrp.js";
import { entryEmployee } from "@/api/employee";
export default {
  props: {
    officeItems: {
      type: Object,
      default: [],
    },
    parentObj: {
      type: Object,
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
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
      must: [(v) => !!v || "必填项！"],
      phone: [
        (v) => !!v || "必填项！",
        (v) => /[1-9][0-9]+$/.test(v) || "电话的格式错误",
      ],
      email: [
        (v) =>
          v.length == 0 ||
          /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) ||
          "邮箱格式错误",
      ],
      money: [(v) => /^[1-9][0-9]*(\.[0-9]{1,3})?$/.test(v) || "金额的格式错误"],
    },
  }),
  created() {
    this.getRoleItems();
    this.object.officeUID = this.parentObj.officeUID;
    this.object.departmentUID = this.parentObj.departmentUID;
    if (this.object.officeUID && this.object.officeUID != "") {
      this.getDepartmentItems();
    }
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        entryEmployee(this.object).then((res) => {
          this.$message.success("添加成功了！");
          if (this.refresh != null) {
            this.refresh();
          }
          this.closeDialog();
        });
      }
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