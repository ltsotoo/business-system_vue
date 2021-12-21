<template>
  <v-card >
    <v-card-title>客户编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.company.name"
              label="公司"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.researchGroup"
              label="课题组"
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.phone"
              label="电话"
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.email"
              label="电子邮箱"
              :rules="rules.email"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="submit" :disabled="submitDisabled">
        提交
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { editCustomer } from "@/api/customer";
export default {
  props: {
    parentObj: {
      type: Object,
      default: {},
    },
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
    submitDisabled: false,
    companyItems: [],
    object: {
      companyUID: "",
      name: "",
      researchGroup: "",
      phone: "",
      wechatID: "",
      email: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      email: [
        (v) =>
          v.length == 0 ||
          /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) ||
          "格式错误",
      ],
    },
  }),
  created() {
    this.object = this.parentObj;
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        editCustomer(this.object).then((res) => {
          this.$message.success("添加成功了!");
          this.refresh();
          this.closeDialog();
        });
      } else {
        this.submitDisabled = false;
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>