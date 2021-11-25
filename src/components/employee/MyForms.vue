<template>
  <div>
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-form ref="form" readonly>
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
              <v-text-field
                label="编号"
                v-model="object.number"
                readonly
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
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
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim="object.email"
                label="邮箱"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model.trim="object.money"
                label="个人总报销额度(元)"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model.trim="object.credit"
                label="每月自动累积的报销额度(元)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>

    <v-card style="margin-top: 10px">
      <v-card-subtitle>
        <v-row>
          <v-spacer></v-spacer>
          <!-- <v-col cols="3">
            <v-btn rounded color="primary" @click="editObject">
              修改个人资料
            </v-btn>
          </v-col> -->
          <v-col cols="auto">
            <v-btn rounded color="error" @click="openEditPwdDialog">
              修改密码
            </v-btn>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>

    <v-dialog
      v-model="editPwdDialog"
      v-if="editPwdDialog"
      width="800px"
      persistent
      @click:outside="closeEditPwdDialog"
    >
      <editPwd :closeDialog="closeEditPwdDialog"></editPwd>
    </v-dialog>
  </div>
</template>

<script>
import { queryMy } from "@/api/employee";
import editPwd from "./EditPwd";
export default {
  components: {
    editPwd,
  },
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

    editPwdDialog: false,
  }),
  created() {
    this.getObject();
  },
  methods: {
    getObject() {
      queryMy().then((res) => {
        this.object = res.data;
      });
    },

    openEditPwdDialog() {
      this.editPwdDialog = true;
    },
    closeEditPwdDialog() {
      this.editPwdDialog = false;
    },
  },
};
</script>