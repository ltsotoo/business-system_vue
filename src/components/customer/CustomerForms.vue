<template>
  <v-form ref="form">
    <v-card class="mx-auto">
      <v-card-subtitle>
        <v-row>
          <v-col cols="6">
            <v-select
              v-model="object.companyID"
              :items="companyItems"
              item-text="name"
              item-value="ID"
              label="公司"
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="object.researchGroupID"
              :items="researchGroups"
              item-text="name"
              item-value="ID"
              label="课题组"
            ></v-select
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.name"
              label="姓名"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.phone"
              label="电话"
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="object.wechatID"
              label="微信号"
              required
            ></v-text-field
          ></v-col>
          <v-col cols="6">
            <v-text-field
              v-model="object.email"
              label="电子邮箱"
              required
            ></v-text-field
          ></v-col>
        </v-row>
      </v-card-subtitle>
    </v-card>
  </v-form>
</template>

<script>
import {
  queryCompanys,
  queryResearchGroupsByCompanyID,
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
    openId: {
      type: Number,
    },
    refreshDataTable: {
      type: Function,
      default: null,
    },
  },
  data: () => ({
    companyItems: [],
    researchGroups: [],
    object: {
      id: "",
      name: "",
      companyID: "",
      researchGroupID: "",
      phone: "",
      wechatID: "",
      email: "",
    },
  }),
  created() {
    this.getCompanyItems();
    if (this.openId != null) {
      this.getObject();
    }
  },
  methods: {
    getCompanyItems() {
      queryCompanys().then((res) => {
        this.companyItems = res.data;
      });
    },
    getResearchGroupsByCompanyID(companyID) {
      queryResearchGroupsByCompanyID(companyID).then((res) => {
        this.researchGroups = res.data;
      });
    },
    getObject() {
      queryCustomer(this.openId).then((res) => {
        this.object = res.data;
      });
    },
    entryObject() {
      entryCustomer(this.object).then((res) => {
        this.$message.success("成功了");
      });
    },
    editObject() {
      editCustomer(this.object).then((res) => {
        this.$message.success("成功了");
        if (this.refreshDataTable) {
          this.refreshDataTable();
        }
      });
    },
  },
  computed: {
    readonly() {
      if (this.openType == 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  watch: {
    "object.companyID": {
      handler: function (val) {
        this.object.researchGroupID = null;
        if (val != null) {
          this.getResearchGroupsByCompanyID(val);
        }
      },
    },
  },
};
</script>