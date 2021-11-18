<template>
  <v-card class="mx-auto">
    <v-card-title v-if="openType == 0">员工添加</v-card-title>
    <v-card-title v-if="openType == 2">员工信息编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              :rules="rules.name"
              :readonly="openType == 1"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="手机号"
              :rules="rules.phone"
              :readonly="openType == 1"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.number"
              label="编号"
              :rules="rules.number"
              :readonly="openType == 1"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
              :rules="rules.wechatID"
              :readonly="openType == 1"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.email"
              label="邮箱"
              :rules="rules.email"
              :readonly="openType == 1"
            ></v-text-field>
          </v-col>
        </v-row>

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
            ></v-select>
          </v-col>
        </v-row>
      </v-form>
      <v-card-actions v-if="openType != 1">
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="add"> 确定 </v-btn>
        <v-btn color="primary" text @click="closeDialog"> 取消 </v-btn>
      </v-card-actions>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryOffices, queryDepartments, queryRoles } from "@/api/oadrp.js";
import { entryEmployee, queryEmployee, editEmployee } from "@/api/employee";
export default {
  props: {
    // 0录入 1查看 2编辑
    openType: {
      type: Number,
      default: 0,
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
    officeItems: [],
    departmentItems: [],
    roleItems: [],
    object: {
      ID: null,
      UID: "my",
      name: "",
      phone: "",
      wechatID: "",
      email: "",
      officeUID: "",
      departmentUID: "",
      roleID: null,
      office: {},
      department: {},
      roles: [],
    },
    rules: {
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 12) || "名称的长度必须小于12个字符",
      ],
      phone: [
        (v) => !!v || "必填项！",
        (v) => /[1-9][0-9]+$/.test(v) || "电话的格式错误",
      ],
      wechatID: [
        (v) =>
          v.length == 0 || v.length <= 10 || "微信号的长度必须小于20个字符",
      ],
      email: [
        (v) =>
          v.length == 0 ||
          /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) ||
          "邮箱格式错误",
      ],
      number: [(v) => !!v || "必填项！"],
    },
  }),
  created() {
    this.getRoleItems();
    if (this.openType == 0) {
      this.object.officeUID = this.parentObj.officeUID;
      this.object.departmentUID = this.parentObj.departmentUID;
    } else {
      this.object.UID = this.parentObj.UID;
      this.getObject();
    }
  },
  methods: {
    getOfficeItems() {
      queryOffices().then((res) => {
        this.officeItems = res.data;
      });
    },
    getDepartmentItems(officeUID) {
      queryDepartments({ officeUID: officeUID }).then((res) => {
        this.departmentItems = res.data;
      });
    },
    getRoleItems() {
      queryRoles().then((res) => {
        this.roleItems = res.data;
      });
    },
    getObject() {
      queryEmployee(this.object.UID).then((res) => {
        this.object = res.data;
      });
    },
    entryObject() {
      entryEmployee(this.object).then((res) => {
        this.$message.success("录入成功了！");
        if (this.refresh != null) {
          this.refresh();
        }
        this.closeDialog();
      });
    },
    editObject() {
      editEmployee(this.object).then((res) => {
        this.$message.success("编辑成功了！");
        if (this.refresh != null) {
          this.refresh();
        }
        this.closeDialog();
      });
    },
    add() {
      if (this.openType == 0) {
        if (this.validateForm()) {
          this.entryObject();
        }
      } else if (this.openType == 2) {
        if (this.validateForm()) {
          this.editObject();
        }
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
  computed: {},
};
</script>