<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.name"
              label="供应商名称"
              :disabled="openType == 2"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.address"
              label="地址"
              :rules="rules.address"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.linkman"
              label="联系人姓名"
              :rules="rules.linkman"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.phone"
              label="联系电话"
              :rules="rules.phone"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.wechatID"
              label="微信号"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.email"
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
    openID: {
      type: Number,
    },
    parentFun: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    object: {
      id: "",
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
        (v) => (v && v.length <= 20) || "电话的长度必须小于20个字符",
      ],
      pattern: `/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/`,
      email: [
        (v) => (v && v.length <= 20 && v.length > 0 && rules.pattern.test(v)) || "电话的长度必须小于20个字符",
      ],
      // email: (value) => {
      //   if (value == "") {
      //     return;
      //   }
      //   const pattern =
      //     /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      //   return pattern.test(value) || "邮箱格式错误";
      // },
    },
  }),
  created() {
    if (this.openID != null) {
      this.getObject();
    }
  },
  methods: {
    getObject() {
      querySupplier(this.openID).then((res) => {
        this.object = res.data;
      });
    },
    entryObject() {
      if (this.$refs.form.validate()) {
        entrySupplier(this.object).then((res) => {
          this.$message.success("录入成功了！");
        });
      }
      if (this.parentFun) {
        this.parentFun(false);
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
  },
  computed: {},
};
</script>