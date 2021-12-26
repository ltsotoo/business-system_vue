<template>
  <v-card>
    <v-card-title v-if="openType == 0">供应商添加</v-card-title>
    <v-card-title v-if="openType == 1">供应商查看</v-card-title>
    <v-card-title v-if="openType == 2">供应商编辑</v-card-title>
    <v-card-subtitle>
      <v-form ref="form" :readonly="openType == 1">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="供应商名称"
              :rules="rules.must"
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.web"
              label="网址"
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model.trim="object.address"
              label="地址"
              counter
              maxlength="200"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.linkman"
              label="联系人姓名"
              :rules="rules.must"
              counter
              maxlength="50"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="联系电话"
              :rules="rules.must"
              counter
              maxlength="100"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.wechatID"
              label="微信号"
              counter
              maxlength="50"
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
          <v-col cols="12">
            <v-textarea
              label="主营产品概述"
              v-model="object.description"
              rows="3"
              counter
              maxlength="500"
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea
              label="备注"
              v-model="object.remark"
              rows="3"
              counter
              maxlength="500"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-form>
    </v-card-subtitle>
    <v-card-actions v-if="openType != 1">
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
import { entrySupplier, editSupplier } from "@/api/supplier";
export default {
  props: {
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
    submitDisabled: false,
    object: {
      name: "",
      address: "",
      linkman: "",
      phone: "",
      wechatID: "",
      email: "",
      web: "",
      description: "",
      remark: "",
    },
    rules: {
      must: [(v) => !!v || "必填项"],
      email: [
        (v) =>
          v.length == 0 ||
          /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(v) ||
          "邮箱格式错误",
      ],
    },
  }),
  created() {
    if (this.openType != 0) {
      this.object = this.parentObj;
    }
  },
  methods: {
    submit() {
      this.submitDisabled = true;
      if (this.validateForm()) {
        if (this.openType == 0) {
          entrySupplier(this.object).then((res) => {
            this.$message.success("录入成功了！");
            this.refresh();
            this.closeDialog();
          });
        } else if (this.openType == 2) {
          editSupplier(this.object).then((res) => {
            this.$message.success("编辑成功了！");
            this.refresh();
            this.closeDialog();
          });
        }
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