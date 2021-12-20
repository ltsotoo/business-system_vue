<template>
  <v-card>
    <v-card-title>客户管理</v-card-title>
    <v-card-subtitle>
      <v-form>
        <v-row align="baseline">
          <v-spacer></v-spacer>
          <v-col cols="2">
            <v-select
              v-model="queryObject.regionUID"
              :items="regionItems"
              item-text="text"
              item-value="UID"
              label="省份"
              @change="getCompanyItems"
              clearable
            ></v-select>
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="queryObject.companyUID"
              item-text="name"
              item-value="UID"
              :items="companyItems"
              label="客户公司"
            ></v-select>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="姓名"
              v-model.trim="queryObject.name"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field
              label="课题组"
              v-model.trim="queryObject.researchGroup"
              clearable
              maxlength="20"
            ></v-text-field>
          </v-col>

          <v-col cols="auto">
            <v-btn rounded color="primary" dark @click="queryCustomers">
              查询
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
        </v-row>
      </v-form>

      <customerDataTable
        ref="customerDataTable"
        :queryObject="queryObject"
      ></customerDataTable>
    </v-card-subtitle>
  </v-card>
</template>

<script>
import { queryRegions } from "@/api/dictionary";
import { queryCompanys } from "@/api/customer";
import customerDataTable from "@/components/customer/DataTable";

export default {
  components: {
    customerDataTable,
  },
  data: () => ({
    regionItems: [],
    companyItems: [],
    queryObject: {
      regionUID: "",
      companyUID: "",
      researchGroup: "",
      name: "",
    },
    addDialog: false,
  }),
  created() {
    this.getRegionItems();
  },
  methods: {
    getRegionItems() {
      queryRegions().then((res) => {
        this.regionItems = res.data;
      });
    },
    getCompanyItems() {
      this.companyItems = [];
      this.queryObject.companyUID = "";
      if (this.queryObject.regionUID) {
        queryCompanys({ regionUID: this.queryObject.regionUID }).then((res) => {
          this.companyItems = res.data;
        });
      }
    },
    queryCustomers() {
      this.$refs.customerDataTable.getObject();
    },
  },
};
</script>