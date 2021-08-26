<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="供应商名称"
              :disabled="openType == 2"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.address"
              :disabled="openType == 2"
              label="地址"
              :rules="rules.address"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.linkman"
              label="联系人姓名"
              :rules="rules.linkman"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="联系电话"
              :rules="rules.phone"
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
              label="电子邮箱"
              :rules="rules.email"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import { querySupplier, entrySupplier, editSupplier } from "@/api/supplier";
export default {
  props: {
    openType: {
      type: Number,
      default: 0,
    },
    openUID: {
      type: String,
      default: "",
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    object: {
      name: "",
      address: "",
      linkman: "",
      phone: "",
      wechatID: "",
      email: "",
    },
    rules: {
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 12) || "名称的长度必须小于12个字符",
      ],
      address: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 20) || "地址的长度必须小于20个字符",
      ],
      linkman: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 10) || "联系人的长度必须小于10个字符",
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
    },
  }),
  created() {
    if (this.openType != 0) {
      this.getObject();
    }
  },
  methods: {
    getObject() {
      querySupplier(this.openUID).then((res) => {
        this.object = res.data;
      });
    },
    entryObject() {
      var _this = this
      if (this.validateForm()) {
        entrySupplier(this.object).then((res) => {
          this.$message.success("录入成功了！");
          setTimeout(function () {
            _this.$router.replace("/supplier");
          }, 1000);
        });
      } else {
        this.$message.error("信息填写异常，请检查后再提交！");
        if (this.parentFun) {
          this.parentFun(false);
        }
      }
    },
    editObject() {
      editSupplier(this.object).then((res) => {
        this.$message.success("编辑成功了！");
        if (this.parentFun) {
          this.parentFun();
        }
      });
    },
    validateForm() {
      return this.$refs.form.validate();
    },
  },
  computed: {},
};
</script>