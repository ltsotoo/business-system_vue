<template>
  <v-card class="mx-auto">
    <v-card-subtitle>
      <v-form ref="form">
        <v-row>
          <v-col cols="6" v-if="openType > 0">
            <v-text-field
              v-model="object.company.name"
              label="公司"
              disabled
            ></v-text-field>
          </v-col>
          <v-col cols="6" v-else>
            <v-select
              v-model="object.companyID"
              :items="companyItems"
              item-text="name"
              item-value="ID"
              label="公司"
              :rules="rules.companyID"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.name"
              label="姓名"
              :disabled="openType == 2"
              :rules="rules.name"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.researchGroup"
              label="课题组"
              :rules="rules.researchGroup"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model.trim="object.phone"
              label="电话"
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
      </v-form>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import {
  queryCompanys,
  queryCustomer,
  entryCustomer,
  editCustomer,
} from "@/api/customer";
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
    companyItems: [],
    object: {
      id: "",
      companyID: null,
      name: "",
      researchGroup: "",
      phone: "",
      wechatID: "",
      email: "",
    },
    rules: {
      companyID: [(v) => !!v || "必填项！"],
      name: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 12) || "名称的长度必须小于12个字符",
      ],
      researchGroup: [
        (v) => !!v || "必填项！",
        (v) => (v && v.length <= 20) || "课题组的长度必须小于20个字符",
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
    this.getCompanyItems();
    if (this.openID != null) {
      this.getObject();
    }
  },
  methods: {
    getCompanyItems() {
      queryCompanys().then((res) => {
        this.companyItems = res.data;
      });
    },
    getObject() {
      queryCustomer(this.openID).then((res) => {
        this.object = res.data;
      });
    },
    entryObject() {
      if (this.validateForm()) {
        entryCustomer(this.object).then((res) => {
          this.$message.success("录入成功了!");
          if (this.parentFun) {
            this.parentFun(false);
          }
        });
      } else {
        this.$message.error("信息填写异常，请检查后再提交！");
        if (this.parentFun) {
          this.parentFun(false);
        }
      }
    },
    editObject() {
      editCustomer(this.object).then((res) => {
        this.$message.success("编辑成功了!");
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
  watch: {},
};
</script>