<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
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
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.name"
              label="姓名"
              :disabled="openType == 2"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.researchGroup"
              label="课题组"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field v-model="object.phone" label="电话"></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.wechatID"
              label="微信号"
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field v-model="object.email" label="电子邮箱"></v-text-field
          ></v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
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
      name: "",
      companyID: null,
      researchGroup: "",
      phone: "",
      wechatID: "",
      email: "",
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
      entryCustomer(this.object).then((res) => {
        this.$message.success("录入成功了!");
        if (this.parentFun) {
          this.parentFun(false);
        }
      });
    },
    editObject() {
      editCustomer(this.object).then((res) => {
        this.$message.success("编辑成功了!");
        if (this.parentFun) {
          this.parentFun();
        }
      });
    },
  },
  computed: {},
  watch: {},
};
</script>