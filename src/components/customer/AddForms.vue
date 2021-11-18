<template>
  <v-card class="mx-auto">
    <v-card-title>客户添加</v-card-title>
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="object.companyUID"
              :items="companyItems"
              item-text="name"
              item-value="UID"
              label="公司"
              :rules="rules.must"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              :rules="rules.must"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.researchGroup"
              label="课题组"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="电话"
              :rules="rules.phone"
              counter
              maxlength="20"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
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
      <v-btn color="primary" rounded @click="submit"> 提交 </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" rounded @click="closeDialog"> 取消 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { queryCompanys, entryCustomer } from "@/api/customer";
export default {
  props: {
    closeDialog: {
      type: Function,
    },
    refresh: {
      type: Function,
    },
  },
  data: () => ({
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
    },
  }),
  created() {
    this.getCompanyItems();
  },
  methods: {
    getCompanyItems() {
      queryCompanys().then((res) => {
        this.companyItems = res.data;
      });
    },
    submit() {
      if (this.validateForm()) {
        entryCustomer(this.object).then((res) => {
          this.$message.success("添加成功了!");
          this.refresh();
          this.closeDialog();
        });
      }
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
};
</script>