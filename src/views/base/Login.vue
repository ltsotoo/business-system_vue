<template>
  <v-container fill-height>
    <v-row no-gutters align="center" justify="center">
      <v-col align="center" cols="4">
        <v-card min-width="400px" min-height="400px" :elevation="10">
          <v-card-title>
            <v-row no-gutters justify="center">
              <v-col>
                <v-toolbar-title :class="[`text-h4`]"
                  >中研环科管理系统</v-toolbar-title
                >
              </v-col>
            </v-row>
          </v-card-title>

          <v-card-subtitle>
            <v-form ref="form">
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="queryObject.phone"
                      label="手机号"
                      :rules="rules.must"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      v-model="queryObject.password"
                      label="密码"
                      :rules="rules.must"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="8">
                    <v-text-field
                      v-model="userVerifyCode"
                      label="验证码"
                      :rules="rules.must"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <div id="v_container"></div>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="center">
                  <v-col cols="2" align="center">
                    <v-btn block @click="userLogin"> 登录 </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { login } from "@/api/system";
import { GVerify } from "@/components/base/verifycode.js";

export default {
  data: () => ({
    queryObject: {
      phone: "",
      password: "",
    },
    userVerifyCode: "",
    verifyCode: null,
    rules: {
      must: [(v) => !!v || "必填项"],
    },
  }),
  mounted() {
    this.verifyCode = new GVerify("v_container");
  },
  methods: {
    userLoginBefore() {
      if (this.validateForm()) {
        if (this.userVerifyCode != "") {
          if (this.verifyCode.validate(this.userVerifyCode)) {
            return true;
          }
          this.$message.error("验证码错误");
        }
      }
      return false;
    },
    userLogin() {
      if (this.userLoginBefore()) {
        login(this.queryObject).then((res) => {
          localStorage.setItem("name", res.data.employee.name);
          localStorage.setItem("Authorization", res.data.token);
          localStorage.setItem("uid", res.data.employee.UID);
          localStorage.setItem("department", res.data.employee.departmentUID);
          localStorage.setItem("office", res.data.employee.officeUID);
          if (res.data.urls) {
            localStorage.setItem(
              "urls",
              window.btoa(
                window.encodeURIComponent(JSON.stringify(res.data.urls))
              )
            );
          } else {
            localStorage.setItem(
              "urls",
              window.btoa(window.encodeURIComponent(this.urls))
            );
          }

          if (res.data.nos) {
            localStorage.setItem(
              "nos",
              window.btoa(
                window.encodeURIComponent(JSON.stringify(res.data.nos))
              )
            );
          } else {
            localStorage.setItem(
              "nos",
              window.btoa(window.encodeURIComponent([]))
            );
          }

          this.goToIndex();
        });
        this.verifyCode.refresh();
      }
    },
    goToIndex() {
      this.$router.replace("/index");
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>