<template>
  <v-card class="mx-auto">
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="办事处"
              v-model="object.office.name"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-text-field
              label="部门"
              v-model="object.department.name"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="4">
            <v-select
              v-model="object.roles"
              :items="object.roles"
              item-text="name"
              label="职位"
              multiple
              readonly
            ></v-select>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              readonly
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="手机号"
              readonly
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
              :rules="rules.wechatID"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.email"
              label="邮箱"
              :rules="rules.email"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn rounded color="primary" dark @click="editObject"> 提交 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { queryEmployee, editEmployee } from "@/api/employee";
export default {
  data: () => ({
    object: {
      name: "",
      phone: "",
      wechatID: "",
      email: "",
      office: {
        name: "",
      },
      department: {
        name: "",
      },
      roles: [],
    },
    rules: {
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
    },
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryEmployee("my").then((res) => {
        this.object = res.data;
        if (this.object.roles.length == 0) {
          this.object.roles.push({ name: "部员" });
        }
      });
    },
    editObject() {
      editEmployee(this.object).then((res) => {
        this.$message.success("编辑成功了！");
      });
    },
  },
};
</script>