<template>
  <v-card>
    <v-card-title>修改密码</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="原密码"
              v-model="object.oldPwd"
              :rules="rules.must"
              counter
              maxlength="20"
              type="password"
            >
            </v-text-field>
            <v-text-field
              label="新密码"
              v-model="object.newPwd"
              :rules="rules.must1"
              counter
              maxlength="20"
              type="password"
            >
            </v-text-field>
            <v-text-field
              label="重复新密码"
              v-model="object.newPwd2"
              :rules="rules.must1"
              counter
              maxlength="20"
              type="password"
            >
            </v-text-field>
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
import { editMyPwd } from "@/api/employee";
export default {
  props: {
    closeDialog: {
      type: Function,
    },
  },
  data: () => ({
    rules: {
      must: [(v) => !!v || "必填项！"],
      must1: [
        (v) =>
          /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/.test(
            v
          ) ||
          "6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种",
      ],
    },
    object: {
      uid: "",
      oldPwd: "",
      newPwd: "",
      newPwd2: "",
    },
  }),
  created() {
    this.object.uid = localStorage.getItem("uid");
  },
  methods: {
    submit() {
      if (this.validateForm()) {
        if (this.object.newPwd2 == this.object.newPwd) {
          editMyPwd(this.object).then((res) => {
            this.$message.success("修改成功！");
            this.exit();
          });
        } else {
          this.$message.error("新密码不一致");
        }
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    exit() {
      localStorage.clear();
      this.$router.replace("/login");
    },
  },
};
</script>