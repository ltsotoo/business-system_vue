<template>
  <v-container>
    <v-card>
      <v-card-subtitle>
        <v-form ref="queryForm">
          <v-row align="baseline">
            <v-col cols="2">
              <v-select
                v-model="queryObject.areaID"
                :items="areaItems"
                item-text="name"
                item-value="ID"
                label="区域"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="queryObject.companyID"
                :items="companyItems"
                item-text="name"
                item-value="ID"
                label="公司"
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-select
                v-model="queryObject.researchGroupID"
                :items="researchGroups"
                item-text="name"
                item-value="ID"
                label="课题组"
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-text-field
                label="姓名"
                v-model="queryObject.name"
              ></v-text-field>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="query"> 查询 </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn rounded color="primary" dark @click="resetQueryForm">
                重置
              </v-btn>
            </v-col>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="green" dark @click="goToEntry">
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px">
      <v-col>
        <customerDataTable :queryObject="queryObject" ref="customerDataTable"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import customerDataTable from "@/components/customer/CustomerDataTable";
import { queryAreas } from "@/api/base";
import { queryCompanys, queryResearchGroupsByCompanyID } from "@/api/customer";

export default {
  components: {
    customerDataTable,
  },
  data: () => ({
    areaItems: [],
    companyItems: [],
    researchGroups: [],
    queryObject: {
      areaID: null,
      companyID: null,
      researchGroupID: null,
      name: "",
    },
  }),
  created() {
    this.getAreas();
    this.getCompanyItems();
  },
  methods: {
    getAreas() {
      queryAreas().then((res) => {
        this.areaItems = res.data;
      });
    },
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
    query() {
      this.$refs.customerDataTable.getObject();
    },
    resetQueryForm() {
      this.$refs.queryForm.reset();
      this.$refs.customerDataTable.getObject();
    },
    goToEntry() {
      this.$router.replace("/customer/entry");
    },
  },
  watch: {
    "queryObject.companyID": {
      handler: function (val) {
        this.queryObject.researchGroupID = null;
        if (val != null) {
          this.getResearchGroupsByCompanyID(val);
        }
      },
    },
  },
};
</script>