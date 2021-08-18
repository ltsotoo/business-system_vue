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
                clearable
              ></v-select>
            </v-col>
            <v-col cols="2">
              <v-select
                v-model="queryObject.companyID"
                :items="companyItems"
                item-text="name"
                item-value="ID"
                label="公司"
                clearable
              ></v-select>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="课题组"
                v-model.trim="queryObject.researchGroup"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                label="姓名"
                v-model.trim="queryObject.name"
                clearable
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
            <v-spacer></v-spacer>
            <v-divider vertical></v-divider>
            <v-col cols="auto">
              <v-btn rounded color="success" dark @click="goToEntry">
                录入
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card-subtitle>
    </v-card>
    <v-row style="margin-top: 10px">
      <v-col>
        <customerDataTable :queryObject="queryObject" ref="customerDataTable" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import customerDataTable from "@/components/customer/DataTable";
import { queryAreas } from "@/api/oadrp";
import { queryCompanys } from "@/api/customer";

export default {
  components: {
    customerDataTable,
  },
  data: () => ({
    areaItems: [],
    companyItems: [],
    queryObject: {
      areaID: null,
      companyID: null,
      researchGroup: "",
      name: "",
    },
  }),
  created() {
    this.getAreas();
  },
  methods: {
    getAreas() {
      queryAreas().then((res) => {
        this.areaItems = res.data;
      });
    },
    getCompanyItemsByAreaID(areaID) {
      queryCompanys({areaID:areaID}).then((res) => {
        this.companyItems = res.data;
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
    "queryObject.areaID": {
      handler: function (val) {
        this.companyItems = [];
        this.queryObject.companyID = null;
        if (val != null) {
          this.getCompanyItemsByAreaID(val);
        }
      },
    },
  },
};
</script>